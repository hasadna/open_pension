import React from "react"
import "./style.scss";

const menuItems = [
  {path: '/אודותינו', label: 'אודותינו'},
  {path: 'https://www.hasadna.org.il/', label: 'הסדנה לידע ציבורי'},
  {path: '/מדיניות-פרטיות', label: 'מדיניות פרטיות'},
]

export const Footer = ({appendToBottom}) => <footer className={`footer${appendToBottom ? ' append-to-bottom' : ''}`}>
  <ul>
    {menuItems.map((menuItem, key) => {
      return <li key={key}><a href={menuItem.path}>{menuItem.label}</a></li>
    })}
  </ul>
</footer>
