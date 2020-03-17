import React, { useEffect, useState } from 'react';

import update from 'immutability-helper';

import setupDataObject from '@utils/setupDataObject';
import projectShape from '@contexts/shapes/project-shape.json';
import getFieldControl from '@utils/getFieldControl';

import formStyles from '@styled/form.style';

import ScreenshotForm from './ScreenshotForm';

const ManageScreenshots = ({ items, label }) => {

    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {

        if(items) {

            setScreenshots(items)
        }

    }, [items])

    return (
        <div>
            <div>{ label }</div>
        {
            screenshots.length > 0 ?
                screenshots.map((screenshot, idx) => <div key={ idx }>screenshot</div>)
                : <ScreenshotForm />
        }
        </div>
    );
};

export default ManageScreenshots;
