import {
    createContext,
    useContext,
    useState
} from 'react';

const LocaleContext = createContext();

const LocaleProvider = ({ children }) => {

    const [selectedLocale, setSelectedLocale] = useState(null);
    const [localeList, setLocaleList] = useState([]);

    const selectLocale = locale => {

        setSelectedLocale(locale);
    };

    const setLocales = locales => {

        if(locales.length === 0) {

            setSelectedLocale(null)
        }

        setLocaleList(locales);
    };

    const addLocale = locale => {

        setLocaleList(state => [...state, locale]);
        setSelectedLocale(locale);
    };

    return (
        <LocaleContext.Provider value={ {
            selectedLocale,
            selectLocale,
            localeList,
            setLocales,
            addLocale
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
