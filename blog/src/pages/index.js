import React from "react"
import { Helmet } from "react-helmet"
import './index.scss'

import {Header} from "../components/Header/Header";
import {Money} from "../components/Sections/Money/Money";

export default function Home() {
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>פנסיה פתוחה</title>
      <link rel="canonical" href="https://www.openpension.org.il" />
    </Helmet>

    <section className="header-money">
      <Header />
      <Money />
    </section>
  </>

}
