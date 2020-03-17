import portfolio from "@constants/portfolio-namespace";

import getSimpleLiteral from "./getField/getSimpleLiteral";
import getProjectField from "./getField/getProjectField";

const getTypeData = {
    [portfolio.types.string]: getSimpleLiteral,
    [portfolio.types.text]: getSimpleLiteral,
    [portfolio.types.dateTime]: getSimpleLiteral,
    [portfolio.classes.Project]: getProjectField
};

export default getTypeData;
