import React, {
    useState,
    useEffect
} from 'react';

import saveListResourse from '@services/saveListResourse';
import paths from '@constants/paths';
import { useAppData } from '@contexts/AppDataProvider';
import portfolio from '@constants/portfolio-namespace';

import ProjectForm from '@components/project/ProjectForm';
import ProjectList from '@components/project/ProjectList';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import { GridContainer } from '@styled/layout.style';

const ManageProjects = ({ projects:items, label, selected, linked, onLink, onSelect }) => {

    const [projects, setProjects] = useState([]);
    const [linkedProjects, setLinkedProjects] = useState();
    const [showAdd, setShowAdd] = useState(false);
    const [selectedProject, setSelectedProject] = useState();

    const {
        projectDataIsLoading,
        reloadProjects
    } = useAppData();
    
    useEffect(() => {
        
        let didCancel = false;
        
        const update = () => {
            
            if(items) {
                
                if(!didCancel) {
                    
                    setProjects(items);
                    setLinkedProjects(linked);
                    
                    setSelectedProject(state => {

                        if(state && state.iri === selected) {
                            setShowAdd(false);
                            return undefined;
                        }

                        const found = projects.find(item => item.iri === selected);

                        if(!found) {
                            setShowAdd(false);

                            return undefined;
                        }

                        setShowAdd(true);

                        return found;
                    });

                }
            }
        }
        
        update();
        
        return () => { didCancel = true; }
        
    }, [items, linked, selected]);

    const onSaveProjectHandler = async (item) => {

        await saveListResourse({
            resource: item,
            list: projectData.doc,
            type: portfolio.classes.Project,
            listPath: paths.APP_DATA_LIST_PATH,
            itemPath: paths.APP_DATA_PROJECT_PATH
        });

        reloadProjects();
    };

    const handleOnLinkProject = iri => onLink(iri);
    const handleOnSelectProject = iri => {

        onSelect(iri);
    };

    const handleShowAdd = () => {

        if(selectedProject) onSelect(selectedProject.iri);
        setShowAdd(state => !state);
    };

    const hasProjects = projects.length > 0;
    const showForm = !projectDataIsLoading && (!hasProjects || showAdd );
  
    return (
        <div className="c-panel">
            <h3 className="c-tool-header">
                <span>{ label }</span>
                <span>
                    { hasProjects
                        ? <IconButton aria-label="edit"
                            onClick={ handleShowAdd }>
                            { !showForm
                                ? <AddCircleIcon fontSize="large" style={ { color: 'rgb(0, 143, 0)' } } />
                                : <CancelIcon fontSize="large" style={ { color: 'rgb(0, 143, 0)' } } />
                            }
                        </IconButton>
                    : null
                    }
                </span>
            </h3>
            <GridContainer className="l-elbow"
                media={[
                    ['600px',`${ showAdd || selectedProject  ? '1fr' : '1fr' }`],
                    ['1300px',`${ showAdd || selectedProject ? '1fr 21rem' : '1fr 21rem' }`]
                ]}>
                <ProjectList
                    onLink={ handleOnLinkProject }
                    onSelect={ handleOnSelectProject }
                    selected={ selected }
                    linked={ linkedProjects }
                    items={ projects }/>
                {  showForm && <ProjectForm
                    item={ selectedProject }
                    onSave={ onSaveProjectHandler }/>
                }
            </GridContainer>
        </div>
    );
};

export default ManageProjects;
