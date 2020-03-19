import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';
import getFieldControl from '@utils/getFieldControl';

import formStyles from '@styled/form.style';

import ScreenshotForm from './ScreenshotForm';
import ScreenshotList from './ScreenshotList';

const ManageScreenshots = ({ items, onChange, label }) => {

    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {

        if(items) {

            setScreenshots(items)
        }

    }, [items])


    const onAddHandler = (shot) => {

        setScreenshots(state => {
            const newState = update(state, { $push: [shot]});
            
            onChange(newState);

            return newState;

        });
    }

    return (
        <div>
            <h5>{ label }</h5>
            <ScreenshotList items={ screenshots }/>
            <ScreenshotForm onAdd={ onAddHandler } />
        </div>
    );
};

export default ManageScreenshots;
