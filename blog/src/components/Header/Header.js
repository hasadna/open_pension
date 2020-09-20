import React from "react"
import {Link} from "gatsby"
import logo from "./logo.png"
import "./header.scss"
import {Navigation} from "../Navigation/Navigation";

export const Header = ({front}) => <header className={front ? 'front' : 'inner'}>
    <section className="logo">
        <Link to="/">
            <img src={logo} alt="פנסיה פתוחה לוגו" title="פנסיה פתוחה לוגו"/>
            <h1 className="text">פנסיה פתוחה</h1>
        </Link>
    </section>
    {front && <Navigation/>}
</header>
