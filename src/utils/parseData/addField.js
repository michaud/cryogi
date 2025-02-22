import { rdf } from 'rdf-namespaces';
import ulog from 'ulog';

import saveElement from '@services/saveElement';
import portfolio from '@constants/portfolio-namespace';

const log = ulog('addField');

export const addField = ({
    field,
    shape,
    data,
    element,
    ref,
    doc
}) => {

    const prefix = shape['@context'][field.prefix];
    const predicate = `${prefix}${field.predicate}`;

    switch(field.type) {

        case portfolio.types.text : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case portfolio.types.string : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case portfolio.types.dateTime : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case portfolio.classes.Project : {

            const projects = data.value;
//TODO do we need this?
            projects.forEach(project => {
                
            });
        }

        case portfolio.types.role : {

            data.value.forEach(item => ref.addLiteral(predicate, item));

            break;
        }

        case portfolio.types.responsibility : {

            data.value.forEach(item => ref.addLiteral(predicate, item));

            break;
        }

        case portfolio.types.tool : {

            data.value.forEach(item => ref.addLiteral(predicate, item));


            break;
        }

        case portfolio.types.technology : {

            data.value.forEach(item => ref.addLiteral(predicate, item));

            break;
        }

        case portfolio.classes.Agency : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case portfolio.classes.DatePeriod : {

            data.value.forEach(item => ref.addLiteral(predicate, item));

            break;
        }

        case portfolio.classes.Screenshot : {

            const screenshots = data.value;
                    
            screenshots.forEach(shot => {

                const elRef = saveElement({
                    element: shot,
                    doc,
                    type: field.type
                })
    
                ref.addRef(portfolio.properties.screenshots, elRef.asRef());
            });

            break;
        }

        default : {

            log.error('do not know this field', field, shape, data);

            break;
        }
    }
};
