import React from "react"
import "./navigtation.scss"

const menuItems = [
  {path: '#articles', label: 'הופעות אחרונות בתקשורות'},
  {path: '#blogs', label: 'אנליות אחרונות'},
  {path: '#who-we-are', label: 'מי אנחנו'},
]

export const Navigation = ({mobileOpen}) => <nav>
  {menuItems.map((menuItem, key) => <>
    <a key={key} href={menuItem.path}>{menuItem.label}</a>
    {key !== (menuItems.length - 1) && <> | </> }
  </> )}
</nav>
