import {
    useEffect,
    useState
} from 'react';

import { useAuth } from '@contexts/AuthProvider';

const Authentication = () => {

    const { webId, userName, isLoading, login } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        if(webId) {
            setLoggedIn(true);
        }

    }, [webId])

    const handleLogin = () => {
        login();
    };

    return (
        <div className="nav-bar">
            { isLoading ?
                <button>loading</button> :
             loggedIn ?
                <button onClick={ handleLogin }>{ userName }</button>
                : <button onClick={ handleLogin }>Login</button>
            }
        </div>
    )
};

export default Authentication;
