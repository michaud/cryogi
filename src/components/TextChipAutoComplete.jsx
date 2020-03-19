import React, { useState } from 'react';

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
            marginBottom: '1.5rem'
    }
}));

const TextChipAutoComplete = ({ value, onChange, defaultItemList = [], label = '' }) => {

    const classes = useStyles();
    const [items, setItems] = useState([]);

    const handleChange = (event, value) => {
        
        setItems(value);
        onChange(value);
    }

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
                    <Chip key={ index }
                        variant="outlined"
                        label={ option }
                        { ...getTagProps({ index }) } />
                ))
            }
            renderInput={ params => (
                <TextField { ...params }
                    variant="outlined"
                    label={ label }
                    placeholder={ label }
                    helperText={ <span>type text, hit enter, repeat</span> }/>
            ) }/>
    );
};

export default TextChipAutoComplete;
