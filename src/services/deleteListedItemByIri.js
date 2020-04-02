import { deleteFile } from '@utils/ldflex-helper'

const deleteListedItemByIri = async (item, data, type) => {

    // const start = item.lastIndexOf('/');
    // const end = item.lastIndexOf('#');
    const filePath = item.substring(item.lastIndexOf('/'), item.lastIndexOf('#'));

    const ref = data.doc
        .findSubjects(type)
        .filter(node => node.getRef().includes(filePath))[0];

    data.doc.removeSubject(ref.asRef());

    await data.doc.save();

    deleteFile(item.substring(0, item.lastIndexOf('#')));
};

export default deleteListedItemByIri;
