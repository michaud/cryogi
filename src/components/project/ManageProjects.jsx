import React, {
    useState,
    useEffect
} from 'react';

import ProjectForm from './ProjectForm';

const ManageProjects = ({ items, label }) => {

    const [projects, setProjects] = useState([]);

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
            <div>{ label }</div>
        {
            projects.length > 0 ?
                projects.map((project, idx) => <div key={ idx }>project</div>)
                : <ProjectForm/>
        }
        </div>
    );
};

export default ManageProjects;
