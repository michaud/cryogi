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

import { GridContainer } from '@styled/layout.style';

const ManageProjects = ({ items, label }) => {

    const [projects, setProjects] = useState([]);

    const {
        projectData,
        isLoading,
        isError,
        reloadProjects
    } = useAppData();
    
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

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(items) {

                if(!didCancel) setProjects(items);

            } else if(projectData) {

                if(!didCancel) setProjects(projectData.list);
            }
        }

        init();

        return () => { didCancel = true; }

    }, [items, projectData.doc]);

    return (
        <div>
            <h3>{ label }</h3>
            <GridContainer>
                <ProjectForm
                    label="Add project"
                    onSave={ onSaveProjectHandler }/>
                <ProjectList
                    label="Projects"
                    items={ projects }/>
            </GridContainer>
        </div>
    );
};

export default ManageProjects;
