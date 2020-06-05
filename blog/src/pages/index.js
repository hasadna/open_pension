import React from "react"
import './index.scss'

import {UpperStrip} from "../components/Sections/UpperStrip/UpperStrip";
import {Blogs} from "../components/Sections/Blogs/Blogs";
import {Articles} from "../components/Sections/Articles/Articles";
import {WhoWeAre} from "../components/Sections/WhoWeAre/WhoWeAre";

import {Wrapper} from "../components/Page";

export default function Home() {
  return <Wrapper front={true}>
    <UpperStrip/>
    <Blogs/>
    <Articles/>
    <WhoWeAre/>
  </Wrapper>
}
