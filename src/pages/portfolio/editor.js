import { PageContainer } from '@styled/page.style';
import ManagePortfolios from '@components/portfolio/ManagePortfolios';
import ManageProjects from '@components/project/ManageProjects';

const Editor = () => {

    return (
        <PageContainer>
            <h1>Portfolio editor</h1>
            <ManagePortfolios label={ 'Portfolios' }/>
            <ManageProjects label={ 'Projects' }/>
        </PageContainer>
    )
};

export default Editor;
