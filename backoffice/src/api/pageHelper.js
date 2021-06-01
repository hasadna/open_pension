import {sendQuery} from "./core";

export async function getPageHelpers() {
  const results = await sendQuery(`
    query  {
      pageHelpers {
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
