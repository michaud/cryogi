import ulog from 'ulog';

import portfolio from "@constants/portfolio-namespace";

const log = ulog('getFieldValue');

const getFieldValue = (field, args) => {

    const [data] = args;
    console.log('data:', data)

    switch(field.type) {
        case portfolio.types.text:
        case portfolio.types.string: return data.target.value;
        case portfolio.types.nonNegativeInteger:
        case portfolio.types.integer: return parseInt(data.target.value);
        case portfolio.types.dateTime: return data;
        case portfolio.types.technology: return data;
        case portfolio.types.role: return data;
        case portfolio.types.responsibility: return data;
        case portfolio.types.tool: return data;

        default: {
            
            log.error('do not know this field type', field, data);

            return '';
        }
    }
};

export default getFieldValue;
