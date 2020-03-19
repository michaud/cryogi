const getStringList = predicate =>  (data, label, defaultValue) => {

    const value = data ? data.getLiteral(predicate) : defaultValue;

    return ({
        label,
        value: value.split(',')
    })
};

export default getStringList;
