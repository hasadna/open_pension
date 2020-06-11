const path = require(`path`)

const createBlogs = async (graphql, createPage) => {
  const { data } = await graphql(`
    {
    drupal {
      nodeQuery(filter: {conditions: {field: "type", value: "blog"}}) {
        entities {
          ... on drupal_NodeBlog {
            nid
            path {
              alias
            }
          }
        }
      }
    }
  }
  `)

  data.drupal.nodeQuery.entities.forEach((entity) => {
    createPage({
      path: entity.path.alias,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        BlogID: entity.nid.toString(),
      },
    })
  })
};

const createDrupalPages = async (graphql, createPage) => {
  const { data } = await graphql(`
    {
    drupal {
      nodeQuery(filter: {conditions: {field: "type", value: "page"}}) {
        entities {
          ... on drupal_NodePage {
            nid
            path {
              alias
            }
          }
        }
      }
    }
  }
  `)

  data.drupal.nodeQuery.entities.forEach((entity) => {
    createPage({
      path: entity.path.alias,
      component: path.resolve(`./src/templates/page.js`),
      context: {
        PageId: entity.nid.toString(),
      },
    })
  })
};


exports.createPages = async ({ actions, graphql }) => {
  await createBlogs(graphql, actions.createPage)
  await createDrupalPages(graphql, actions.createPage)
}
