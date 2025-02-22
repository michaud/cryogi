import {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import 'setimmediate';

import { useRouter } from 'next/router';

const auth = require('solid-auth-client');
const { default: data } = require('@solid/query-ldflex');

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const { pathname, events } = useRouter();
    const [webId, setWebId] = useState();
    const [userName, setUserName] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const setUserData = async () => {

        const user = await data.user;
        const me = await data.user.value;
        const name = await user.name;

        if (me && name) {
            
            setWebId(me);
            setUserName(name.value);
        }
    };

    const  getWebId = async () => {

        try {
        
            let session = await auth.currentSession();

            if (!session) {

                setWebId(null)
                setIsLoading(false);

            } else {

                setUserData();
                setIsLoading(false);
            }

        } catch (err) {

            setIsLoading(false);
            console.error(err)
        }
    };

    useEffect(() => {

        setIsLoading(true);

        getWebId();
    }, [pathname]);

    const login = async () => {

        let session = await auth.currentSession();
        //TODO make configurable?
        let popupUri = 'https://inrupt.net/common/popup.html';

        if (!session) {
            session = await auth.popupLogin({ popupUri });
        }

        setUserData();
    };

    useEffect(() => {
        // // Check that a new route is OK
        // const handleRouteChange = url => {
        //     if (url !== '/' && !user) {
        //         window.location.href = '/'
        //     }
        // }

        // // // Check that initial route is OK
        // // if (pathname !== '/' && user === null) {
        // //     window.location.href = '/'
        // // }

        // // Monitor routes
        // events.on('routeChangeStart', handleRouteChange)
        // return () => {
        //     events.off('routeChangeStart', handleRouteChange)
        // }
    }, [webId])

    return (
        <AuthContext.Provider value={ {
            auth,
            webId,
            userName,
            userData: data,
            isLoading,
            login
        } }>{ children }</AuthContext.Provider>
    );
};

const useAuth = () => {
    
    const value = useContext(AuthContext);
    return {
        ...value
    }
};

export { AuthProvider, useAuth };
