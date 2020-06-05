import React from "react"
import {graphql, StaticQuery} from "gatsby";
import "./navigtation.scss"

const query = graphql` {
  drupal {
    menuByName(name: "gatsby-upper-menu") {
      links {
        label
        url {
          path
        }
      }
    }
  }
}
`;

export const Navigation = () =>
  <StaticQuery query={query} render={data =>
    <nav>
      <div className="wrapper">
        <ul>
          {data.drupal.menuByName.links.map(menuItem => {
            return <li><a href={menuItem.url.path}>{menuItem.label}</a></li>
          })}
        </ul>
      </div>
    </nav>
  }>
  </StaticQuery>



