import React, {
    useState,
    useEffect
} from 'react';

import { GridContainer } from '@styled/layout.style';

import ProjectSummary from '@components/project/ProjectSummary';

const ProjectList = ({ items, label, selected, onSelect }) => {

    const [selectedProjects, setSelectedProjects] = useState();

    useEffect(() => {

        let isCancel = false;

        const update = () => {

            if(!isCancel && selected) setSelectedProjects(selected);
        }

        update();

        return () => { isCancel = true; }

    },[selected]);

    const handleOnSelect = (iri) => {

        onSelect(iri);
    };

    return (
        <div className="c-box">
            <h3>{ label }</h3>
            <GridContainer>
            {
                items.map(({item: project}, idx) => {

                    const isSelected = selected  === undefined
                        ? undefined
                        : selected.findIndex(sel => sel === project.iri) > -1;
                    return <ProjectSummary onSelect={ handleOnSelect } key={ idx } selected={ isSelected } item={ project }/>
                })
            }
            </GridContainer>
        </div>
    );
};

export default ProjectList;

