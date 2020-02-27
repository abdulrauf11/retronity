import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import About from "../components/sections/about"
import Downloads from "../components/sections/downloads"
import License from "../components/sections/license"
// import Loader from "../components/loader"
// import { useWindowContext } from "../components/context"

const IndexPage = () => {
  // const { loaded } = useWindowContext()
  // const [allLoaded, setAllLoaded] = useState(false)
  // useEffect(() => {
  //   Object.values(loaded).every(val => val) &&
  //     setTimeout(() => setAllLoaded(true), 2000)
  // }, [loaded])

  return (
    <Layout>
      <SEO title="Home" />
      <main>
        <Hero />
        <About />
        <Downloads />
        <License />
      </main>
      {/* {!allLoaded && <Loader />} */}
    </Layout>
  )
}

export default IndexPage
