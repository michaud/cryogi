import portfolio from "@constants/portfolio-namespace";

const deleteProjectFromPortfolios = async (project, portfolios, callback) => {

    for(const portf of portfolios) {

        const portRef = portf.doc.findSubject(portfolio.classes.portfolio);
        portRef.removeRef(portfolio.properties.projects, project);
  
        await portf.doc.save();

        callback();
    }
};

export default deleteProjectFromPortfolios;
