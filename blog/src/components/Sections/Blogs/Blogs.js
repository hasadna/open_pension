import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import "./style.scss";

const query = graphql`{
  drupal {
    nodeQuery(
      limit: 3, 
      filter: {conditions: {field: "type", value: "blog"}},
      sort: {field: "created", direction: DESC}
    ) {
      entities {
        ... on drupal_NodeBlog {
          title
          body {
            value
          }
          path {
            alias
          }
          fieldImage {
            alt
            url
            gatsbyImageFile {
              childImageSharp {
                fluid(maxWidth: 450)  {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const blog = (data) => {
  const regex = /(<([^>]+)>)/ig;
  const result = data.body?.value.replace(regex, '');

  return <div className="blog">
    <h3 className="title"><a href={data.path.alias}>{data.title}</a></h3>

    <p className="intro">{result.substr(0, 350)}</p>

    <img src={data.fieldImage.gatsbyImageFile.childImageSharp.fluid.src} alt={data.fieldImage.alt} />
  </div>
}

export const BlogsGrid = (props) =>
  <div className="grid-display">
    {props.data.drupal.nodeQuery.entities.map((item) => blog(item))}
  </div>

const blogs = (data) => <section className="blogs" id="blogs">
    <h2>בלוגים אחרונים</h2>
    <BlogsGrid data={data} />
</section>

export const Blogs = () => <StaticQuery query={query} render={data => {return blogs(data)}}></StaticQuery>

