import {
    useState,
    useEffect
} from 'react';

import iupdate from 'immutability-helper';

import Head from 'next/head';

import portfolio from '@constants/portfolio-namespace';
import { useAppData } from '@contexts/AppDataProvider';

import ManageProjects from '@components/project/ManageProjects';
import ManagePortfolios from '@components/portfolio/ManagePortfolios';

import { PageContainer } from '@styled/page.style';
import saveListResourse from '@services/saveListResourse';
import { GridContainer } from '@styled/layout.style';
import paths from '@constants/paths';

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
    
    const [linkedProjects, setLinkedProjects] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [selectedPortfolio, setSelectedPortfolio] = useState();
    const [portfolios, setPortfolios] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {

        let isCancel = false;

        const update = () => {

            if(portfolioData) {

                if(!isCancel) setPortfolios(portfolioData.list);
            }

            if(projectData && !isCancel) {

                setProjects(projectData.list);
            }

            if(!isCancel) setSelectedPortfolio(state => state ? iupdate(state, {
                    projects: { value: { $set: linkedProjects }}}
                ) : undefined);
        }

        update();

        return () => { isCancel = true; }

    }, [portfolioData, projectData, linkedProjects]);

    const findLinkedProjects = (projects, portfolio) => portfolio.projects.value
        .map(project => projects
            .find(projectObj => projectObj.iri === project).iri);

    const handleSelectPortfolio = (portfolio) => {

        setSelectedPortfolio(state => {

            if(!portfolio) {

                setLinkedProjects();

                return undefined;
            }

            if(projects) {

                const gatheredProjects = findLinkedProjects(projects, portfolio);

                setLinkedProjects(gatheredProjects);
            } 

            return portfolio;
        });
    };

    const handleOnSelectProject = iri => {
        
        setSelectedProject(state => state === iri ? undefined : iri);
    }

    const handleLinkProject = iri => {

        const candidateProject = projectData.list.find(proj => proj.iri === iri);
        const linkedProject = linkedProjects.find(sProj => sProj === candidateProject.iri);

        if(linkedProject) {

            setLinkedProjects(state => {
    
                const newState = state.reduce((acc, item) => {
    
                    if(item !== linkedProject) {
    
                        acc.push(item);
                    }
    
                    return acc;
    
                }, []);
    
                return newState;
            });

        } else {

            setLinkedProjects(state => iupdate(state, {
                $push: [candidateProject.iri]
            }));
        }
    }

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
            <GridContainer media={[['600px','1fr 2fr'],['900px','1fr 3fr'], ['1400px','21rem 1fr']]}>
                <div>
                <ManagePortfolios
                    portfolios={ portfolios }
                    label={ 'Portfolios' }
                    selected={ selectedPortfolio }
                    onSelect={ handleSelectPortfolio }
                    onSave={ handleSavePortfolio }/>
                </div>
                <ManageProjects
                    projects={ projects }
                    label={ 'Projects' }
                    selected={ selectedProject }
                    onSelect={ handleOnSelectProject }
                    linked={ linkedProjects }
                    onLink={ handleLinkProject }/>
            </GridContainer>
        </PageContainer>
        </>
    )
};

export default Editor;
