const getLocaleLiteral = predicate =>  (data, label, defaultValue) => {

    const value = data ? data.getAllLiterals(predicate) : defaultValue;

    return ({
        label,
        value
    })
};

export default getLocaleLiteral;
