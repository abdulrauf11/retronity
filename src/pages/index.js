import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/sections/hero"
import About from "../components/sections/about"
import Downloads from "../components/sections/downloads"
import License from "../components/sections/license"

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <main>
        <Hero />
        <About />
        <Downloads />
        <License />
      </main>
    </Layout>
  )
}

export default IndexPage
