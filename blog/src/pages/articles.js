import React from "react"
import { graphql } from "gatsby"
import "./pages.scss"

import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import {ArticleGrid} from "../components/Sections/Articles/Articles";

const ArticlesComponent = ({data}) => <Wrapper>

  <div className="inner-page">

    <Breadcrumbs path="homepage.articles" />

    <div className="content">
      <ArticleGrid data={data}/>
    </div>
  </div>

</Wrapper>

export const query = graphql`{
  drupal {
    nodeQuery(
      filter: {conditions: {field: "type", value: "article"}
    }) {
      entities {
        ... on drupal_NodeArticle {
          title
          fieldImage {
            url
            alt
          }
          fieldLink {
            uri
          }
          fieldPublishingDate {
            value
          }
          queryFieldAuthors {
            entities {
              entityId
              entityLabel
            }
          }
        }
      }
    }
  }
}
`;

export default ArticlesComponent
