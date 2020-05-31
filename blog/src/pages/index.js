import React from "react"
import './index.scss'

import {Header} from "../components/Header";
import {Navigation} from "../components/Navigation";

import {FirstStrip} from "../components/Strips/First/Strip";
import {SecondStrip} from "../components/Strips/Second/Strip";
import {ThirdStrip} from "../components/Strips/Third/Strip";
import {FourthStrip} from "../components/Strips/Fourth/FourthStrip";

import {Footer} from "../components/Footer/Footer";

export default function Home() {
  return <main>

    <Header/>
    <Navigation/>

    <FirstStrip/>
    <SecondStrip/>
    <ThirdStrip/>
    <FourthStrip/>

    <Footer/>

  </main>
}
