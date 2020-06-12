import React from "react";
import {graphql} from "gatsby";
import {Wrapper} from "../components/Page";
import {Breadcrumbs} from "../components/Breadcrumbs/Breadcrumbs";
import "./blog-post.scss"
import dateformat from "dateformat"
import {Helmet} from "react-helmet";

export default ({ data }) => {
  const blog = data.drupal.nodeById;

  return (
    <Wrapper>

      <Helmet>
        <meta charSet="utf-8" />
        <title>פנסיה פתוחה | בלוג | {blog.title}</title>
        <link rel="canonical" href={`https://www.openpension.org.il${blog.path.alias}`} />
      </Helmet>

      <div className="inner-page blog">
        <Breadcrumbs path="homepage.blogs.<entityLabel>" entityLabel={blog.title} />

        <h1>{blog.title}</h1>
        <span className="created">נוצר בתאריך <b>{dateformat(blog.created * 1000, "dd/mm/yyyy")}</b> על ידי <b>{blog.entityOwner.name}</b></span>

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
        path {
          alias 
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
