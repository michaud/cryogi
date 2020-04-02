import React, { useState, useEffect } from 'react';
import PeriodChipAutoComplete from '@components/PeriodChipAutoComplete';

const ManagePeriods = ({ items, label, onChange }) => {

    const [periods, setPeriods] = useState([]);

    useEffect(() => {

        if(items) {

            setPeriods(items)
        }

    }, [items])


    return (
        <div>
            <h5>{ label }</h5>
            <PeriodChipAutoComplete
                items={ items }
                label={ label }
                value={ periods }
                onChange={ onChange }/>
            <div></div>
        </div>
    );
};

export default ManagePeriods;
