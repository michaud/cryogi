import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';
import getFieldControl from '@utils/getFieldControl';

import formStyles from '@styled/form.style';
import getFieldValue from '@utils/getFieldValue';

const ProjectForm = ({ item }) => {

    const [project, setProject] = useState();
    const classes = formStyles();

    useEffect(() => {

        if(item) {

            setProject(item)

        } else {

            setProject(setupDataObject(projectShape));
        }

    }, [item])

    
    const onChangeField = fieldDef => (...args)  => {


        const value = getFieldValue(fieldDef, [...args]);
        console.log('value:', value)

        setProject(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const fields = [];
    
    let index = 0;

    if(project) {

        projectShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: project[field.predicate],
                label: '',
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            fields.push(fieldControl);
        });
    }

    return (
        <div>
            ProjectForm
            { fields }
        </div>
    );
};

export default ProjectForm;
