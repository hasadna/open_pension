import React from "react"
import logo from "./logo.png"
import "./header.scss"
import {Navigation} from "../Navigation/Navigation";

export const Header = () => <header>
  <section className="logo">
    <img src={logo} alt="פנסיה פתוחה לוגו" title="פנסיה פתוחה לוגו" />
    <h1 className="text">פנסיה פתוחה</h1>
  </section>
  <Navigation />
</header>
