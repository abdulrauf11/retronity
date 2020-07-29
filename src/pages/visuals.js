import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import FadeLink from "../components/transition-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Ticker from "../components/visuals/ticker"
import Checkers from "../components/visuals/checkers"
import License from "../components/sections/license"
import device from "../components/device"

const Container = styled.div`
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
`

const Grid = styled.section`
  margin-bottom: 12rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 150px 50px;
  ${device.small`margin-top: 4rem; margin-bottom: 6rem; grid-gap: 50px 0; grid-template-columns: 1fr`}
  ${device.large`margin-bottom: 18rem;`}
  
  
  .grid-item {
    display: block;
    position: relative;
    overflow: hidden;
    height: 30rem;
    ${device.small`height: 18rem;`};
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
        width: 90%;
        margin: 0 auto;
        font-size: 3rem;
        font-family: "Gilroy Bold";
        -webkit-text-fill-color: transparent;
        -webkit-text-stroke-width: 1px;
        -webkit-text-stroke-color: var(--white);
        ${device.small`font-size: 2rem; -webkit-text-stroke-width: 1px;`}
        ${device.large`font-size: 4rem;`}
      }
    }

    .thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
`

const Visuals = ({ data }) => {
  function getThumbnail(slug) {
    const edge = data.allVimeoVideo.edges.find(({ node }) => node.slug === slug)
    return edge.node.thumbnail.large
  }

  return (
    <Layout>
      <SEO title="Visuals" />
      <Container>
        <Ticker text={"free visuals"} />
        <Checkers />
      </Container>
      <main>
        <Grid>
          {data.allSanityFreeVisual.edges.map(({ node }, index) => (
            <FadeLink
              className="grid-item"
              key={index}
              to={`/visuals/${node.slug.current}`}
            >
              <img
                src={getThumbnail(node.slug.current)}
                alt={node.title}
                className="thumbnail"
              />
              <div className="overlay">
                <h3 className="name">{node.title}</h3>
              </div>
            </FadeLink>
          ))}
        </Grid>
        <License />
      </main>
    </Layout>
  )
}

export default Visuals

export const query = graphql`
  {
    allSanityFreeVisual(filter: { slug: { current: { ne: null } } }) {
      edges {
        node {
          title
          slug {
            current
          }
        }
      }
    }

    allVimeoVideo {
      edges {
        node {
          slug
          thumbnail {
            large
          }
        }
      }
    }
  }
`
