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

    switch(type) {

        case portfolio.types.string:
        case portfolio.types.dateTime:
        case portfolio.types.text: {

            fieldData = getTypeData[type](predicate)(data, label, fieldValue);

            break;
        }

        case portfolio.classes.Project: {

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
