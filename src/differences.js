import _ from 'lodash';

const findDifferences = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const differences = [];

  keys.sort().forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      differences.push(`+ ${key}: ${value2}`);
    } else if (!_.has(obj2, key)) {
      differences.push(`- ${key}: ${value1}`);
    } else if (!_.isEqual(value1, value2)) {
      differences.push(`- ${key}: ${value1}`);
      differences.push(`+ ${key}: ${value2}`);
    } else {
      differences.push(`  ${key}: ${value1}`);
    }
  });

  return `{
${differences.join('\n')}
}`;
};

export default findDifferences;
