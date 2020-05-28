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
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 100px;
  ${device.small`margin-top: 4rem; margin-bottom: 6rem; grid-gap: 50px; grid-template-columns: repeat(1, 1fr);`}
  ${device.large`grid-gap: 150px 100px; margin-bottom: 18rem;`}
  .grid-item {
    height: 30rem;
    display: block;
    position: relative;
    overflow: hidden;
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
  const visuals = data.allVimeoVideo.edges.map(e => e.node)
  const ref_visuals = data.allFreeVideosJson.edges.map(e => e.node)

  let list = []
  for (let i = 0; i < visuals.length; i++) {
    list.push({
      ...visuals[i],
      ...ref_visuals.find(itmInner => itmInner._id === visuals[i].id),
    })
  }
  list.sort(function(a, b) {
    return a.order - b.order
  })

  return (
    <Layout>
      <SEO title="Visuals" />
      <Container>
        <Ticker text={"free visuals"} />
        <Checkers />
      </Container>
      <main>
        <Grid>
          {list.map((item, index) => (
            <FadeLink
              className="grid-item"
              key={index}
              to={`/visuals/${item.slug}`}
            >
              <img
                src={item.thumbnail.large}
                alt={item.title}
                className="thumbnail"
              />
              <div className="overlay">
                <h3 className="name">{item.title}</h3>
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
    allVimeoVideo(filter: { paid: { eq: false } }) {
      edges {
        node {
          id
          title
          slug
          thumbnail {
            large
          }
        }
      }
    }

    allFreeVideosJson {
      edges {
        node {
          _id
          order
        }
      }
    }
  }
`
