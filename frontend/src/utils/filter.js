import * as _ from "lodash";

export default function filterCourses(data, options) {
  return _.filter(data, (item) => {
    // Check if all provided options match the data properties
    return _.every(options, (value, key) => {
      if (value === null) {
        return data;
      }
      if (Array.isArray(value)) {
        // If the value is an array, check if the data property exists in that array
        return _.includes(value, item[key]);
      } else {
        // Otherwise, simply check if the data property matches the value
        return item[key] === value;
      }
    });
  });
}
