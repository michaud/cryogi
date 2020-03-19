import parseFields from "@utils/parseData/parseFields";
import portfolio from "@constants/portfolio-namespace";
import typeShape from "@utils/parseData/typeShape";

const getScreenshotField = doc => (data, label) => {

    const shotIds = data.getAllRefs(portfolio.properties.screenshots);
    const shotRefs = shotIds.map(id => doc.getSubject(id));

    const screenshots = shotRefs.map(parseFields(typeShape[portfolio.classes.Screenshot], doc));

    return ({
        label,
        value: screenshots
    });
};

export default getScreenshotField;
