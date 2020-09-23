import { useState, useEffect } from 'react';

import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';
import getFieldControl from '@utils/getFieldControl';

import formStyles from '@styled/form.style';
import getFieldValue from '@utils/getFieldValue';
import { FlexContainer, FlexItem, FlexItemRight } from '@styled/layout.style';
import { LocaleProvider } from '@contexts/LocaleProvider';

const ProjectForm = ({ item, onSave, onDelete }) => {

    const [project, setProject] = useState();
    const [locales, setLocales] = useState([]);
    const classes = formStyles();

    useEffect(() => {

        if(item) {

            setProject(item)
            if(item.locales) {
                setLocales(item.locales);
            }

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

    const handleSaveProject = () => onSave(project);

    const handleDeleteProject = () => onDelete && onDelete(project);

    const fields = [];
    
    let index = 0;

    if(project) {

        projectShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: project[field.predicate],
                label: '',
                styles: classes,
                onChange: onChangeField,
                idx: index++,
                locales
            });

            fields.push(fieldControl);
        });
    }

    return (
        <LocaleProvider>
        <div className="c-box--form">
            <h4>{ item ? 'Edit project' : 'Add project' }</h4>
            { fields }
            <FlexContainer>
                <FlexItem>
                    { item ? <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleDeleteProject }
                        className={ classes.button }
                        color="primary">Delete</Button> : null
                    }
                </FlexItem>
                <FlexItemRight>
                    <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleSaveProject }
                        className={ classes.button }
                        color="primary">Save</Button>
                </FlexItemRight>
            </FlexContainer>
        </div>
        </LocaleProvider>
    );
};

export default ProjectForm;
