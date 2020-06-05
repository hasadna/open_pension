const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    {
    drupal {
      nodeQuery(filter: {conditions: {field: "type", value: "blog"}}) {
        entities {
          ... on drupal_NodeBlog {
            nid
            uuid
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
    actions.createPage({
      path: entity.path.alias,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        nid: entity.nid,
      },
    })
  })
}
