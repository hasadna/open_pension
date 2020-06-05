import React from "react"
import {Header} from "./Header/Header";
import {Navigation} from "./Navigation/Navigation";
import {Footer} from "./Footer/Footer";

export const Wrapper = ({ children, front }) => {
  return <main>
    <Header />

    {front && <Navigation /> }

    {children}

    <Footer appendToBottom={!front}/>
  </main>

};
