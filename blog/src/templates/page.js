import React from "react";
import {graphql} from "gatsby";
import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import "./blog-post.scss"

export default ({ data }) => {
  const page = data.drupal.nodeById;

  return (
    <Wrapper>
      <div className="inner-page blog">
        <Breadcrumbs path="homepage.<entityLabel>" entityLabel={page.title} />

        <h1>{page.title}</h1>
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: page.body.value }}/>
      </div>
    </Wrapper>
  );
};

export const query = graphql`
query($PageId: String!) {
  drupal {
    nodeById(id: $PageId) {
      ... on drupal_NodePage {
        title
        body {
          value
        }
      }
    }
  }
}
`;
