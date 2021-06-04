import {sendQuery} from "./core";

export async function getPageHelpers({itemsPerPage = 5, page = 0, queryParams = {}}) {
  const {filterByDescription} = queryParams;
  let pageHelperArgs = `pagination: {itemsNumber: ${itemsPerPage}, page: ${page}}`;

  if (filterByDescription) {
    let filter = [];

    if (filterByDescription) {
      filter.push(`{key: "description", value: "${filterByDescription}", operation: CONTAINS}`)
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

export const createPageHelper = async ({description, elementID, page}) => {
  return await sendQuery(`
    mutation {
      pageHelperCreate(page: "${page}", description: "${description}", elementID: "${elementID}") {
        id
        description
        elementID
      }
    }
  `);
};

export const getPageHelper = async (id) => {
  const results = await sendQuery(`
    query  {
      pageHelper(id: "${id}") {
        id,
        description,
        elementID,
        page {
          id,
          label
        }
      },
    }
  `);
  const {data: {pageHelper: data}, error} = results;
  return {data, error}
};

export const updatePageHelper = async({id, page, description, elementID}) => {
  return await sendQuery(`
    mutation {
      pageHelperUpdate(id: "${id}", page: "${page}", description: "${description}", elementID: "${elementID}") {
        id
      }
    }
  `);
};

export const deletePageHelper = async (id) => {
  return await sendQuery(`
    mutation {
      pageHelperDelete(id: "${id}")
    }
  `);
};
