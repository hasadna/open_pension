import React from "react"
import "./style.scss";
import {graphql, Link, StaticQuery} from "gatsby";

const query = graphql`{
  drupal {
    nodeQuery(
      filter: {conditions: {field: "type", value: "article"}},
      limit: 3
    ) {
      entities {
        ... on drupal_NodeArticle {
          title
          fieldImage {
            derivative(style: LARGE) {
              url
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

const tags = (tags) => <ul>{tags.map(tag => <li>{tag.entityLabel}</li>)}</ul>

const getpath = (url) => {
  return url.split('/').splice(-1)[0];
}

const article = (data) => {
  return <div>
    <h3 className="title"><a href={data.fieldLink.uri} target="_blank" rel="noreferrer">{data.title}</a></h3>
    <p className="sub-title">{tags(data.queryFieldAuthors.entities)}, {data.fieldPublishingDate.value}</p>
    <a href={data.fieldLink.uri}><img src={`./assets/${getpath(data.fieldImage.derivative.url)}`} alt={data.fieldImage.alt} className="bordered"/></a>
  </div>
}

export const ArticleGrid = ({data}) => <div className="grid-display">
  {data.drupal.nodeQuery.entities.map(item => article(item))}
</div>

export const articles = (data) => <section className="articles" id="articles">
  <div className="text">
    <p className="medium">כתבו עלינו בעיתון</p>

    <h2>ובעוד כמה מקומות</h2>

    <p className="big">
      בואו תראו את כל המקומות שהוזכרנו או שתרמנו חלק משמעותי לתוכן.
    </p>

    <ArticleGrid data={data}/>

    <Link to="/articles" className="big simple-link">יש עוד כתבות חוץ מזה. תני מבט!</Link>
  </div>

</section>

export const Articles = () => <StaticQuery query={query} render={data => {return articles(data)}}>

</StaticQuery>
