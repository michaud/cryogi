import getFieldControl from "@utils/getFieldControl";

const getFormFields = (data, dataShape, classes, onChangeField) => {

    const fields = [];

    let index = 0;

    if (data) {

        dataShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: data[field.predicate],
                label: '',
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            fields.push(fieldControl);
        });
    }
    return fields;
}

export default getFormFields;
