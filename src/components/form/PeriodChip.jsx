import React from 'react';

import { parse, format } from 'date-fns';


import Chip from '@material-ui/core/Chip';

const isValidDate = (date) => {

    try {

        date.toISOString();

    } catch (err) {

        return false;
    }

    return true;
};

const PeriodChip = (props) => {
    
    const { label, ...rest } = props;

    const toLabel = twoDatesArray => twoDatesArray.join(' > ');

    const dates = label.split('>');

    const parsedDates = dates.length > 1 && dates.length < 3
        ? dates.map(date => {
            const parsedDate = parse(date.trim(), 'M-yy', new Date());
            return isValidDate(parsedDate) ? format(parsedDate, 'MMM yyyy') : "invalid"

    }) : ['invalid'];


    return (
        <Chip color={ parsedDates[0] === 'invalid' ? 'secondary' : 'default' } variant="outlined" label={ toLabel(parsedDates) } { ...rest } />
    );
};

export default PeriodChip;
