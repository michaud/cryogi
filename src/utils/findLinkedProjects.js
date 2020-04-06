const findLinkedProjects = (projects, portfolio) => portfolio ?
    portfolio.projects.value ?
        portfolio.projects.value
            .map(project => projects
                .find(projectObj => projectObj.iri === project).iri) : [] : [];

export default findLinkedProjects;
