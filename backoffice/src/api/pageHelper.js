import {sendQuery} from "./core";

export async function getPageHelpers({itemsPerPage = 5, page = 0, queryParams = {}}) {
  const {description, pageID} = queryParams;
  let pageHelperArgs = `pagination: {itemsNumber: ${itemsPerPage}, page: ${page}}`;

  if (description || pageID) {
    let filter = [];

    if (description) {
      filter.push(`{key: "description", value: "${description}", operation: CONTAINS}`)
    }

    if (pageID) {
      filter.push(`{key: "page", value: "${pageID}"`)
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
