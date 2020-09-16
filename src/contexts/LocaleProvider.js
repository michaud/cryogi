import React, {
    createContext,
    useContext,
    useState
} from 'react';

const LocaleContext = createContext();

const LocaleProvider = ({ children }) => {

    const [selectedLocale, setSelectedLocale] = useState('nl-nl');
    const [localeList, setLocaleList] = useState([]);

    const selectLocale = locale => {

        setSelectedLocale(locale);
    };

    const setLocales = locales => {

        setLocaleList(locales);
    };


    return (
        <LocaleContext.Provider value={ {
            selectedLocale,
            selectLocale,
            localeList,
            setLocales
        } }>{ children }</LocaleContext.Provider>
    )
};

const useLocale = () => {
    
    const value = useContext(LocaleContext);

    return {
        ...value
    }
};

export { LocaleProvider, useLocale };
