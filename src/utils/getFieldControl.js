import React from 'react';

import TextField from '@material-ui/core/TextField';
import ManageProjects from '@components/project/ManageProjects';
import ManagePeriods from '@components/project/ManagePeriods';
import ManageScreenshots from '@components/project/ManageScreenshots'; 
import DateTimeSelector from '@components/DateTimeSelector';
import TextChipAutoComplete from '@components/TextChipAutoComplete';

import ulog from 'ulog';

import portfolio from "@constants/portfolio-namespace";

const log = ulog('usePublicTypeIndex');

const getFieldControl = ({
    data,
    label,
    styles,
    onChange,
    idx,
    ...rest
}) => {

    const required = data.hasOwnProperty('required') ? data.required : true;

    switch(data.type) {

        case portfolio.types.string : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case portfolio.types.text : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case portfolio.types.integer : {

            const value = typeof(data.value) !== 'number' || isNaN(data.value)  ? '' : data.value;

            return <TextField key={ idx }
                required
                type="number"
                label={ data.label }
                value={ value }
                className={ styles.textField }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case portfolio.types.dateTime : {

            return <DateTimeSelector
                key={ idx }
                label={ data.label }
                onChange={ onChange(data) }/>
        }


        case portfolio.classes.Project : {

            return <ManageProjects
                key={ idx }
                items={ data.value }
                onChange={ onChange(data) }
                label={ data.label }/>
        }

        case portfolio.classes.DatePeriod: {

            return <ManagePeriods
                items={ data.value }
                label={ data.label }
                onChange={ onChange(data) }
                key={ idx }/>
        }

        case portfolio.classes.Agency : {

            return <TextField key={ idx }
                required={ required }
                label={ data.label }
                className={ styles.textField }
                value={ data.value || '' }
                onChange={ onChange(data) }
                variant="outlined"/>
        }

        case portfolio.classes.Screenshot : {

            return <ManageScreenshots
                items={ data.value }
                label={ data.label }
                onChange={ onChange(data) }
                key={ idx }/>
        }

        case portfolio.types.technology : {

            return <TextChipAutoComplete
                label={ data.label }
                value={ data.value }
                onChange={ onChange(data) }
                key={ `technology${ idx}` }/>
        }

        case portfolio.types.role : {
            return <TextChipAutoComplete
                label={ data.label }
                value={ data.value }
                onChange={ onChange(data) }
                key={ `role${ idx}` }/>

        }

        case portfolio.types.responsibility : {

            return <TextChipAutoComplete
                label={ data.label }
                value={ data.value }
                onChange={ onChange(data) }
                key={ `responsibility${ idx}` }/>
        }

        case portfolio.types.tool : {

            return <TextChipAutoComplete
                label={ data.label }
                value={ data.value }
                onChange={ onChange(data) }
                key={ `tool${ idx }` }/>
        }

        case portfolio.default: {

            log.error('can not find a control:', data);

            return null;
        }
    }
};

export default getFieldControl;
