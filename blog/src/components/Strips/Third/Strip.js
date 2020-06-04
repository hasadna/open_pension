import React from "react"
import "./style.scss";
import {graphql, StaticQuery} from "gatsby";

const query = graphql`{
    drupal {
      nodeQuery(filter: {conditions: {field: "type", value: "article"}}) {
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

const article = (data) => {
  return <div>
    <h3 className="title"><a href="saads" target="_blank">{data.title}</a></h3>
    <p className="sub-title">asasd, asasd</p>

    <img src="{{$article_image.Permalink}}" alt="דוח ראשון" className="bordered"/>
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

export const ThirdStrip = () => <StaticQuery query={query} render={data => {return articles(data)}}></StaticQuery>
