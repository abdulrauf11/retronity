import React from "react"
import styled from "styled-components"
import {graphql, Link} from "gatsby"
import Img from "gatsby-image/withIEPolyfill"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Ticker from "../components/downloads/ticker"
import Checkers from "../components/downloads/checkers"
import License from "../components/sections/license"
import device from "../components/device"

const Container = styled.div`
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
`

const Grid = styled.div`
  margin: 8rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 100px;
  ${device.small`margin-top: 4rem; grid-gap: 50px; grid-template-columns: repeat(1, 1fr);`}
  ${device.large`grid-gap: 150px 100px;`}
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
    display: block;
    position: relative;
    overflow: hidden;
    .overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      background: rgba(144, 0, 255, 0.5);
      transition: opacity 0.3s;
      ${device.small`opacity: 1; background: transparent;`}
      &:hover {
        opacity: 1;
      }
      .name {
        font-size: 3rem;
        font-family: "Gilroy Bold";
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: var(--white);
        ${device.small`font-size: 2rem; -webkit-text-stroke-width: 1px;`}
        ${device.large`font-size: 4rem;`}
      }
    }
  }
`

const Visuals = ({data}) => {
  return (
    <Layout>
      <SEO title="Visuals" />
      <Container>
        <Ticker />
        <Checkers />
      </Container>
      <main>
        <Grid>
          {
            data.allContentfulVisual.edges.map(({node}, index) => 
              <Link className="grid-item" key={index} to={`/visuals/${node.slug}`}>
                {
                  !!node.thumbnail &&  
                  <Img fluid={node.thumbnail.fluid} className="thumbnail" />
                }
                <div className="overlay">
                  <h3 className="name">{node.name}</h3>
                </div>
              </Link>
            )
          }
        </Grid>
        <License />
      </main>
    </Layout>
  )
}

export default Visuals

export const query = graphql`
  {
    allContentfulVisual {
      edges {
        node {
          slug
          name
          thumbnail {
            fluid(maxWidth: 700) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

