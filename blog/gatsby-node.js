const path = require(`path`)
const http = require('http');
const fs = require('fs');

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
  await createBlogs(graphql, actions.createPage);
  await createDrupalPages(graphql, actions.createPage);
  await downloadMedia(graphql);
}

const downloadMedia = async (graphql) => {

  const { data } = await graphql(`
    query {
      drupal {
        nodeQuery(filter: {conditions: {field: "type", value: ["blog", "article"], operator: IN}}) {
          entities {
            ...on drupal_NodeArticle {
              fieldImage {
                url
              }
            },
            ...on drupal_NodeBlog {
              fieldImage {
                url
              }
            }
          }
        }
      }
    }
  `)

  data.drupal.nodeQuery.entities.map(async (entity) => downloadFile(entity));
}

const downloadFile = async(entity) => {
  const file = fs.createWriteStream(path.join(process.cwd(), "src", "assets", entity.fieldImage.url.split('/').splice(-1)[0]));
  const request = http.get(entity.fieldImage.url, function(response) {
    response.pipe(file);
  });
};
