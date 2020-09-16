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

    return (
        <div>
            <div>{ localeList.map((locale,idx) => <span key={idx}>{ locale },</span>)}</div>
            <TextField
                required={ required }
                label={ <div>{ label }<span>{ selectedLocale }</span></div> }
                className={ className }
                InputLabelProps={{
                    shrink: true,
                    classes: { root: 'plop' }
                }}
                value={ value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        </div>
    );
};

export default LocalesTextField;
