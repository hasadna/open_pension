import React from "react"
import "./navigtation.scss"

const menuItems = [
  {path: '#tools', label: 'בלוגים אחרונים'},
  {path: '#articles', label: 'כתבו עלינו בעיתון'},
  {path: '#about-us', label: 'מי אנחנו'},
  {path: '#contact-us', label: 'צור קשר'},
]

const RenderMenu = () => {
  return <ul>
    {menuItems.map((menuItem, key) => {
      return <li key={key}>
        <a href={menuItem.path}>{menuItem.label}</a>
      </li>
    })}
  </ul>
}

export const Navigation = ({mobileOpen}) => <nav>
  <div className="wrapper desktop">
    <ul>
      <RenderMenu />
    </ul>
  </div>

  <div className="wrapper mobile">
    {mobileOpen && <RenderMenu />}
  </div>
</nav>
