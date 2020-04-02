const getStringList = predicate => (data, label, defaultValue) => ({
    label,
    value: data ? data.getAllLiterals(predicate) : defaultValue
});

export default getStringList;
