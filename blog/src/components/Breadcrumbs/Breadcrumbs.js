import React from "react";
import "./style.scss"
import { Link } from "gatsby"

const paths = {
  homepage: {
    title: 'עמוד ראשי',
    path: '/'
  },
  blogs: {
    title: 'בלוגים',
    path: 'blogs'
  }
}
export const Breadcrumbs = ({path, entityLabel}) => {
  const crumbs = path.split('.');

  return <ul className="breadcrumb">
    {crumbs.map((item, index) => {
      if (index + 1 === crumbs.length) {
        if (item === '<entityLabel>') {
          return entityLabel;
        }

        return <li key={index} className="crumb">{paths[item].title}</li>
      }

      return <li key={index} className="crumb">
        <Link
          to={paths[item].path}
          state={{fromFeed: true}}
          className="simple-link">
          {paths[item].title}
        </Link> >>
      </li>
    })}
  </ul>
}


