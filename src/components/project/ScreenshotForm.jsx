import React, { useState, useEffect } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import screenshotShape from '@contexts/shapes/screenshot-shape.json';
import getFieldControl from '@utils/getFieldControl';
import getFieldValue from '@utils/getFieldValue';

import formStyles from '@styled/form.style';

const ScreenshotForm = ({ item, label }) => {

    const [screenshot, setScreenshot] = useState();
    const classes = formStyles();

    useEffect(() => {

        if(item) {

            setScreenshot(item)

        } else {

            setScreenshot(setupDataObject(screenshotShape));
        }

    }, [item])

    
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
        <div>
            { fields }
        </div>
    );
};

export default ScreenshotForm;
