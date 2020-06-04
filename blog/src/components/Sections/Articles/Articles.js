import React from "react"
import "./style.scss";
import {graphql, StaticQuery} from "gatsby";

const query = graphql`{
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

const tags = (tags) => <ul>{tags.map(tag => <li>{tag.entityLabel}</li>)}</ul>

const article = (data) => {
  return <div>
    <h3 className="title"><a href={data.fieldLink.uri} target="_blank">{data.title}</a></h3>
    <p className="sub-title">{tags(data.queryFieldAuthors.entities)}, {data.fieldPublishingDate.value}</p>
    <a href={data.fieldLink.uri}><img src={data.fieldImage.url} title={data.fieldImage.alt} className="bordered"/></a>
  </div>
}

export const articles = (data) => <section className="articles">
  <a id="articles"></a>

  <div className="text">
    <p className="medium">כתבות</p>

    <h2>הדוחות המעמיקים בתחום</h2>

    <p className="big">
      מידע שמאפשר לעיתונאים ואקטיביסטים לספר את הסיפור המלא
    </p>

    <div className="grid-display">
      {data.drupal.nodeQuery.entities.map(item => article(item))}
    </div>
  </div>

</section>

export const Articles = () => <StaticQuery query={query} render={data => {return articles(data)}}>

</StaticQuery>
