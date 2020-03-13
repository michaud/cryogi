import { AuthProvider } from '@contexts/AuthProvider';

import '@styles/_style.scss';

const App = ({ Component, pageProps }) => {

    return <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>;
}
export default App;
