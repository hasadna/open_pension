import React from "react"
import logo from "./logo.png"

export const Header = () => <header>
  <div className="wrapper">
    <a href="/"><img src={logo} alt="לוגו של פנסיה פתוחה"/></a>

    <span className="site-tittle"><a href="/">פנסיה פתוחה</a></span>
  </div>
</header>

