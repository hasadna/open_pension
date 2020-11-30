import React from "react"
import "./money.scss";
import {graphql, Link, StaticQuery} from "gatsby";

const query = graphql` {
  drupal {
    nodeQuery(filter: {
      conditions: [
        {field: "type", value: "page_element"}, 
        {field: "field_page", value: "front"}, 
        {field: "field_section", value: "upper"}
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

export const Money = () => <StaticQuery query={query} render={data =>
    <section className="money">
        <div className="text" dangerouslySetInnerHTML={{__html: data.drupal.nodeQuery.entities[0].body.value}}>
        </div>
        <Link to="/constructions" className="personal-zone">בוא תראה איפה שלך מושקעים</Link>
    </section>
}>
</StaticQuery>
