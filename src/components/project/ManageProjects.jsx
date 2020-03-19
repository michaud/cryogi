import React, {
    useState,
    useEffect
} from 'react';

import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

const ManageProjects = ({ items, label }) => {

    const [projects, setProjects] = useState([]);

    const onSaveProjectHandler = async (item) => {

        // await saveListResourse({
        //     resource: item,
        //     list: portfolioData.doc,
        //     type: portfolio.classes.Portfolio,
        //     listPath: paths.APP_DATA_LIST_PATH,
        //     itemPath: paths.APP_DATA_PORTFOLIO_PATH
        // });

        // reloadPortfolio();
    };

    useEffect(() => {

        let didCancel = false;

        const init = () => {

            if(!didCancel) setProjects(items);
        }

        init();

        return () => { didCancel = true; }

    }, [items]);

    return (
        <div>
            <h3>{ label }</h3>
            <ProjectList items={ projects }/>
            <ProjectForm label="Add project" onSave={ onSaveProjectHandler }/>
        </div>
    );
};

export default ManageProjects;
