import ulog from 'ulog';

import portfolio from '@constants/portfolio-namespace';
import getTypeData from '@utils/parseData/getTypeData';

const log = ulog('getFieldData');

const getFieldData = (shape, doc, data, ...rest) => field => {

    const {
        label,
        prefix: fieldPrefix,
        predicate: fieldPredicate,
        type,
        required,
        value: fieldValue
    } = field;

    const prefix = shape['@context'][fieldPrefix];
    const predicate = `${prefix}${fieldPredicate}`;

    let fieldData;

    //getTypeData[type](doc) when you need to pick elements from the document
    //getTypeData[type](predicate) when you're just reading the value
    switch(type) {

        case portfolio.types.string:
        case portfolio.types.text: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.types.dateTime: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.classes.Project: {
            
            fieldData = getTypeData[type](doc)(data, label, fieldValue);

            break;
        }

        case portfolio.types.role: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.types.responsibility: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.classes.DatePeriod: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.types.tool: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.types.technology: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.classes.Agency: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.classes.Screenshot: {

            fieldData = getTypeData[type](doc)(data, label, fieldValue);

            break;
        }

        default: {

            fieldData = 'error';
            
            log.error('do not know how to parse this field', field)
        }
    }

    return required === undefined ? ({
        type,
        predicate: field.predicate,
        iri: predicate,
        ...fieldData
    }) : ({
        type,
        predicate: field.predicate,
        iri: predicate,
        required,
        ...fieldData
    });
};

export default getFieldData;
