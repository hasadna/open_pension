import React from "react"
import { graphql, StaticQuery } from "gatsby"
import "./style.scss";

const query = graphql`{
  drupal {
    nodeQuery(limit: 3, filter: {conditions: {field: "type", value: "blog"}}) {
      entities {
        ... on drupal_NodeBlog {
          title
          body {
            value
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
`;

const blogs = (data) => <section className="tools">
  <a id="tools"></a>

  <div className="text">
    <p className="medium">הכלים שלנו</p>

    <h2>מודיעין פיננסי בקוד פתוח</h2>

    <p className="big">
      מסד נתונים בלעדי ופתוח לציבור ומרכז את כל נתוני שוק הפנסיה
    </p>

    <div className="grid-display">
      {data.drupal.nodeQuery.entities.map((item) => blog(item))}
    </div>
  </div>
</section>

const blog = (data) => {
  const regex = /(<([^>]+)>)/ig;
  const result = data.body?.value.replace(regex, '');

  return <div>
    <h3 className="title"><a>{data.title}</a></h3>
    {result.substr(0, 350)}
  </div>
}

export const SecondStrip = () => <StaticQuery query={query} render={data => {return blogs(data)}}></StaticQuery>

