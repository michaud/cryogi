import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import ScreenshotForm from './ScreenshotForm';
import ScreenshotList from './ScreenshotList';

const ManageScreenshots = ({ items, onChange, label }) => {

    const [screenshots, setScreenshots] = useState([]);
    const [selected, setSetSelected] = useState();

    useEffect(() => {

        if(items) setScreenshots(items);

    }, [items])


    const handleAdd = shot => {

        setScreenshots(state => {
            
            const newState = update(state, { $push: [shot]});
            
            onChange(newState);
            setSetSelected();
            return newState;

        });
    };

    const handleSelect = shot => setSetSelected(shot);

    const handleDelete = shot => {
        
        setScreenshots(state => {

            const shotIndex = state.findIndex(stateShot => {
                
                return shot.iri === stateShot.iri;
            });

            const newState = update(state, { $splice: [[shotIndex, 1]] });

            onChange(newState);
            setSetSelected();

            return newState;
        });
    };

    const handleSave = shot => {

        setScreenshots(state => {

            const shotIndex = state.findIndex(stateShot => shot.iri === stateShot.iri);

            const newState = update(state, {[shotIndex]: {$set: shot }});

            onChange(newState);
            setSetSelected();
            return newState;
        })
    };

    return (
        <div>
            <h5>{ label }</h5>
            <ScreenshotForm
                item={ selected }
                onAdd={ handleAdd }
                onDelete={ handleDelete }
                onSave={ handleSave }/>
            <ScreenshotList
                items={ screenshots }
                onSelect={ handleSelect }
                onDelete={ handleDelete }/>
        </div>
    );
};

export default ManageScreenshots;
