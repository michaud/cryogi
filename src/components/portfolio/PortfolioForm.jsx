import { useEffect, useState } from 'react';

import update from 'immutability-helper';

import Button from '@material-ui/core/Button';

import setupDataObject from '@utils/setupDataObject';
import portfolioShape from '@contexts/shapes/portfolio-shape.json';
import getFieldControl from '@utils/getFieldControl';
import getFieldValue from '@utils/getFieldValue';

import {
    FlexContainer,
    FlexItem,
    FlexItemRight
} from '@styled/layout.style';

import formStyles from '@styled/form.style';

const PortfolioForm = ({ item, onSave, onDelete, label }) => {

    const [portfolio, setPortfolio] = useState();
    
    const classes = formStyles();

    useEffect(() => {

        if(item) {

            setPortfolio(item)

        } else {

            setPortfolio(setupDataObject(portfolioShape));
        }

    }, [item])

    const handleSavePortfolio = () => {

        onSave(portfolio)
    };
    
    const onChangeField = fieldDef => (...args)  => {

        const value = getFieldValue(fieldDef, [...args]);

        setPortfolio(state => update(state, {
            [fieldDef.predicate]: { value: { $set: value } }
        }));
    };

    const handleDeletePortfolio = () => onDelete && onDelete(portfolio);
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
            <h4>{ label }</h4>
            { portfolioFields }
            <FlexContainer>
                <FlexItem>
                    { item ? <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleDeletePortfolio }
                        className={ classes.button }
                        color="primary">Delete</Button> : null
                    }
                </FlexItem>
                <FlexItemRight>
                    <Button
                        variant="contained"
                        // disabled={ !canSave.can }
                        onClick={ handleSavePortfolio }
                        className={ classes.button }
                        color="primary">Save</Button>
                </FlexItemRight>
            </FlexContainer>
        </div>
    );
};

export default PortfolioForm;
