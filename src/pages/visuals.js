import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Ticker from "../components/downloads/ticker"
import Checkers from "../components/downloads/checkers"
import License from "../components/sections/license"

const Container = styled.div`
  position: relative;
  overflow: hidden;
`

const Grid = styled.div`
  margin: 8rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, calc(50% - 50px)));
  grid-auto-rows: 1fr;
  grid-gap: 100px;
  &::before {
    content: "";
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  & > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }
  .grid-item {
    border: 1px solid var(--purple);
  }
`

const Downloads = () => {
  return (
    <Layout>
      <SEO title="Visuals" />
      <Container>
        <Ticker />
        <Checkers />
      </Container>
      <main>
        <Grid>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
        </Grid>
        <License />
      </main>
    </Layout>
  )
}

export default Downloads
