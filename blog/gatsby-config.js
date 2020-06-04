/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    // {
    //   resolve: `gatsby-source-drupal`,
    //   options: {
    //     baseUrl: `http://localhost/open_pension/cms/src/web/`,
    //     apiBase: `jsonapi`, // optional, defaults to `jsonapi`
    //   },
    // },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "drupal",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "drupal",
        // Url to query from
        url: "http://localhost/open_pension/cms/src/web/graphql",
      },
    },
  ],
}
