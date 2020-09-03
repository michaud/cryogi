import {
    useState,
    useEffect
} from 'react';

import iupdate from 'immutability-helper';

import Head from 'next/head';

import paths from '@constants/paths';
import portfolio from '@constants/portfolio-namespace';
import { useAppData } from '@contexts/AppDataProvider';
import saveListResourse from '@services/saveListResourse';
import deleteProjectFromPortfolios from '@services/deleteProjectFromPortfolios';
import deleteListedItemByIri from '@services/deleteListedItemByIri';
import findPortfoliosWithProject from '@utils/findPortfoliosWithProject';
import findLinkedProjects from '@utils/findLinkedProjects';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import ManageProjects from '@components/project/ManageProjects';
import ManagePortfolios from '@components/portfolio/ManagePortfolios';
import Feature from '@components/editor/feature';
import Intro from '@components/editor/Intro';

import { GridContainer } from '@styled/layout.style';
import formStyles from '@styled/form.style';

const Editor = () => {

    const {
        portfolioData,
        reloadPortfolios,
        projectData,
        reloadProjects
    } = useAppData();

    const [linkedProjects, setLinkedProjects] = useState();
    const [selectedProject, setSelectedProject] = useState();
    const [selectedPortfolio, setSelectedPortfolio] = useState();
    const [portfolios, setPortfolios] = useState([]);
    const [projects, setProjects] = useState([]);
    const [portfoliosWithProject, setPortfoliosWithProject] = useState();
    const [open, setOpen] = useState(false);
    const [deletingProjectFromPortfolios, setDeletingProjectFromPortfolios] = useState(false);

    const classes = formStyles();

    useEffect(() => {

        let isCancel = false;

        const update = () => {

            if (portfolioData) {

                if (!isCancel) setPortfolios(portfolioData.list);
            }

            if (projectData && !isCancel) {

                setProjects(projectData.list);
            }

            if (!isCancel) {
                
                setSelectedPortfolio(state => {
                
                    const hasPorfolios = portfolioData.list.length > 0;

                    if(!hasPorfolios) {

                        setLinkedProjects();
                        return undefined;
                    }

                    if(state) {

                        return iupdate(state, {
                            projects: { value: { $set: linkedProjects } }
                        })
                    }
                });
            }
        }

        update();

        return () => { isCancel = true; }

    }, [portfolioData, projectData, linkedProjects]);

    const handleSelectPortfolio = (portfolio) => {

        setSelectedPortfolio(state => {

            if (!portfolio) {

                setLinkedProjects();

                return undefined;
            }

            if (projects) {

                const gatheredProjects = findLinkedProjects(projects, portfolio);

                setLinkedProjects(gatheredProjects);
            }

            if(state && state.iri === portfolio.iri) {

                setLinkedProjects();
                return undefined;
            }

            return portfolio;
        });
    };

    const handleSelectProject = iri => {

        setSelectedProject(state => state === iri ? undefined : iri);
    };

    const handleClose = handle => () => {

        if (!handle) setOpen(false);

        setDeletingProjectFromPortfolios(true);

        deleteProjectFromPortfolios(selectedProject, portfoliosWithProject, () => {

            setOpen(false);
            setDeletingProjectFromPortfolios(false);
            reloadPortfolios();
        });

        deleteListedItemByIri(selectedProject, projectData, portfolio.classes.Project);
        setSelectedPortfolio();
        reloadProjects();
    };

    const handleDeleteProject = project => {

        const items = findPortfoliosWithProject(project, portfolios);

        if (items.length > 0) {

            setPortfoliosWithProject(items);
            setOpen(true);

        } else {

            deleteListedItemByIri(selectedProject, projectData, portfolio.classes.Project);
            reloadProjects();
        }
    };

    const handleLinkProject = iri => {

        const candidateProject = projectData.list.find(proj => proj.iri === iri);
        const linkedProject = linkedProjects.find(sProj => sProj === candidateProject.iri);

        if (linkedProject) {

            setLinkedProjects(state => {

                const linked = state.reduce((acc, item) => {

                    if (item !== linkedProject) {

                        acc.push(item);
                    }

                    return acc;

                }, []);

                return linked;
            });

        } else {

            setLinkedProjects(state => iupdate(state, {
                $push: [candidateProject.iri]
            }));
        }
    };

    const handleSavePortfolio = async item => {

        await saveListResourse({
            resource: item,
            list: portfolioData.doc,
            type: portfolio.classes.Portfolio,
            listPath: paths.APP_DATA_LIST_PATH,
            itemPath: paths.APP_DATA_PORTFOLIO_PATH
        });

        reloadPortfolios();
    };

    const handleDeletePortfolio = () => {

        deleteListedItemByIri(selectedPortfolio.iri, portfolioData, portfolio.classes.Portfolio);
        reloadPortfolios();
        setSelectedPortfolio();
    };

    const isMultiple = !portfoliosWithProject ? false : portfoliosWithProject.length > 1 ? true : false;
    const dialogFirstText = `project is part of ${isMultiple ? 'these' : 'this'} portfolio${isMultiple ? 's' : ''}`;
    const dialogSecondText = `the project will be removed from ${isMultiple ? 'these' : 'this'} portfolio${isMultiple ? 's' : ''}.`;

    return (
        <>
            <Head>
                <title>Portfolio editor</title>
            </Head>

            <div className="c-panel c-panel--heels">
                <div>
                <GridContainer gap="0" media={ [['800px', '1fr 2fr', '2rem'], ['1100px', '1fr 3fr', '2rem'], ['1400px', '21rem 1fr', '2rem']] }>
                    <Feature/>
                    <Intro/>
                </GridContainer>
                </div>
            </div>

            <GridContainer media={ [['800px', '1fr 2fr'], ['1100px', '1fr 3fr'], ['1400px', '21rem 1fr']] }>
                <div>
                    <ManagePortfolios
                        portfolios={ portfolios }
                        label={ 'Portfolios' }
                        selected={ selectedPortfolio }
                        onSelect={ handleSelectPortfolio }
                        onSave={ handleSavePortfolio }
                        onDelete={ handleDeletePortfolio } />
                </div>
                <ManageProjects
                    projects={ projects }
                    label={ 'Projects' }
                    linked={ linkedProjects }
                    selected={ selectedProject }
                    onSelect={ handleSelectProject }
                    onDelete={ handleDeleteProject }
                    onLink={ handleLinkProject } />
            </GridContainer>
            <Dialog
                open={ open }
                onClose={ handleClose }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle
                    className={ classes.dialogTitle }
                    id="alert-dialog-title">{ "Project is part of portfolio!" }</DialogTitle>
                <DialogContent className={ classes.dialogContent }>
                    <p>{ dialogFirstText }:</p>
                    { portfoliosWithProject && <ul>{
                        portfoliosWithProject.map((portf, idx) => <li key={ idx }>{ portf.portfolioName.value }</li>)
                    }</ul>
                    }
                    <p>{ dialogSecondText }</p>

                    <p>Is that OK?</p>
                    { deletingProjectFromPortfolios ? <LinearProgress /> : null }
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose(false) } color="primary">Na, I'll check first</Button>
                    <Button onClick={ handleClose(true) } color="primary" autoFocus>Yeah, go ahead</Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default Editor;
