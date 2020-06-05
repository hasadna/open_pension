const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode }) => {
  if (node.internal.owner === 'gatsby-source-graphql') {
    console.log(node);

    createFilePath({ node, getNode, basePath: `blogs` })
  }
}
