import React, { useState } from 'react';

import { parse } from 'date-fns';

import TextField from '@material-ui/core/TextField';

const isValidDate = (date) => {

    try {

        date.toISOString();

    } catch (err) {

        return false;
    }

    return true;
};

const PeriodInput = ({ params, label }) => {

    const [error, setError] = useState(false)
    
    const { inputProps:{ onChange, onMouseDown, onBlur }, ...rest } = params;

    const checkDateValue = (value) => {

        const hasPeriodIndicator = value.includes('>');

        const dates = value.split('>');

        setError(
            !hasPeriodIndicator &&
            !dates.reduce((acc, date) => acc && isValidDate(
                parse(date.trim(), 'M-yy', new Date())
            ), true)
        );
    }

    const handleMouseDown = (event) => {

        if(!error) onMouseDown(event);
    }

    const handleBlur = (event) => {

        if(!error) onBlur(event);
    }

    const handleChange = (event) => {

        const value = event.currentTarget.value;
        setError(false);

        const isShortest = value.length > 8;
        if(isShortest) {
            
            setError(checkDateValue(value));
        }

        onChange(event)
    }
    return (
        <TextField { ...params }
        onChange={ handleChange }
        onMouseDown={ handleMouseDown }
        onBlur={ handleBlur }
        error={ error }
        variant="outlined"
        label={ label }
        placeholder={ label }
        helperText={ <span>type a date range like: '2-16>3-17', hit enter, repeat</span> }/>
    );
};

export default PeriodInput;
