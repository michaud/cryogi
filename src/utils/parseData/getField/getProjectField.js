import parseFields from '@utils/parseData/parseFields';

import portfolio from '@constants/portfolio-namespace';
import typeShape from '../typeShape';


const getProjectField = doc => (data, label) => {
console.log('data, label:', data, label)

    const bagId = data.getAllRefs(portfolio.properties.projects)[0];
    const bagRef = doc.getSubject(bagId);

    const value = parseFields(typeShape[portfolio.classes.Project], doc)(bagRef);

    return ({
        label,
        value
    });
};

export default getProjectField;
