import portfolio from "@constants/portfolio-namespace";

const updateProjectField = (localeList, selectedLocale, fieldValue, value, type) => {

    if(
        type === portfolio.types.string ||
        type === portfolio.types.text
    ) {
        const localeIndex = localeList.indexOf(selectedLocale);
        const targetIndex = fieldValue.length === 0 ? 0 : localeIndex;

        if (fieldValue.length - localeList.length < 0) {

            fieldValue = localeList.map((_, index) => fieldValue[index] || '');
        }

        fieldValue[targetIndex] = value;

    } else {

        newFieldVal = value;
    }

    return fieldValue;
};

export default updateProjectField;
