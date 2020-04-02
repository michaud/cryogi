import {
    useState,
    useEffect
} from 'react';

import iupdate from 'immutability-helper';

import Head from 'next/head';

import paths from '@constants/paths';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import portfolio from '@constants/portfolio-namespace';
import { useAppData } from '@contexts/AppDataProvider';
import deleteProjectFromPortfolios from '@services/deleteProjectFromPortfolios';

import ManageProjects from '@components/project/ManageProjects';
import ManagePortfolios from '@components/portfolio/ManagePortfolios';

import saveListResourse from '@services/saveListResourse';
import { GridContainer } from '@styled/layout.style';
import formStyles from '@styled/form.style';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import deleteListedItemByIri from '@services/deleteListedItemByIri';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const findPortfoliosWithProject = (project, portfolios) => portfolios.filter(portfolio => {

    const found = portfolio.projects.value.find(portfolioProject => project.iri === portfolioProject);

    if (found) return true;

    return false;
});

const Editor = () => {

    const {
        portfolioData,
        portfolioDataIsLoading,
        portfolioIsError,
        reloadPortfolios,
        projectData,
        projectDataIsLoading,
        projectIsError,
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

            if (!isCancel) setSelectedPortfolio(state => state ? iupdate(state, {
                projects: { value: { $set: linkedProjects } }
            }
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

            if (!portfolio) {

                setLinkedProjects();

                return undefined;
            }

            if (projects) {

                const gatheredProjects = findLinkedProjects(projects, portfolio);

                setLinkedProjects(gatheredProjects);
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

                const newState = state.reduce((acc, item) => {

                    if (item !== linkedProject) {

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
    };

    const handleSavePortfolio = async (item) => {

        await saveListResourse({
            resource: item,
            list: portfolioData.doc,
            type: portfolio.classes.Portfolio,
            listPath: paths.APP_DATA_LIST_PATH,
            itemPath: paths.APP_DATA_PORTFOLIO_PATH
        });

        setSelectedPortfolio();
        reloadPortfolios();
    };

    const handleDeletePortfolio = () => {

        deleteListedItemByIri(selectedPortfolio.iri, portfolioData, portfolio.classes.Portfolio);
        reloadPortfolios();
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
                <div className="">
                <GridContainer media={ [['600px', '1fr 2fr'], ['900px', '1fr 3fr'], ['1400px', '21rem 1fr']] }>
                    <div style={{ padding: '1rem', backgroundColor: 'rgb(126, 240, 224)', boxShadow:'rgb(100, 222, 205) 0px 0px 16px 3px inset'}}>
                        <p>With the Portfolio Editor you manage your portfolios in your Solid POD. </p>
                    </div>
                    <div style={{ padding: '0 0 0 1rem'}}>
                        <h2 className="first">Introduction</h2>
                        <p>Create portfolios</p>
                    </div>
                </GridContainer>
                </div>
            </div>

            <GridContainer media={ [['600px', '1fr 2fr'], ['900px', '1fr 3fr'], ['1400px', '21rem 1fr']] }>
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
                <DialogTitle className={ classes.dialogTitle } id="alert-dialog-title">{ "Project is part of portfolio!" }</DialogTitle>
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