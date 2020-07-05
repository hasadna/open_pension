import React from "react"
import "./navigtation.scss"

const menuItems = [
  {path: '#tools', label: 'בלוגים אחרונים'},
  {path: '#articles', label: 'כתבו עלינו בעיתון'},
  {path: '#about-us', label: 'מי אנחנו'},
  {path: '#contact-us', label: 'צור קשר'},
]

export const Navigation = () => <nav>
  <div className="wrapper">
    <ul>
      {menuItems.map((menuItem, key) => {
        return <li key={key}><a href={menuItem.path}>{menuItem.label}</a></li>
      })}
    </ul>
  </div>
</nav>
