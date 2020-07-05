import React from "react"
import { graphql, StaticQuery, Link } from "gatsby"
import "./style.scss";

const query = graphql`{
  drupal {
    nodeQuery(
      limit: 3, 
      filter: {conditions: {field: "type", value: "blog"}}
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
                fluid(maxHeight: 300)  {
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

  return <div>
    <h3 className="title"><a href={data.path.alias}>{data.title}</a></h3>

    <p className="intro">{result.substr(0, 350)}</p>

    <img src={data.fieldImage.gatsbyImageFile.childImageSharp.fluid.src} alt={data.fieldImage.alt} />
  </div>
}

export const BlogsGrid = (props) =>
  <div className="grid-display">
    {props.data.drupal.nodeQuery.entities.map((item) => blog(item))}
  </div>

const blogs = (data) => <section className="tools" id="tools">
  <div className="text">
    <p className="medium">מה יש לנו להגיד</p>

    <h2>בלוגים אחרונים</h2>

    <p className="big">
      הנה התובנות האחרנות שלנו בהתבסס על הנתונים שאספנו.
    </p>

    <BlogsGrid data={data} />

    <Link to="/blogs" className="big simple-link">יש עוד בלוגים... בוא תקרא</Link>
  </div>
</section>

export const Blogs = () => <StaticQuery query={query} render={data => {return blogs(data)}}></StaticQuery>

