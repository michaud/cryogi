import { namedNode } from "@rdfjs/data-model";
import { rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import saveElement from "@services/saveElement";
import { addField } from "./addField";
import portfolio from "@constants/portfolio-namespace";
import { target } from "rdf-namespaces/dist/schema";

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

        case portfolio.types.role: {

            data.value.forEach(item => ref.setLiteral(predicate, item));

            break;
        }

        case portfolio.types.technology: {

            data.value.forEach(item => ref.setLiteral(predicate, item));

            break;
        }

        case portfolio.types.responsibility: {

            data.value.forEach(item => ref.setLiteral(predicate, item));

            break;
        }

        case portfolio.types.tool: {

            data.value.forEach(item => ref.setLiteral(predicate, item));

            break;
        }

        case portfolio.classes.Project: {

            data.value.map(val => ref.addRef(predicate, val));

            break;
        }

        case portfolio.classes.DatePeriod: {

            data.value.forEach(item => ref.setLiteral(predicate, item));

            break;
        }

        case portfolio.classes.Agency: {

            ref.setLiteral(predicate, data.value);

            break;
        }

        case portfolio.classes.Screenshot: {

            const oldRefs = ref.getAllRefs(portfolio.properties.screenshots);

            //remove all
            if(data.value.length === 0) oldRefs.forEach(shot => doc.removeSubject(shot));
            
            const deletedRefs = oldRefs.filter(oldRef => {
            
                const found = data.value.find(target => target.iri === oldRef.iri);
                if(found) return false;
                return true;
            });

            //remove deleted from property and document
            deletedRefs.forEach(shot => {

                ref.removeRef(portfolio.properties.screenshots, shot)
                doc.removeSubject(shot);
            });

            data.value.forEach(screenshot => {

                let iri = screenshot.iri;

                if(screenshot.iri === '') {

                    const elRef = saveElement({
                        element: screenshot,
                        doc,
                        type: field.type
                    })

                    iri = elRef.asRef();
                    //setting the iri prevents the code from seeing the current screenshot as a new screenshot when 
                    //it has been saved to the server with the iri 
                    screenshot.iri = iri;

                    ref.addRef(portfolio.properties.screenshots, iri);

                } else {

                    saveElement({
                        element: screenshot,
                        doc,
                        type: field.type
                    })
                }
            });

            break;
        }

        default: {

            log.error('setField: do not know this field', field);

            break;
        }
    }
};
