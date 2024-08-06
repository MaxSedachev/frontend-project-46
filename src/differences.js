import _ from "lodash";

const findDifferences = (obj1, obj2) => {
    const keys = _.union(_.keys(obj1), _.keys(obj2));
    const sortKeys = _.sortBy(keys);

    const differences = sortKeys.map((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];
        if (_.isEqual(value1, value2)) {
            return `  ${key}: ${value1}`;
        }
        if (!_.has(obj1, key) && _.has(obj2, key)) {
            return `+ ${key}: ${value2}`;
        }
        if (_.has(obj1, key) && !_.has(obj2, key)) {
            return `- ${key}: ${value1}`;
        }
        if (_.isObject(value1) && _.isObject(value2)) {
            const nestedDifferences = findDifferences(value1, value2);
            return `  ${key}: {\n${nestedDifferences}\n}`;
        }
        return `- ${key}: ${value1}\n+ ${key}: ${value2}`;
        });

    return `{
${differences.join('\n')}
}`;
};

export { findDifferences };