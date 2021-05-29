import {sendQuery} from "./core";

export async function getPages() {
  const results = await sendQuery(`
    query {
      pages {
        id
        label
      }
    }
  `);
  const {data: {pages: data}, error} = results;
  return {data, error}
}
