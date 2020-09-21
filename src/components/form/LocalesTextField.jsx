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
    const idx = localeList.indexOf(selectedLocale);
    return (
        <div className="pos-rel">
            <TextField
                required={ required }
                label={ label }
                className={ className }
                InputLabelProps={{
                    shrink: true,
                    classes: { root: 'plop' }
                }}
                value={ value[idx] || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
            <div className="locale-tag">{ selectedLocale }</div>
        </div>
    );
};

export default LocalesTextField;
