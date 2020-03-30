import { namedNode } from "@rdfjs/data-model";
import { rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import saveElement from "@services/saveElement";
import { addField } from "./addField";
import portfolio from "@constants/portfolio-namespace";

const log = ulog('setField');

export const setField = ({ field, shape, data, element, ref, doc }) => {

    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case portfolio.types.text : {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case portfolio.types.integer : {

            ref.setLiteral(predicate, parseInt(data.value));

            break;
        }

        case portfolio.types.double : {

            ref.setLiteral(predicate, data);

            break;
        }

        case portfolio.types.string: {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case portfolio.types.nonNegativeInteger : {

            const value = data === undefined ? field.value : data.value;

            ref.setLiteral(predicate, parseInt(value));

            break;
        }

        case portfolio.types.dateTime: {

            //TODO setfield implement portfolio.types.dateTime

            break;
        }

        case portfolio.classes.Project: {

            data.value.map(val => ref.addRef(predicate, val));

            break;
        }

        default : {

            log.error('setField: do not know this field', field);

            break;
        }
    }
};
