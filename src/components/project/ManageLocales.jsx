import { useState, useEffect } from 'react';
import { useLocale } from '@contexts/LocaleProvider';

const ManageLocales = ({
    label,
    onChange
}) => {
        
    const [selectedLocale, setSelectedLocale] = useState(null);
    const [showAddLocale, setShowAddLocale] = useState(false);
    const [newLocale, setNewLocale] = useState('');
    const { selectLocale, setLocales, addLocale, localeList } = useLocale();
    
    const handleChangeLocale = locale => () => {
        
        setSelectedLocale(locale); //?
        selectLocale(locale);
    };

    const handleShowAddLocale = () => {
        setShowAddLocale(state => !state);
    };

    const handleNewLocale = e => {

        const val = e.target.value;
        setNewLocale(val);
    }

    const handleAddLocale = locale => {
        setShowAddLocale(false);
        addLocale(locale);
    };

    useEffect(() => {

        setLocales(_ => {

            if(localeList.length > 0 && !selectedLocale) setSelectedLocale(localeList[0])

            return localeList;
        });
    }, [localeList]);
    
    const renderLocales = (locale, idx) => {

        if(localeList.length === 1) {
            return (
                <span key={ idx }>{ locale }</span>
            );
        }

        return <li key={ idx } className="l-plain__item"><button className={ selectedLocale === locale ? 'selected' : '' } onClick={ handleChangeLocale(locale) } key={ idx }>{ locale }</button></li>
    };

    return (
        <fieldset className="loc-chooser">
            <label className="loc-chooser__label">{ label }</label>
            <ul className="l-plain--inline chooser">
                { localeList.map(renderLocales) }
                <li className="l-plain__item"><button onClick={ handleShowAddLocale }>+</button></li>
                {
                    showAddLocale && 
                    <>
                        <li className="l-plain__item"><input type="text" onChange={ handleNewLocale } value={ newLocale }/></li>
                        <li className="l-plain__item"><button onClick={ () => {

                            handleAddLocale(newLocale)
                        }}>add</button></li>
                    </>
                }
            </ul>
        </fieldset>
    );
}


export default ManageLocales;
