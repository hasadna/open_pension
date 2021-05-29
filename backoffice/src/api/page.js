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

export async function getPage(id) {
  const results = await sendQuery(`
    query {
      page(id: "${id}") {
        id
        label
      }
    }
  `);
  const {data: {page: data}, error} = results;
  return {data, error}
}

export async function createPage({label}) {
  return await sendQuery(`
    mutation {
      pageCreate(label: "${label}") {
        id
        label
      }
    }
  `);
}

export async function updatePage({id, label}) {
  return await sendQuery(`
    mutation {
      pageUpdate(id: "${id}", label: "${label}") {
        id
        label
      }
    }
  `);
}

export async function deletePage({id}) {
  return await sendQuery(`
    mutation {
      pageDelete(id: "${id}")
    }
  `);
}
