import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from "./logo.png"
import "./header.scss"

export const Header = ({frontPage, mobileMenuHandler}) => <header>
  <div className="wrapper">
    <a href="/"><img src={logo} alt="לוגו של פנסיה פתוחה"/></a>
    <span className="site-tittle"><a href="/">פנסיה פתוחה</a></span>

    {frontPage && <a onClick={mobileMenuHandler}><FontAwesomeIcon className={"mobile menu"} icon={faBars} /></a>  }
  </div>
</header>
