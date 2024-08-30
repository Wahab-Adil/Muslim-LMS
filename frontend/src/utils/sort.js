import * as _ from "lodash";

export default function sortData(data, options) {
  // Default options
  const defaultOptions = {
    sortBy: "date",
    sortOrder: "desc",
  };

  // Merge default options with user provided options
  const mergedOptions = _.merge({}, defaultOptions, options);

  // Sorting logic based on options
  const sortedArticles = _.orderBy(
    data,
    mergedOptions.sortBy,
    mergedOptions.sortOrder
  );

  return sortedArticles;
}
