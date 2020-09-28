import {
    useState,
    useEffect,
    useRef
} from 'react';
import { useLocale } from '@contexts/LocaleProvider';

const ManageLocales = ({
    label,
    onChange
}) => {

    const [selectedLocale, setSelectedLocale] = useState(null);
    const [showAddLocale, setShowAddLocale] = useState(false);
    const [newLocale, setNewLocale] = useState('');

    const newLocaleRef = useRef(null);

    const handleChangeLocale = locale => () => {
        
        setSelectedLocale(locale); //?
        selectLocale(locale);
    };

    const handleShowAddLocale = () => setShowAddLocale(state => !state);

    const handleNewLocale = e => {

        const val = e.target.value;
        setNewLocale(val);
    }

    const handleAddLocale = () => {
        setShowAddLocale(false);
        addLocale(newLocale);
    };

    const handleNewLocaleKeyUp = e => {

        const key = e.key;

        if(key === 'Enter' && newLocaleRef.current.value.length > 0) {

            handleAddLocale();
        }
    };

    useEffect(() => {

        setLocales(() => {

            if(localeList.length > 0 && selectedLocale === null) setSelectedLocale(localeList[0])

            return localeList;
        });
    }, [localeList]);

    useEffect(() => {

        if(showAddLocale) {
            newLocaleRef.current.focus();
        }
    }, [showAddLocale])
    
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
                        <li className="l-plain__item"><input ref={ newLocaleRef } type="text" onChange={ handleNewLocale } onKeyUp={ handleNewLocaleKeyUp } value={ newLocale }/></li>
                        <li className="l-plain__item"><button onClick={ handleAddLocale }>add</button></li>
                    </>
                }
            </ul>
        </fieldset>
    );
}


export default ManageLocales;
