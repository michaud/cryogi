import parseFields from '@utils/parseData/parseFields';

import portfolio from '@constants/portfolio-namespace';
import typeShape from '../typeShape';


const getProjectField = doc => (data, label) => {

    const projectRefs = data.getAllRefs(portfolio.classes.Projects);
  //  const bagRef = doc.getSubject(bagId);

    const value = [] //parseFields(typeShape[portfolio.classes.Project], doc)(bagRef);

    return ({
        label,
        value
    });
};

export default getProjectField;
