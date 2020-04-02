import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import screenshotShape from '@contexts/shapes/screenshot-shape.json';
import getFieldControl from '@utils/getFieldControl';
import getFieldValue from '@utils/getFieldValue';

import Button from '@material-ui/core/Button';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styled/layout.style';

import formStyles from '@styled/form.style';

const ScreenshotForm = ({ item, onAdd, onDelete, onSave, label }) => {

    const [screenshot, setScreenshot] = useState();

    const classes = formStyles();

    useEffect(() => {

        if(item) {

            setScreenshot(item)

        } else {

            setScreenshot(setupDataObject(screenshotShape));
        }

    }, [item])

    const handleAdd = () => {

        onAdd(screenshot);
    };

    const handleSave = () => {

        onSave(screenshot);
    };

    const handleDelete = () => onDelete && onDelete(screenshot);
    
    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args]);

        setScreenshot(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const fields = [];
    
    let index = 0;

    if(screenshot) {

        screenshotShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: screenshot[field.predicate],
                label: '',
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            fields.push(fieldControl);
        });
    }

    return (
        <div className="c-box">
            <h4>{ label }</h4>
            { fields }
            <FlexContainer>
                <FlexItem>
                {   item ? <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleSave }
                        className={ classes.button }
                        color="primary">Save shot</Button>
                        : <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleAdd }
                        className={ classes.button }
                        color="primary">Add shot</Button>
                }
                </FlexItem>
                <FlexItemRight>
                    { item && <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleDelete }
                        className={ classes.button }
                        color="primary">delete</Button> 
                    }
                </FlexItemRight>
            </FlexContainer>
        </div>
    );
};

export default ScreenshotForm;
