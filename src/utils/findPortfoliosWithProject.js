const findPortfoliosWithProject = (project, portfolios) => portfolios.filter(portfolio => {

    const found = portfolio.projects.value.find(portfolioProject => project.iri === portfolioProject);

    if (found) return true;

    return false;
});

export default findPortfoliosWithProject;
