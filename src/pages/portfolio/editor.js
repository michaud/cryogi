import {
    useEffect,
    useState
} from 'react';

import { useAuth } from '@contexts/AuthProvider';
import { PageContainer } from '@styled/page.style';
import PortfolioForm from '@components/portfolio/PortfolioForm';
import setupDataObject from '@utils/setupDataObject';
import portfolioShape from '@contexts/shapes/portfolio-shape.json';

const Editor = (props) => {

    const {
        portfolioData,
        isLoading,
        isError,
        reloadPortfolio
    } = useAuth();

    const [doc, setDoc] = useState();
    const [portfolio, setPortfolio] = useState();
   
    useEffect(() => {

        if(portfolioData.doc) {
            setDoc(portfolioData.doc);
        } else {
            setPortfolio(setupDataObject(portfolioShape));
        }
    }, [portfolioData]);

    return (
        <PageContainer>
            <PortfolioForm label={ portfolioShape.label }/>
        </PageContainer>
    )
};

export default Editor;
