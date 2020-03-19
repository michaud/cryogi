import { PageContainer } from '@styled/page.style';
import ManagePortfolios from '@components/portfolio/ManagePortfolios';

const Editor = () => {

    return (
        <PageContainer>
            <h1>Portfolio editor</h1>
            <ManagePortfolios label={ 'Portfolios' }/>
        </PageContainer>
    )
};

export default Editor;
