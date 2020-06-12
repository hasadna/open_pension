import React from "react"
import { Helmet } from "react-helmet"
import './index.scss'

import {Money} from "../components/Sections/Money/Money";
import {Blogs} from "../components/Sections/Blogs/Blogs";
import {Articles} from "../components/Sections/Articles/Articles";
import {WhoWeAre} from "../components/Sections/WhoWeAre/WhoWeAre";

import {Wrapper} from "../components/Page";

export default function Home() {
  return <Wrapper front={true}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>פנסיה פתוחה</title>
      <link rel="canonical" href="https://www.openpension.org.il" />
    </Helmet>
    <Money/>
    <Blogs/>
    <Articles/>
    <WhoWeAre/>
  </Wrapper>
}
