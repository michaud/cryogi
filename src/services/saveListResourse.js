import { createDocument } from "tripledoc";
import { space } from "rdf-namespaces";

import fetchProfile from "@services/fetchProfile";
import fetchResource from "@services/fetchResource";
import saveElement from "@services/saveElement";

const getDocument = async (resource, path) => {

    let doc;

    if(resource.iri === '') {
        
        doc = await createResourceDocument(path);

    } else {

        doc = await fetchResource(resource.iri);
    }

    return doc;
};

const createResourceDocument = async (path) => {

    const profile = await fetchProfile();
    const storage = profile.getRef(space.storage);
    const url = `${ storage }${ path }${ Date.now() }.ttl`;

    const doc = await createDocument(url).save();

    return doc;
}

const saveListResourse = async ({
    resource,
    list,
    type,
    listPath,
    itemPath
}) => {

    const doc = await getDocument(resource, itemPath);

    const itemDoc = saveElement({
        element: resource,
        doc,
        type
    });

    await itemDoc.getDocument().save();

    //add item to list with same identifier as resource itself
    const ref = itemDoc.asRef();
    const subject = list.addSubject({ identifier: ref.split('#')[1] });
    const filePath = ref.substring(ref.indexOf(listPath) + listPath.length, ref.indexOf('#'));
    subject.setRef(type, filePath);

    await list.save();

    return ref;
};

export default saveListResourse;
