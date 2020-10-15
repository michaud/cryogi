import React from 'react';
import TextField from '@material-ui/core/TextField';

import { useLocale } from '@contexts/LocaleProvider';

const LocalesTextField = ({
    required,
    label,
    value,
    data,
    onChange,
    className
}) => {

    const { selectedLocale, localeList } = useLocale();

    const localeTextIdx = localeList.indexOf(selectedLocale); 
    const idx = localeTextIdx > -1 ? localeTextIdx : 0;

    const handleOnChange = (e) => onChange(data)(e.target.value, value, idx);

    return (
        <div className="pos-rel">
            <TextField
                required={ required }
                label={ label }
                className={ className }
                InputLabelProps={{
                    shrink: true
                }}
                value={ value[idx] || '' }
                onChange={ handleOnChange }
                variant="outlined"/>
            <div className="locale-tag">{ selectedLocale }</div>
        </div>
    );
};

export default LocalesTextField;
