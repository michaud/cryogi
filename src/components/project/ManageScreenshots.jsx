import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import ScreenshotForm from './ScreenshotForm';
import ScreenshotList from './ScreenshotList';

const ManageScreenshots = ({ items, onChange, label }) => {

    const [screenshots, setScreenshots] = useState([]);
    const [selected, setSetSelected] = useState();

    useEffect(() => {

        if(items) {

            setScreenshots(items)
        }

    }, [items])


    const onAddHandler = shot => {

        setScreenshots(state => {
            
            const newState = update(state, { $push: [shot]});
            
            onChange(newState);

            return newState;

        });
    }

    const onSelectHandler = shot => {

        setSetSelected(shot);
    }

    return (
        <div>
            <h5>{ label }</h5>
            <ScreenshotForm item={ selected } onAdd={ onAddHandler }/>
            <ScreenshotList items={ screenshots } onSelect={ onSelectHandler }/>
        </div>
    );
};

export default ManageScreenshots;
