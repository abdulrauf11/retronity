import React from "react"
import Loadable from "@loadable/component"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import Cursor from "./cursor"

const Noise = Loadable(() => import("./canvas/noise"))

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Cursor />
      <Noise />
    </>
  )
}

export default Layout
