import _ from 'lodash';

const findDifferences = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortKeys = [...keys].sort();

  return sortKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!_.has(obj1, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (!_.has(obj2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, type: 'nested', children: findDifferences(value1, value2) };
    }
    if (value1 !== value2) {
      return {
        key,
        value1,
        value2,
        type: 'changed',
      };
    }
    return { key, value: value1, type: 'unchanged' };
  });
};

export default findDifferences;
