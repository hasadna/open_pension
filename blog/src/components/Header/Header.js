import React from "react"
import logo from "./logo.png"
import "./header.scss"

export const Header = ({frontPage, mobileMenuHandler}) => <header>
  <div className="wrapper">
    <a href="/"><img src={logo} alt="לוגו של פנסיה פתוחה"/></a>
    <span className="site-tittle"><a href="/">פנסיה פתוחה</a></span>

    {frontPage && <a onClick={mobileMenuHandler}><i className="mobile menu fas fa-bars"></i></a>  }
  </div>
</header>
