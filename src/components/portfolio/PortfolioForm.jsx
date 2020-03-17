import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import portfolioShape from '@contexts/shapes/portfolio-shape.json';
import getFieldControl from '@utils/getFieldControl';
import getFieldValue from '@utils/getFieldValue';

import formStyles from '@styled/form.style';

const PortfolioForm = ({ item, label }) => {

    const [portfolio, setPortfolio] = useState();
    const classes = formStyles();

    useEffect(() => {

        if(portfolio) {

            setPortfolio(item)

        } else {

            setPortfolio(setupDataObject(portfolioShape));
        }

    }, [item])

    
    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args]);

        setPortfolio(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const portfolioFields = [];
    
    let index = 0;

    if(portfolio) {

        portfolioShape.shape.forEach(field => {

            const fieldControl = getFieldControl({
                data: portfolio[field.predicate],
                label: '',
                styles: classes,
                onChange: onChangeField,
                idx: index++
            });

            portfolioFields.push(fieldControl);
        });
    }

    return (
        <div>
            <div>{ label }</div>
            { portfolioFields }
        </div>
    );
};

export default PortfolioForm;
