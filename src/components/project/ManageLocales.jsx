import { useState, useEffect } from 'react';
import { useLocale } from '@contexts/LocaleProvider';

const Twist = 'Twist'; 
const Ten = 'Ten';
const Right = 'Right';

const TestButton = ({ variant=Twist | Ten | Right }) => {
    return <button></button>
}

// {
//     locales=['nl-nl','de-de'],
//     label,
//     onChange=() => {}}

const ManageLocales = (props) => {
    const {
        locales,
        label,
        onChange} = props;
        
    const [selectedLocale, setSelectedLocale] = useState(null);
    const { selectLocale, setLocales } = useLocale();
    
    const handleChangeLocale = locale => () => {
        
        setSelectedLocale(locale); //?
        selectLocale(locale);
    }
        
    useEffect(() => {
        setLocales(locales)
    }, [locales]);
    
    const renderLocales = (locale, idx) => {

        if(locales.length === 1) {
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
                <li className="l-plain__item"><button className={ selectedLocale === null ? 'selected' : '' } onClick={ handleChangeLocale(null) }>none</button></li>
                { locales.map(renderLocales) }
            </ul>
        </fieldset>
    );
}


export default ManageLocales;
