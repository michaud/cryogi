import {
    useState,
    useEffect
} from 'react';

import iupdate from 'immutability-helper';

import Head from 'next/head';

import { useAppData } from '@contexts/AppDataProvider';

import ManageProjects from '@components/project/ManageProjects';
import ManagePortfolios from '@components/portfolio/ManagePortfolios';

import { PageContainer } from '@styled/page.style';

const Editor = () => {

    
    const {
        portfolioData,
        isLoading: portfolioIsLoading,
        isError: portfolioIsError,
        reloadPortfolios,
        projectData,
        isLoading: projectIsLoading,
        isError: projectIsError,
        reloadProjects
    } = useAppData();
    
    const [selectedProjects, setSelectedProjects] = useState();
    const [selectedPortfolio, setSelectedPortfolio] = useState();
    const [portfolios, setPortfolios] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        let isCancel = false;

        const update = ()=> {

            if(portfolioData) {

                if(!isCancel) setPortfolios(portfolioData.list);
            }

            if(projectData && !isCancel) {

                setProjects(projectData.list);

                let removeProject = undefined;

                setSelectedPortfolio(state => {
                    
                    const selectedProjectData = [];

                    selectedProjects ? selectedProjects
                        .map(selProject => {

                            const candidateProject = projectData.list
                                .find(proj => proj.item.iri === selProject);
                            const testProjectId = selectedProjectData
                                .findIndex(test => test.item.iri === candidateProject.item.iri);

                            const isUniqueProject = testProjectId === -1;

                            if(isUniqueProject) {
                                selectedProjectData.push(candidateProject);
                            } else {
                                removeProject = candidateProject;
                            }
                            
                        }) : undefined;

                        if(removeProject) setSelectedProjects(state => state
                            .filter(proj => proj !== removeProject.item.iri));
    
                        return state
                            ? iupdate(state, {
                                item: {
                                    projects: {
                                        value : { $set : selectedProjectData }
                                    }
                                }
                            }) : undefined;
                    });
                }
        }

        update();

        return () => { isCancel = true; }

    }, [portfolioData, projectData, selectedProjects]);

    const findSelectedProjects = (projects, portfolio) => {

        const selectedProjects = portfolio.item.projects.value.map(project => {

            return projects.find(projectObj => projectObj.item.iri === project.item.iri);
        })
        return selectedProjects;
    }

    const handleSelectPortfolio = (portfolio) => {

        setSelectedPortfolio(state => {

            if(!portfolio) return undefined;
            const projects = findSelectedProjects(projects, portfolio);

            if(projectData.doc) setSelectedProjects(projects);

            return portfolio;
        });
    };

    const handleSelectProject = (iri) => setSelectedProjects(state => {
        
        return iupdate(state, { $push: [iri]})
    });

    const handleSavePortfolio = async (item) => {

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
        <>
        <Head>
            <title>Portfolio editor</title>
        </Head>
        <PageContainer>
            <h1>Portfolio editor</h1>
            <ManagePortfolios
                portfolios={ portfolios }
                label={ 'Portfolios' }
                selected={ selectedPortfolio }
                onSelect={ handleSelectPortfolio }
                onSave={ handleSavePortfolio }/>
            <ManageProjects
                projects={ projects }
                label={ 'Projects' }
                selected={ selectedProjects }
                onSelect={ handleSelectProject }/>
        </PageContainer>
        </>
    )
};

export default Editor;
