import { AuthProvider } from '@contexts/AuthProvider';

import '@styles/_style.scss';
import { AppDataProvider } from '@contexts/AppDataProvider';

const App = ({ Component, pageProps }) => {

    return <AuthProvider>
        <AppDataProvider>
        <Component { ...pageProps } />
        </AppDataProvider>
    </AuthProvider>;
}
export default App;
