import React from 'react';

const ProjectList = ({ items }) => {
    return (
        <div>
        {
            items.map((project, idx) => <div key={ idx }>project</div>)
        }
        </div>
    );
};

export default ProjectList;
