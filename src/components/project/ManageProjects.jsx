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

import Switch from '@components/util/Switch';

const ManageProjects = ({ items, label, selected, onSelect }) => {

    const [projects, setProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState();

    const {
        projectData,
        isLoading,
        isError,
        reloadProjects
    } = useAppData();
    
    
    useEffect(() => {
        
        let didCancel = false;
        
        const update = () => {
            
            if(items) {
                
                if(!didCancel) setProjects(items);
                
            } else if(projectData) {
                
                if(!didCancel) setProjects(projectData.list);
                setSelectedProjects(selected);
            }
        }
        
        update();
        
        return () => { didCancel = true; }
        
    }, [items, projectData.doc, selected]);

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

    const handleOnSelectProject = (iri) => {
        onSelect(iri);
    }
    
    return (
        <div>
            <h3>{ label }</h3>
            <Switch has={ projectData.list.length > 0 }>
                <>
                    <ProjectList onSelect={ handleOnSelectProject }
                        selected={ selectedProjects }
                        items={ projects }/>
                    <ProjectForm
                        label="Add project"
                        onSave={ onSaveProjectHandler }/>
                </>
                <ProjectForm
                    label="Add project"
                    onSave={ onSaveProjectHandler }/>
            </Switch>
        </div>
    );
};

export default ManageProjects;
