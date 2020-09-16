import portfolio from "@constants/portfolio-namespace";

import getSimpleLiteral from "./getField/getSimpleLiteral";
import getLocaleLiteral from "./getField/getLocaleLiteral";
import getProjectField from "./getField/getProjectField";
import getStringList from "./getField/getStringList";
import getScreenshotField from "./getField/getScreenshotField";

const getTypeData = {
    [portfolio.types.string]: getLocaleLiteral,
    [portfolio.types.text]: getLocaleLiteral,
    [portfolio.types.dateTime]: getSimpleLiteral,
    [portfolio.classes.Project]: getProjectField,
    [portfolio.types.role]:  getStringList,
    [portfolio.types.responsibility]:  getStringList,
    [portfolio.classes.DatePeriod]:  getStringList,
    [portfolio.types.tool]:  getStringList,
    [portfolio.types.technology]:  getStringList,
    [portfolio.classes.Agency]:  getSimpleLiteral,
    [portfolio.classes.Screenshot]:  getScreenshotField
};

export default getTypeData;
