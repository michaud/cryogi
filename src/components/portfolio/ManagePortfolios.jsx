import React, {
    useState,
    useEffect
} from 'react';

import portfolio from '@constants/portfolio-namespace';
import paths from '@constants/paths';
import saveListResourse from '@services/saveListResourse';
import { useAppData } from '@contexts/AppDataProvider';

import PortfolioForm from '@components/portfolio/PortfolioForm';
import PortfolioList from '@components/portfolio/PortfolioList';

import { GridContainer } from '@styled/layout.style';

const ManagePortfolios = ({ label }) => {

    const {
        portfolioData,
        isLoading,
        isError,
        reloadPortfolios
    } = useAppData();

    const [portfolios, setPortfolios] = useState([]);
   
    useEffect(() => {

        let isCancel = false;

        if(portfolioData) {

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

        reloadPortfolios();
    };

    return (
        <div>
            <h2>{ label }</h2>
            <GridContainer>
                    <PortfolioForm
                        label="Add portfolio"
                        onSave={ onSavePortfolioHandler }/>
                    <PortfolioList label="Porfolios" items={ portfolios }/>
            </GridContainer>
        </div>
    );
};

export default ManagePortfolios;
