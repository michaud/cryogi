import portfolio from "@constants/portfolio-namespace";

import portfolioShape from '@contexts/shapes/portfolio-shape.json';
import projectShape from '@contexts/shapes/project-shape.json';
import screenshotShape from '@contexts/shapes/screenshot-shape.json';

const typeShape = {
    [portfolio.classes.Portfolio]: portfolioShape,
    [portfolio.classes.Project]: projectShape,
    [portfolio.classes.Screenshot]: screenshotShape
}

export default typeShape;
