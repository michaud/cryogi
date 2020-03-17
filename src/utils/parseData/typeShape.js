import portfolio from "@constants/portfolio-namespace";

import portfolioShape from '@contexts/shapes/portfolio-shape.json';

const typeShape = {
    [portfolio.classes.Portfolio]: portfolioShape
}

export default typeShape;
