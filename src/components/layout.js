import React from "react"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
// import Noise from "./canvas/noise"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* <Noise /> */}
    </>
  )
}

export default Layout
