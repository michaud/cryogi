import { useState, useEffect } from 'react';
import { solid, rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import { namedNode } from '@rdfjs/data-model';
import portfolioNs from '@constants/portfolio-namespace';

import initialiseTypeDocument from '@services/initialiseTypeDocument';
import fetchResource from '@services/fetchResource';
import paths from '@constants/paths';
import parseFields from '@utils/parseData/parseFields';
import typeShape from '@utils/parseData/typeShape';

const log = ulog('usePortfolioType');

const parseData = (doc, type, ...rest) => {

    const dataRef = doc ? doc
        .findSubject(rdf.type, namedNode(type))
        : undefined;
    
    const data = dataRef === null ? undefined : parseFields(typeShape[type], doc, ...rest)(dataRef);

    return data;
}

const usePortfolioType = (publicTypeIndex) => {

    const [reload, setReload] = useState(false);
    const [isError, setIsError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [portfolioData, setPortfolioData] = useState({ portfolio: undefined, doc: undefined });


    useEffect(() => {

        let didCancel = false;

        if (publicTypeIndex && publicTypeIndex.doc) {

            const loadData = async () => {

                try {
                    
                    const portfolioIndex = publicTypeIndex.doc
                        .findSubject(solid.forClass, portfolioNs.classes.Portfolio);

                    if (!portfolioIndex) {

                        // If no portfolio document is listed in the public type index, create one:
                        const doc = await initialiseTypeDocument(
                            portfolioNs.classes.Portfolio,
                            paths.REACT_APP_PORTFOLIO_DATA_PATH + 'portfolio.ttl'
                        );

                        if (doc === null) return;
                        
                        if(!didCancel) {

                            setPortfolioData(state => ({
                                ...state,
                                doc
                            }));
                        }

                        return;

                    } else {
                        // If the public type index does list a document, fetch it:
                        const url = portfolioIndex.getRef(solid.instance);
                        console.log('url:', url)

                        if (typeof url !== 'string') return;
                        
                        const doc = await fetchResource(url);
                        console.log('doc:', doc)

                        if(doc) {

                            const portfolio = parseData(
                                doc,
                                portfolioNs.classes.Portfolio
                            );

                            if(!didCancel) setPortfolioData({
                                doc,
                                portfolio
                            });
                        }
                    }

                } catch (error) {

                    if(!didCancel) {

                        log.error('error: ', error);
                        setIsError(error)
                    }

                } finally {

                    if(!didCancel) {
                        setReload(false);
                        setIsLoading(false);
                    }
                }
            };

            if(!didCancel) setIsLoading(true);

            loadData();
        }

        return () => { didCancel = true; }

    }, [publicTypeIndex, reload]);

    return [{ portfolioData, isLoading, isError }, () => { setReload(true) }];
};

export default usePortfolioType;
