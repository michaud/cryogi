import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';

import 'setimmediate';

import { useRouter } from 'next/router';
import usePortfolios from '@hooks/usePortfolios';
import usePublicTypeIndex from '@hooks/usePublicTypeIndex';
import portfolioNs from '@constants/portfolio-namespace';
import files from '@constants/files';

const auth = require('solid-auth-client');
const { default: data } = require('@solid/query-ldflex');

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const { pathname, events } = useRouter();
    const [webId, setWebId] = useState();
    const [userName, setUserName] = useState();
    const [publicTypeIndexRef, setPublicTypeIndexRef] = useState();

    const [{
        publicTypeIndex,
        isLoading: publicTypeIndexIsLoading,
        isError: publicTypeIndexIsError
    }, reloadPublicTypeIndex] = usePublicTypeIndex();

    const [{
        listData: portfolioData,
        isLoading: portfolioDataIsLoading,
        isError: portfolioDataIsError
    }, reloadPortfolio ] = usePortfolios(
        publicTypeIndex,
        portfolioNs.classes.Portfolio,
        files.APP_PORTFOLIO_LIST_FILE_NAME
    );

    const setUserData = async () => {

        const user = await data.user;
        const me = await data.user.value;
        const name = await user.name;
        const publicTypeIndex = await user.publicTypeIndex;

        if (me && name && publicTypeIndex) {
            
            setPublicTypeIndexRef(publicTypeIndex.value);
            setWebId(me);
            setUserName(name.value);
        }
    };

    const  getWebId = async () => {

        try {
        
            let session = await auth.currentSession();

            if (!session) {

                setWebId(null)

            } else {

                setUserData();
            }

        } catch (err) {

            console.error(err)
        }
    };

    useEffect(() => {
        getWebId();
    }, [pathname]);

    const login = async () => {

        let session = await auth.currentSession();

        let popupUri = 'https://solid.community/common/popup.html';

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
            publicTypeIndexRef,
            userName,
            userData: data,
            portfolioData,
            reloadPublicTypeIndex,
            publicTypeIndexIsLoading,
            publicTypeIndexIsError,
            portfolioDataIsLoading,
            portfolioDataIsError,
            reloadPortfolio,
            login
        } }>{ children }</AuthContext.Provider>
    )
};

const useAuth = () => {
    
    const value = useContext(AuthContext);
    return {
        ...value
    }
};

export { AuthProvider, useAuth };
