import Authentication from '@components/Authentication';
import Editor from '@components/portfolio/Editor';

import { useAuth } from '@contexts/AuthProvider';
import { PageContainer } from '@styled/page.style';

const editPortfolio = () => {

    const { webId } = useAuth();

    return (
        <PageContainer>
            <Authentication/>
            <h1>Portfolio editor plop</h1>
            { webId && <Editor/> }
        </PageContainer>
    );
};

export default editPortfolio;
