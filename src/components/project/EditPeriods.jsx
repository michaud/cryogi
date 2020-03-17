import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import datePeriodShape from '@contexts/shapes/dateperiod-shape.json';
import getFieldControl from '@utils/getFieldControl';
import getFieldValue from '@utils/getFieldValue';

import { FlexContainer } from '@styled/layout.style';
import formStyles from '@styled/form.style';

const EditPeriods = ({ items }) => {

    const [periods, setPeriods] = useState();
    const classes = formStyles();

    useEffect(() => {

        if(periods) {

            setPeriods(items)

        } else {

            setPeriods(setupDataObject(datePeriodShape));
        }

    }, [items])

    
    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args]);

        setPeriods(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const fields = [];
    
    let index = 0;

    if(periods) {

        datePeriodShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: periods[field.predicate],
                label: '',
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            fields.push(fieldControl);
        });
    }

    return (
        <FlexContainer>
            { fields }
        </FlexContainer>
    );
};

export default EditPeriods;
