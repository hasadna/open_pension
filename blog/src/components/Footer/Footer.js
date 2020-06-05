import React from "react"
import "./style.scss";
import {graphql, StaticQuery} from "gatsby";

const query = graphql` {
  drupal {
    menuByName(name: "gatsby-footer-menu") {
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

export const Footer = ({appendToBottom}) =>
  <StaticQuery query={query} render={data =>

    <footer className={`footer${appendToBottom ? ' append-to-bottom' : ''}`}>
      <ul>
        {data.drupal.menuByName.links.map(menuItem => {
          return <li><a href={menuItem.url.path}>{menuItem.label}</a></li>
        })}
      </ul>
    </footer>
  }>
  </StaticQuery>



