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
debugger
            ref.addLiteral(predicate, data.value);

            break;
        }

        case portfolio.types.dateTime : {

            ref.addLiteral(predicate, data.value);

            break;
        }

        case portfolio.classes.Project : {

            const projects = data.value;

            projects.forEach(project => {
                
            });
        }
        // case golf.classes.Course : {

        //     const course = data.value;
        //     const courseRef = doc.addSubject({ identifier: data.value.iri === '' ? undefined : data.value.iri.split('#')[1] });
        //     courseRef.addRef(rdf.type, golf.classes.Course);
            
        //     const holeType = field.predicate === "gameCourse" ? golf.classes.GameHole : golf.classes.Hole;

        //     courseShape.shape.forEach(field => {

        //         if(field.predicate === 'courseHoles') {

        //             const holes = course.courseHoles.value;

        //             holes.forEach(hole => {

        //                 const elRef = saveElement({
        //                     element: hole,
        //                     doc,
        //                     type: holeType
        //                 })
        
        //                 courseRef.addRef(golf.properties.courseHoles, elRef.asRef());
        //             });

        //         } else {
                    
        //             addField({
        //                 field,
        //                 shape: courseShape,
        //                 data: course[field.predicate],
        //                 ref: courseRef,
        //                 doc
        //             });
        //         }
        //     });

        //     ref.addRef(golf.properties.gameCourse, courseRef.asRef());

        //     break;
        // }

        // case golf.classes.Marker : {

        //     const elRef = saveElement({
        //         element: data.value,
        //         doc,
        //         type: field.type
        //     })

        //     ref.addRef(golf.properties.gameMarker, elRef.asRef());

        //     break;
        // }

        // case golf.classes.Player : {

        //     const elRef = saveElement({
        //         element: data.value,
        //         doc,
        //         type: golf.classes.Player
        //     });

        //     ref.addRef(golf.properties.gamePlayer, elRef.asRef());

        //     break;
        // }

        // case golf.classes.Hole : {

        //     if(field.predicate === 'courseHoles') {

        //         const holes = data.value;
                    
        //         holes.forEach(hole => {

        //             const elRef = saveElement({
        //                 element: hole,
        //                 doc,
        //                 type: field.type
        //             })
        
        //             ref.addRef(golf.properties.courseHoles, elRef.asRef());
        //         });
        //     }

        //     break;
        // }

        // case golf.classes.GamePlayingHandicap : {

        //     const elRef = saveElement({
        //         element: data.value,
        //         doc,
        //         type: field.type
        //     })

        //     ref.addRef(golf.properties.gamePlayingHandicap, elRef.asRef());

        //     break;
        // }

        // case golf.types.GeoCoordinates: {

        //     const elRef = saveElement({
        //         element: data.value,
        //         doc,
        //         type: field.type
        //     })

        //     ref.addRef(golf.properties.strokeLocation, elRef.asRef());

        //     break;
        // }

        // case golf.classes.Stroke : {

        //     break;
        // }

        default : {

            log.error('do not know this field', field, shape, data);

            break;
        }
    }
};
