import React from "react";
import {graphql} from "gatsby";
import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import "./blog-post.scss"

export default ({ data }) => {
  const blog = data.drupal.nodeById;

  return (
    <Wrapper>
      <div className="inner-page blog">
        <Breadcrumbs path="homepage.blogs.<entityLabel>" entityLabel={blog.title} />

        <h1>{blog.title}</h1>
        <span className="created">נוצר בתאריך <b>sdasd</b> על ידי <b>asdsad</b></span>

        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.body.value }}/>
      </div>
    </Wrapper>
  );
};

export const query = graphql`
query($BlogID: String!) {
  drupal {
    nodeById(id: $BlogID) {
      ... on drupal_NodeBlog {
        title
        body {
          value
        }
        created
        entityOwner {
          ...on drupal_User {
            name
            userPicture {
              url
            }
          }
        }
      }
    }
  }
}
`;
