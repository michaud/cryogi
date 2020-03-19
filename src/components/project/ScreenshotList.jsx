import React from 'react';

const ScreenshotList = ({ items }) => {
    return (
        items.map((shot, idx) => {
            return <div key={ idx }>{ shot.shortScreenshotDescription.value }</div>;
        })
    )
};

export default ScreenshotList;
