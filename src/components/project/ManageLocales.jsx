import React, { useState } from 'react';

const ManageLocales = ({
    locales= ['nl-nl','de-de'],
    label,
    onChange = () => {}}) => {

    const [selectedLocale, setSelectedLocale] = useState(null);

    const handleChangeLocale = (locale) => () => {

        setSelectedLocale(locale);
    }

    const renderLocales = (locale, idx) => {

        if(locales.length === 1) {
            return (
                <span key={ idx }>{ locale }</span>
            );
        }

        return <button onClick={ handleChangeLocale(locale) } key={ idx }>{ locale }</button>
    };

    return (
        <div>{ label } 
        { locales.map(renderLocales) }
        </div>
    );
}


export default ManageLocales;
