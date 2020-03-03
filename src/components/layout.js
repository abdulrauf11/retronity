import React from "react"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import Cursor from "./cursor"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Cursor />
    </>
  )
}

export default Layout
