import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import FadeLink from "../components/transition-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Ticker from "../components/visuals/ticker"
import Checkers from "../components/visuals/checkers"
import device from "../components/device"

const Container = styled.div`
  margin-top: 4rem;
  position: relative;
  overflow: hidden;
`

const Grid = styled.section`
  margin-bottom: 18rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 150px 50px;
  ${device.small`margin-top: 4rem; margin-bottom: 10rem; grid-gap: 150px 0; grid-template-columns: 1fr`}
  .grid-item {
    display: block;
    position: relative;
    height: 30rem;
    ${device.small`height: 18rem;`};
  }

  .headings {
    margin: 0.5rem 0;
    h3 {
      font-family: "Gilroy Bold";
      font-size: 2.2rem;
    }
    h4 {
      font-size: 1.2rem;
    }
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
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
        <Ticker text={"not-so-free visuals"} />
        <Checkers />
      </Container>
      <main>
        <Grid>
          {data.allSanityPaidVisual.edges.map(({ node }, index) => (
            <div className="grid-item" key={index}>
              <FadeLink to={`/visuals/${node.slug.current}`}>
                <img
                  src={getThumbnail(node.slug.current)}
                  alt={node.title}
                  className="thumbnail"
                />
              </FadeLink>
              <div className="headings">
                <h3 className="name">{node.title}</h3>
                <h4 className="price">$80</h4>
              </div>
            </div>
          ))}
        </Grid>
      </main>
    </Layout>
  )
}

export default Visuals

export const query = graphql`
  {
    allSanityPaidVisual(filter: { slug: { current: { ne: null } } }) {
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
