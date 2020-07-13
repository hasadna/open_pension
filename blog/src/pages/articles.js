import React from "react"
import { graphql } from "gatsby"
import {Helmet} from "react-helmet";

import "./pages.scss"

import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import {ArticleGrid} from "../components/Sections/Articles/Articles";

const ArticlesComponent = ({data}) => <Wrapper>

  <div className="inner-page">

    <Helmet>
      <meta charSet="utf-8" />
      <title>פנסיה פתוחה | כתבו עלינו בעיתון</title>
      <link rel="canonical" href="https://www.openpension.org.il/articles" />
    </Helmet>

    <Breadcrumbs path="homepage.articles" />

    <div className="content">
      <ArticleGrid data={data}/>
    </div>
  </div>

</Wrapper>

export const query = graphql`{
  drupal {
    nodeQuery(
      filter: {conditions: {field: "type", value: "article"}} 
      sort: {field: "created", direction: DESC}
    ) {
      entities {
        ... on drupal_NodeArticle {
          title
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
