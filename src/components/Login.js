import {
    useEffect,
    useState
} from 'react';

import { useAuth } from '@contexts/AuthProvider';

const Login = () => {

    const { webId, userName, login } = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {

        if(webId) {
            setLoggedIn(true);
        }

    }, [webId])

    const loginHandler = () => {
        login();
    };
    
    const logoutHandler = () => {

    };

    return (
        <div className="nav-bar">
            { loggedIn ?
                <button onClick={ logoutHandler }>{ userName }</button>
                : <button onClick={ loginHandler }>Login</button>
            }
        </div>
    )
};

export default Login;
