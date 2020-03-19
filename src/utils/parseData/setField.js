import { namedNode } from "@rdfjs/data-model";
import { rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import saveElement from "@services/saveElement";
import { addField } from "./addField";

const log = ulog('setField');

export const setField = ({ field, shape, data, element, ref, doc }) => {

    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case golf.types.text : {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case golf.types.integer : {

            ref.setLiteral(predicate, parseInt(data.value));

            break;
        }

        case golf.types.double : {

            ref.setLiteral(predicate, data);

            break;
        }

        case golf.types.string: {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case golf.types.nonNegativeInteger : {

            const value = data === undefined ? field.value : data.value;

            ref.setLiteral(predicate, parseInt(value));

            break;
        }

        case golf.types.dateTime: {

            //TODO setfield implement golf.types.dateTime

            break;
        }

        default : {

            log.error('setField: do not know this field', field);

            break;
        }
    }
};
