import React from "react"
import {Helmet} from "react-helmet"
import './index.scss'

import {Header} from "../components/Header/Header";
import {Money} from "../components/Sections/Money/Money";
import {Articles} from "../components/Sections/Articles/Articles";
import {Blogs} from "../components/Sections/Blogs/Blogs";
import {WhoWeAre} from "../components/Sections/WhoWeAre/WhoWeAre";
import {Wrapper} from "../components/Page";

export default function Home() {
    return <Wrapper front={true}>
        <Helmet>
            <meta charSet="utf-8"/>
            <title>פנסיה פתוחה</title>
            <link rel="canonical" href="https://www.openpension.org.il"/>
        </Helmet>

        <section className="header-money">
            <Header front={true}/>
            <Money/>
        </section>

        <Articles/>
        <Blogs/>
        <WhoWeAre/>
    </Wrapper>

}
