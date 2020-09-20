import React from "react"
import "./articles.scss";
import {graphql, StaticQuery} from "gatsby";

const query = graphql`{
  drupal {
    nodeQuery(
      filter: {conditions: {field: "type", value: "article"}},
      limit: 3,
      sort: {field: "created", direction: DESC}
    ) {
      entities {
        ... on drupal_NodeArticle {
          title
          fieldImage {
            alt
            url
            gatsbyImageFile {
              childImageSharp {
                fluid(maxHeight: 300)  {
                  src
                }
              }
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

const tags = (tags) => tags.map((tag, key) => <a key={key}>{tag.entityLabel}</a>)

const article = (data) => {
    return <div className="article">
        <h3 className="title"><a href={data.fieldLink.uri} target="_blank" rel="noreferrer">{data.title}</a></h3>

        <div className="meta">
            <div className="by">
                <span>פורסם על ידי:</span><p className="tags">{tags(data.queryFieldAuthors.entities)},
                בתאריך: {data.fieldPublishingDate.value}</p>
            </div>
        </div>

        <a href={data.fieldLink.uri} className="link-article">
            <img src={data.fieldImage.gatsbyImageFile.childImageSharp.fluid.src}
                 alt={data.fieldImage.alt}
                 className="bordered"/>
        </a>
    </div>
}

export const ArticleGrid = ({data}) => <div className="grid-display">
    {data.drupal.nodeQuery.entities.map(item => article(item))}
</div>

export const articles = (data) => <section className="articles" id="articles">
    <h2>הופעות אחרונות בתקשורת</h2>

    <ArticleGrid data={data}/>

</section>

export const Articles = () => <StaticQuery query={query} render={data => {
    return articles(data)
}}>

</StaticQuery>
