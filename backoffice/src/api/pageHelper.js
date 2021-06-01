import {sendQuery} from "./core";

export async function getPageHelpers({itemsPerPage = 5, page = 0, queryParams = {}}) {
  const {filterByPage, filterByDescription} = queryParams;
  let pageHelperArgs = `pagination: {itemsNumber: ${itemsPerPage}, page: ${page}}`;

  if (filterByPage || filterByDescription) {
    let filter = [];

    if (filterByDescription) {
      filter.push(`{key: "description", value: "${filterByDescription}", operation: CONTAINS}`)
    }

    if (filterByPage) {
      filter.push(`{key: "page", value: "${filterByPage}"}`)
    }

    pageHelperArgs = `${pageHelperArgs}, filter:[${filter.join(", ")}]`
  }

  const results = await sendQuery(`
    query  {
      pageHelpers(${pageHelperArgs}) {
        pageHelpers {
          id,
          description,
          elementID,
          page {
            id,
            label
          }
        },
        totalCount
      }
    }
  `);
  const {data: {pageHelpers: data}, error} = results;
  return {data, error}
}
