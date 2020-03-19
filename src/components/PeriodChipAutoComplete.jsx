import React, { useState } from 'react';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PeriodChip from './PeriodChip';
import PeriodInput from './PeriodInput';

const useStyles = makeStyles(theme => ({
    root: {
            marginBottom: '1.5rem'
    }
}));

const PeriodChipAutoComplete = ({ value, onChange, defaultItemList = [], label = '' }) => {

    const classes = useStyles();
    const [items, setItems] = useState([]);

    const handleChange = (event, value) => {
        
        setItems(value);
        onChange(value);
    }

    const placeholder = items.length > 0 ? 'next' : label;
    return (
        <Autocomplete
            multiple
            className={ classes.root }
            id={ `${ label }tags-filled` }
            options={ defaultItemList.map(option => option.title) }
            value={ items }
            freeSolo
            onChange={ handleChange }
            renderTags={ (value, getTagProps) =>
                value.map((option, index) => (
                    <PeriodChip key={ index } label={ option } { ...getTagProps({ index }) } />
                ))
            }
            renderInput={ params => (
                <PeriodInput params={ params }
                    variant="outlined"
                    label={ label }
                    placeholder={ placeholder }
                    helperText={ <span>type a date range like: '2-16>3-17', hit enter, repeat</span> }/>
            ) }/>
    );
};

export default PeriodChipAutoComplete;
