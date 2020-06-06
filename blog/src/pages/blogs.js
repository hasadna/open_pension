import React from "react"
import { graphql } from "gatsby"
import "./pages.scss"

import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import {BlogsGrid} from "../components/Sections/Blogs/Blogs";

const ComponentName = ({ data }) => { return <Wrapper>

  <div className="inner-page">

    <Breadcrumbs path="homepage.blogs" />

    <div className="content">
      <BlogsGrid data={data} />
    </div>

  </div>

</Wrapper> }

export const query = graphql`
{
  drupal {
    nodeQuery(filter: {conditions: {field: "type", value: "blog"}}) {
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
            url
            alt
          }
        }
      }
    }
  }
}
`

export default ComponentName
