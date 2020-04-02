import React, { useState, useEffect } from 'react';

import formStyles from '@styled/form.style';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    DateTimePicker,
} from '@material-ui/pickers';

const DateTimeSelector = ({ onChange, value, label, params={} }) => {

    const [selectedDate, setSelectedDate] = useState(Date.now());

    useEffect(() => {

        let isCancel = false;

        const update = () => {

            if(value) {
                if(!isCancel) setSelectedDate(value);
            }
        }

        update();

        return () => { isCancel = true };
    })

    const classes = formStyles();

    const handleDateChange = date => {

        setSelectedDate(date);
        if(onChange) onChange(date);
    };

    return (
        <MuiPickersUtilsProvider utils={ DateFnsUtils }>
            <DateTimePicker
                { ...params }
                label={ label }
                inputVariant="outlined"
                className={ classes.textField }
                value={ selectedDate }
                ampm={ false }
                format="dd-MM-yy"
                onChange={ handleDateChange }/>
        </MuiPickersUtilsProvider>
    );
};

export default DateTimeSelector;
