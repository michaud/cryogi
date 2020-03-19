import React, {
    useState,
    useEffect
} from 'react';

import { useAuth } from '@contexts/AuthProvider';
import saveListResourse from '@services/saveListResourse';

import PortfolioForm from '@components/portfolio/PortfolioForm';
import portfolio from '@constants/portfolio-namespace';
import paths from '@constants/paths';
import PortfolioList from '@components/portfolio/PortfolioList';
import { FlexContainer, FlexItem } from '@styled/layout.style';

const ManagePortfolios = ({ label }) => {

    const {
        portfolioData,
        isLoading,
        isError,
        reloadPortfolio
    } = useAuth();

    const [portfolios, setPortfolios] = useState([]);
   
    useEffect(() => {

        let isCancel = false;

        if(portfolioData.doc) {

            if(!isCancel) setPortfolios(portfolioData.list);
        }

        return () => { isCancel = true; }

    }, [portfolioData]);

    const onSavePortfolioHandler = async (item) => {

        await saveListResourse({
            resource: item,
            list: portfolioData.doc,
            type: portfolio.classes.Portfolio,
            listPath: paths.APP_DATA_LIST_PATH,
            itemPath: paths.APP_DATA_PORTFOLIO_PATH
        });

        reloadPortfolio();
    };

    return (
        <div>
            <h2>{ label }</h2>
            <FlexContainer>
                <FlexItem>
                    <PortfolioForm
                        label="Add portfolio"
                        onSave={ onSavePortfolioHandler }/>
                </FlexItem>
                <FlexItem>
                    <PortfolioList label="Porfolios" items={ portfolios }/>
                </FlexItem>
                
            </FlexContainer>
        </div>
    );
};

export default ManagePortfolios;
