/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  /* Your site config here */
  plugins: [
    // `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-revisions`,
      options: {
        eventsAddressBroadcast: process.env.DRUPAL_BACKEND,
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-151385393-1",
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "drupal",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "drupal",
        // Url to query from
        url: `${process.env.DRUPAL_BACKEND}/graphql`,
      },
    },
  ],
}
