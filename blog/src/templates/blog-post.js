import React from "react";
import {graphql} from "gatsby";

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <h1>asdasd</h1>
    </div>
  )
}

export const query = graphql`
  query($nid: String!) {
    drupal {
      nodeById(id: "$nid") {
        title
      }
    }
  }
`

// export const query = graphql`query($nid: String!) {
//   drupal {
//     nodeById(id: "$nid") {
//       ... on drupal_NodeBlog {
//         title
//         body {
//           value
//         }
//         created
//       }
//     }
//   }
// }
// `
