import { useState, useEffect } from 'react';

import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import setupDataObject from '@utils/setupDataObject';
import updateProjectField from '@utils/updateProjectField';
import getFieldValue from '@utils/getFieldValue';
import getFormFields from '@components/form/getFormFields';

import projectShape from '@contexts/shapes/project-shape.json';
import { useLocale } from '@contexts/LocaleProvider';

import formStyles from '@styled/form.style';
import { FlexContainer, FlexItem, FlexItemRight } from '@styled/layout.style';

const ProjectForm = ({ item, onSave, onDelete }) => {

    const [project, setProject] = useState();

    const {
        setLocales,
        localeList,
        selectedLocale
    } = useLocale();

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
            //TODO this seems to be a mutation? whats happening here 
            const plop = update(item, {
                ['locales']: { value: { $set: localeList } }
            })
        }

    }, [localeList])

    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args]);

        setProject(state => {

            const newFieldVal = updateProjectField(
                localeList,
                selectedLocale,
                [...state[fieldDef.predicate].value],
                value,
                state[fieldDef.predicate].type
            );

            return update(state, {
                [fieldDef.predicate]: { value: { $set: newFieldVal } }
            })
        });
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
