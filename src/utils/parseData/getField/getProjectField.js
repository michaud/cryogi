import portfolio from '@constants/portfolio-namespace';


const getProjectField = doc => (data, label) => {

    const projectRefs = data.getAllRefs(portfolio.properties.projects);

    return ({
        label,
        value: projectRefs
    });
};

export default getProjectField;
