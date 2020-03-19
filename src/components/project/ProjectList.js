import React from 'react';

const ProjectList = ({ items, label }) => {

    return (
        <div>
            <h3>{ label }</h3>
            {
                items.map((project, idx) => {
                return <div key={ idx }>p:{ project.item.projectName.value }</div>
            })
            }
        </div>
    );
};

export default ProjectList;
