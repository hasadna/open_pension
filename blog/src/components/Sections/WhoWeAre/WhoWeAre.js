import React from "react";
import "./style.scss";
import {graphql, StaticQuery} from "gatsby";

const query = graphql` {
  drupal {
    nodeQuery(filter: {
      conditions: [
        {field: "type", value: "page_element"}, 
        {field: "field_page", value: "front"}, 
        {field: "field_section", value: "above-footer"}
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
}
`;

const aboutUs = (data) => <section className="about-us" id="about-us">
  <div className="text" dangerouslySetInnerHTML={{__html: data.drupal.nodeQuery.entities[0].body.value}}>
  </div>

  <div className="contact-us" id="contact-us">
    <button>
      <a href="mailto:openpension@googlegroups.com?subject=פידבק על פנסיה פתוחה">צור קשר</a>
    </button>
  </div>
</section>

export const WhoWeAre = () => <StaticQuery query={query} render={data => aboutUs(data)}>
</StaticQuery>
