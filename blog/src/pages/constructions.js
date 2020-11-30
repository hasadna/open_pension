import React from "react";
import {Wrapper} from "../components/Page";
import {Helmet} from "react-helmet";
import "./constructions.scss";
import {graphql} from "gatsby"

export const query = graphql`{
drupal {
  nodeQuery(
    filter: {
    conditions: [
        {field: "type", value: "page_element"}, 
        {field: "field_page", value: "under-constructions"}, 
        {field: "field_section", value: "body"}
    ]
  }) {
    entities {
      ... on drupal_NodePageElement {
        body {
          value
        }
      }
    }
  }
}
}`
export default ({data}) => <Wrapper>
    <Helmet>
        <meta charSet="utf-8"/>
        <title>פנסיה פתוחה | עובדים על זה</title>
    </Helmet>

    <div className="constructions">
        <article className="text" dangerouslySetInnerHTML={{__html: data.drupal.nodeQuery.entities[0].body.value}}>
        </article>
    </div>
</Wrapper>
