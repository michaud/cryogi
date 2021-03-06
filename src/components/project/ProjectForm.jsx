import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';
import getFieldControl from '@utils/getFieldControl';

import formStyles from '@styled/form.style';
import getFieldValue from '@utils/getFieldValue';

const ProjectForm = ({ item, onSave, label }) => {

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

    const saveProjectHandler = () => {

        console.log('project:', JSON.stringify(project))
        onSave(project);
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
            <h4>{ label }</h4>
            { fields }
            <Button
                variant="contained"
                // disabled={ !canSave.can }
                onClick={ saveProjectHandler }
                className={ classes.button }
                color="primary">Save</Button>
        </div>
    );
};

export default ProjectForm;
