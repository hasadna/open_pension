import React from "react"
import './index.scss'

import {Header} from "../components/Header/Header";
import {Navigation} from "../components/Navigation";

import {UpperStrip} from "../components/Sections/UpperStrip/UpperStrip";
import {Blogs} from "../components/Sections/Blogs/Blogs";
import {Articles} from "../components/Sections/Articles/Articles";
import {WhoWeAre} from "../components/Sections/WhoWeAre/WhoWeAre";

import {Footer} from "../components/Footer/Footer";

export default function Home() {
  return <main>

    <Header/>
    <Navigation/>

    <UpperStrip/>
    <Blogs/>
    <Articles/>
    <WhoWeAre/>

    <Footer/>

  </main>
}
