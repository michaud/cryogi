import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';
import getFieldControl from '@utils/getFieldControl';

import formStyles from '@styled/form.style';
import getFieldValue from '@utils/getFieldValue';

const ProjectForm = ({ item, onSave }) => {

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

        setProject(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const saveProjectHandler = () => onSave(project);

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
        <div className="c-box--form">
            <h4>{ item ? 'Edit project' : 'Add project' }</h4>
            { fields }
            <Button
                variant="contained"
                // disabled={ !canSave.can }
                onClick={ saveProjectHandler }
                className={ classes.button }
                color="primary">Save project</Button>
        </div>
    );
};

export default ProjectForm;
