import parseFields from '@utils/parseData/parseFields';

import portfolio from '@constants/portfolio-namespace';
import typeShape from '../typeShape';


const getProjectField = doc => (data, label) => {

    const projectRefs = data.getAllRefs(portfolio.properties.projects);

    return ({
        label,
        value: projectRefs
    });
};

export default getProjectField;
