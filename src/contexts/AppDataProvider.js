import React, {
    createContext,
    useContext
} from 'react';

import 'setimmediate';

import useDataList from '@hooks/useDataList';
import portfolioNs from '@constants/portfolio-namespace';
import files from '@constants/files';
import usePublicTypeIndex from '@hooks/usePublicTypeIndex';

const AppDataContext = createContext();

const AppDataProvider = ({ children }) => {

    const [{
        publicTypeIndex,
        isLoading: publicTypeIndexIsLoading,
        isError: publicTypeIndexIsError
    }, reloadPublicTypeIndex] = usePublicTypeIndex();

    const [{
        listData: portfolioData,
        isLoading: portfolioDataIsLoading,
        isError: portfolioDataIsError
    }, reloadPortfolios ] = useDataList(
        publicTypeIndex,
        portfolioNs.classes.Portfolio,
        files.APP_PORTFOLIO_LIST_FILE_NAME
    );

    const [{
        listData: projectData,
        isLoading: projectDataIsLoading,
        isError: projectDataIsError
    }, reloadProjects ] = useDataList(
        publicTypeIndex,
        portfolioNs.classes.Project,
        files.APP_PROJECT_LIST_FILE_NAME
    );

    return (
        <AppDataContext.Provider value={ {
            portfolioData,
            portfolioDataIsLoading,
            portfolioDataIsError,
            reloadPortfolios,
            projectData,
            projectDataIsLoading,
            projectDataIsError,
            reloadProjects
        } }>{ children }</AppDataContext.Provider>
    )
};

const useAppData = () => {
    
    const value = useContext(AppDataContext);
    return {
        ...value
    }
};

export { AppDataProvider, useAppData };
