import React from "react"
import "./Staff.scss"
import {StaticQuery, graphql} from "gatsby"

const query = graphql`{
  drupal {
    taxonomyTermQuery(
      filter: {conditions: [
        {field: "vid", value: ["staff"]}, 
        {field: "status", value: "1"}
      ]}, 
      sort: {field: "weight", direction: ASC}
    ) {
      entities {
        ... on drupal_TaxonomyTermStaff {
          entityLabel
          fieldPosition
          fieldProfilePicture {
            url
            alt
            gatsbyImageFile {
              childImageSharp {
                fluid(maxHeight: 150)  {
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

const Personal = ({personal}) => {
  const { fieldProfilePicture, entityLabel, fieldPosition } = personal;

  return <div className="person">
    {fieldProfilePicture &&
    <img src={fieldProfilePicture.gatsbyImageFile.childImageSharp.fluid.src}
         alt={`תמונה של ${personal.entityLabel}`}/>}
    <div className="info">
      <span className="name">{entityLabel}</span>
      <span className="position">{fieldPosition}</span>
    </div>
  </div>
}

export default () => <StaticQuery
  query={query}
  render={data =>
    <div className="staff">
      {data.drupal.taxonomyTermQuery.entities.map((personal, key) => <Personal key={key} personal={personal} />)}
    </div>
  }
/>
