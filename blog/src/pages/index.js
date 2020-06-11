import React from "react"
import './index.scss'

import {Money} from "../components/Sections/Money/Money";
import {Blogs} from "../components/Sections/Blogs/Blogs";
import {Articles} from "../components/Sections/Articles/Articles";
import {WhoWeAre} from "../components/Sections/WhoWeAre/WhoWeAre";

import {Wrapper} from "../components/Page";

export default function Home() {
  return <Wrapper front={true}>
    <Money/>
    <Blogs/>
    <Articles/>
    <WhoWeAre/>
  </Wrapper>
}
