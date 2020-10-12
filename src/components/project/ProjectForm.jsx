import { useState, useEffect } from 'react';

import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';

import { useLocale } from '@contexts/LocaleProvider';

import formStyles from '@styled/form.style';
import getFieldValue from '@utils/getFieldValue';
import { FlexContainer, FlexItem, FlexItemRight } from '@styled/layout.style';
import getFormFields from '@components/form/getFormFields';

const ProjectForm = ({ item, onSave, onDelete }) => {

    const [project, setProject] = useState();

    const { setLocales, localeList } = useLocale();

    const classes = formStyles();

    useEffect(() => {

        if(item) {

            setLocales(item.locales.value);
            setProject(item);

        } else {

            setProject(setupDataObject(projectShape));
        }

    }, [item])

    useEffect(() => {

        if(item) {
            
            const plop = update(item, {
                ['locales']: { value: { $set: localeList } }
            })
        }

    }, [localeList])
    
    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args]);

        setProject(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const handleSaveProject = () => onSave(project);

    const handleDeleteProject = () => onDelete && onDelete(project);

    const fields = getFormFields(project, projectShape, classes, onChangeField);

    return (
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
    );
};

export default ProjectForm;
