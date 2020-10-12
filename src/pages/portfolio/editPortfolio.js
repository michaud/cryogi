import Authentication from '@components/Authentication';
import Editor from '@components/portfolio/Editor';
import { LocaleProvider } from '@contexts/LocaleProvider';

import { useAuth } from '@contexts/AuthProvider';
import { PageContainer } from '@styled/page.style';

const editPortfolio = () => {

    const { webId } = useAuth();

    return (
        <LocaleProvider>
        <PageContainer>
            <Authentication/>
            <h1>Portfolio editor</h1>
            { webId && <Editor/> }
        </PageContainer>
        </LocaleProvider>
    );
};

export default editPortfolio;
