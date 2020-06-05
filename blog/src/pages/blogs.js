import React from "react"
import { graphql } from "gatsby"

import {Wrapper} from "../components/Page";

const ComponentName = ({ data }) => <Wrapper>

  <div className="inner-content">Inner body</div>

</Wrapper>

export const query = graphql`
  {
    drupal {
      nodeQuery(filter: {conditions: {field: "type", value: "blog"}}) {
        entities {
          ... on drupal_NodeBlog {
            nid
            uuid
            title
            body {
              value
            }
          }
        }
      }
    }
  }
`

export default ComponentName
