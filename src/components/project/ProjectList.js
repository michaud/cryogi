import { GridContainer } from '@styled/layout.style';

import ProjectSummary from '@components/project/ProjectSummary';

const gridMediaLayout = [
    ['600px','1fr'],
    ['900px','repeat(2, 1fr)'],
    ['1600px','repeat(3, 1fr)'],
    ['2000px','repeat(4, 1fr)']
];

const ProjectList = ({ items, label, linked, selected, onLink, onSelect }) => {

    const handleOnLink = iri => onLink(iri);
    const handleOnSelect = iri => onSelect(iri);

    const hasProjects = items.length > 0;

    return (
        <>
            { label && <h3>{ label }</h3> }
            { hasProjects ? <GridContainer media={ gridMediaLayout }>
                {
                    items.map((project, idx) => {

                        const isLinked = linked  === undefined
                            ? undefined
                            : linked.findIndex(link => link === project.iri) > -1;
                        const isSelected = selected === undefined
                            ? undefined
                            : selected === project.iri;
                        return <ProjectSummary key={ idx }
                            onLink={ handleOnLink }
                            onSelect={ handleOnSelect }
                            isSelected={ isSelected }
                            isLinked={ isLinked }
                            item={ project }/>
                    })
                }
                </GridContainer>
             : null }
        </>
    );
};

export default ProjectList;

