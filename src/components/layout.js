import React from "react"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import Cursor from "./cursor"
import Loadable from "@loadable/component"
const LoadableNoise = Loadable(() => import("./canvas/noise"))

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Cursor />
      <LoadableNoise />
    </>
  )
}

export default Layout
