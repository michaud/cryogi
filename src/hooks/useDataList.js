import { useState, useEffect } from 'react';
import { solid, rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import { namedNode } from '@rdfjs/data-model';

import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';
import parseFields from '@utils/parseData/parseFields';
import typeShape from '@utils/parseData/typeShape';

const log = ulog('usePortfolioType');

const getListFromDoc = async (
    doc,
    type,
    shape,
    ...rest
    ) => {

    const [id, url] = rest;

    const refs = doc.findSubjects(type);

    const promises = [];

    if(!id) {

        refs.map(item => promises.push(fetchResource(item.getRef())));

    } else {

        promises.push(fetchResource(doc.getSubject(`${ url }#${ id }`).getRef()));
    }

    const docs = await Promise.all(promises);

    const items = docs.map(doc => {

        const itemRef = doc.findSubject(rdf.type, namedNode(type));

        const item = parseFields(shape, doc, ...rest)(itemRef);

        return ({
            item,
            doc
        })
    });

    return items;
};

const updateInList = (list, dataList) => {

    const updatedRef = list[0].item.iri;

    const oldIndex = dataList.list.findIndex(data => { 
        return data.item.iri === updatedRef;
    });

    const startItems = dataList.list.slice(0, oldIndex);
    const endItems = dataList.list.slice(oldIndex + 1, dataList.length);

    
    return [...startItems, list[0], ...endItems];
};

const useDataList = (publicTypeIndex, type, fileName) => {

    const [reload, setReload] = useState(false);
    const [listData, setListData] = useState({ list: [], doc: undefined });
    const [id, setId] = useState();
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        let didCancel = false;

        const loadData = async () => {

            if (publicTypeIndex.doc) {

                try {

                    const listIndex = publicTypeIndex.doc.findSubject(
                        solid.forClass,
                        type
                    );

                    if (!listIndex) {

                        // If no clubList document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            type,
                            `${ paths.APP_DATA_LIST_PATH }${ fileName }`
                        );

                        if (doc === null) return;
                        
                        if(!didCancel) setListData(state => ({
                            ...state,
                            doc
                        }));

                        return;

                    } else {

                        // If the public type index does list a document, fetch it:
                        const url = listIndex.getRef(solid.instance);

                        if (typeof url !== 'string') return;

                        const doc = await fetchResource(url);

                        if(doc !== undefined) {

                            let list = await getListFromDoc(
                                doc,
                                type,
                                typeShape[type],
                                id,
                                url
                            );

                            if(id) list = updateInList(list, listData);

                            if(!didCancel) setListData({ list, doc });

                        } else {
                            
                            if(!didCancel) setListData(state => ({
                                ...state,
                                doc
                            }));
                            
                            return;
                        }
                    }
                } catch (error) { 

                    if(!didCancel) {

                        log.error('error: ', error);
                        setIsError(error)
                    }

                } finally {

                    if(!didCancel) {
                        setIsLoading(false);
                        setReload(false);
                    }
                }
            }
        };

        if(!didCancel) setIsLoading(true);
    
        loadData();

        return () => { didCancel = true; }

    }, [publicTypeIndex.doc, reload]);

    return [{ listData, isLoading, isError }, (id) => {
        setId(id);
        setReload(true);
    }];
};

export default useDataList;
