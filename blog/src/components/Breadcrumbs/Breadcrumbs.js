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
export const Breadcrumbs = (data) => <ul className="breadcrumb">
  {data.path.split('.').map((item, index) => {

    const arrows = index + 1 === Object.keys(paths).length ? null : '>>';

    if (index + 1 === Object.keys(paths).length) {
      return <li key={index} className="crumb">{paths[item].title}</li>
    }

    return <li key={index} className="crumb">
      <Link
        to={paths[item].path}
        state={{ fromFeed: true }}
        className="simple-link">
          {paths[item].title}
      </Link> {arrows}
    </li>
  })}
</ul>


