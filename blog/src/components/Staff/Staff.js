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
      sort: {field: "weight"}
    ) {
      entities {
        ... on drupal_TaxonomyTermStaff {
          entityLabel
          fieldPosition
          fieldProfilePicture {
            url
          }
        }
      }
    }
  }
}
`;

const Personal = ({personal}) => <div className="person">
  <img src={personal.fieldProfilePicture.url} alt={`תמונה של ${personal.entityLabel}`}/>
     <div className="info">
         <span className="name">{personal.entityLabel}</span>
         <span className="position">{personal.fieldPosition}</span>
     </div>
  </div>

export default () => <StaticQuery
  query={query}
  render={data =>
    <div className="staff">
      {data.drupal.taxonomyTermQuery.entities.map((personal, key) => <Personal key={key} personal={personal} />)}
    </div>
  }
/>
