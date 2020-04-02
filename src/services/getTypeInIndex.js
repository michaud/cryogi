import { space, solid } from 'rdf-namespaces';
import { createDocument } from 'tripledoc';

import fetchProfile from '@services/fetchProfile';
import fetchPublicTypeIndex from '@services/fetchPublicTypeIndex';
import addToTypeIndex from '@services/addToTypeIndex';

const getTypeInIndex = async (type, relUrl, setupType) => {

    const [profile, publicTypeIndex] = await Promise.all([fetchProfile(), fetchPublicTypeIndex()]);

    if (profile === null || publicTypeIndex === null) return null;
    
    let listIndex = publicTypeIndex.findSubject(
        solid.forClass,
        type
    );

    if(listIndex) return listIndex;
    
    const storage = profile.getRef(space.storage);
    

    if (typeof storage !== 'string') return null;

    // Note: There's an assumption here that `/public/` exists and is writable for this app.
    //       In the future, "Shapes" should hopefully allow us to get more guarantees about this:
    //       https://ruben.verborgh.org/blog/2019/06/17/shaping-linked-data-apps/#need-for-shapes

    const ref = storage + relUrl;
    let doc = createDocument(ref);

    if(setupType) doc = setupType(doc);


    doc = await doc.save();
    doc = await addToTypeIndex(publicTypeIndex, doc, type);

    listIndex = publicTypeIndex.findSubject(
        solid.forClass,
        type
    );

    return listIndex;
};

export default getTypeInIndex;
