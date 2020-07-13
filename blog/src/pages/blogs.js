import React from "react"
import { graphql } from "gatsby"
import "./pages.scss"

import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import {BlogsGrid} from "../components/Sections/Blogs/Blogs";
import {Helmet} from "react-helmet";

const BlogsPage = ({ data }) => <Wrapper>

  <div className="inner-page">
    <Helmet>
      <meta charSet="utf-8" />
      <title>פנסיה פתוחה | בלוגים</title>
      <link rel="canonical" href="https://www.openpension.org.il/blogs" />
    </Helmet>

    <Breadcrumbs path="homepage.blogs" />

    <div className="content">
      <BlogsGrid data={data} />
    </div>

  </div>

</Wrapper>

export const query = graphql`
{
  drupal {
    nodeQuery(
      filter: {conditions: {field: "type", value: "blog"}} 
      sort: {field: "created", direction: DESC}
    ) {
      entities {
        ... on drupal_NodeBlog {
          nid
          title
          body {
            value
          }
          path {
            alias
          }
          fieldImage {
            alt
            url
            gatsbyImageFile {
              childImageSharp {
                fluid(maxHeight: 300)  {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export default BlogsPage
