const namespace = 'https://michaud.inrupt.net/public/ont/portfolio/';

const portfolio = {
    root: `${ namespace }`,
    classes: {
        Portfolio: `${ namespace }Portfolio`,
        Project: `${ namespace }Project`,
        Agency: `${ namespace }Agency`,
        DatePeriod: `${ namespace }DatePeriod`,
        Screenshot: `${ namespace }Screenshot`
    },
    properties: {
        name: `${ namespace }name`,
        owner: `${ namespace }owner`,
        projects: `${ namespace }projects`,
        shortScreenshotDescription: `${ namespace }shortScreenshotDescription`,
        screenshotDescription: `${ namespace }screenshotDescription`,
        screenshotUrl: `${ namespace }screenshotUrl`,
        projectName: `${ namespace }projectName`,
        portfolioName: `${ namespace }portfolioName`,
        gameCourse: `${ namespace }gameCourse`,
        periods:  `${ namespace }periods`,
        startDate:  `${ namespace }startDate`,
        endDate: `${ namespace }endDate`,
        clientName: `${ namespace }clientName`,
        description:  `${ namespace }description`,
        tools: `${ namespace }tools`,
        technologies: `${ namespace }technologies`,
        courseName: `${ namespace }courseName`,
        mission: `${ namespace }mission`,
        result: `${ namespace }result`,
        agency: `${ namespace }agency`,
        roles: `${ namespace }roles`,
        responsibilities: `${ namespace }responsibilities`,
        screenshots: `${ namespace }screenshots`,
        industry: `${ namespace }industry`,

    },
    types: {
        string: 'http://www.w3.org/2001/XMLSchema#string',
        text: 'https://schema.org/Text',
        integer: 'http://www.w3.org/2001/XMLSchema#integer',
        dateTime: 'http://www.w3.org/2001/XMLSchema#DateTime',
        double: 'http://www.w3.org/2001/XMLSchema#double',
        technology: `${ namespace }technology`,
        role: `${ namespace }role`,
        responsibility:  `${ namespace }responsibility`,
        tool: `${ namespace }tool`,
        undefined: `${ namespace }undefined`
    }
};

export default portfolio;
