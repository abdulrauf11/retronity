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
  margin-bottom: 12rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 150px 100px;
  ${device.small`margin-top: 4rem; margin-bottom: 6rem; grid-gap: 150px 0; grid-template-columns: repeat(1, 1fr);`}
  ${device.large`grid-gap: 200px 100px; margin-bottom: 18rem;`}
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
  const visuals = data.allVimeoVideo.edges.map(e => e.node)
  const ref_visuals = data.allPaidVideosJson.edges.map(e => e.node)

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
        <Ticker text={"not-so-free visuals"} />
        <Checkers />
      </Container>
      <main>
        <Grid>
          {list.map((item, index) => (
            <div className="grid-item" key={index}>
              <FadeLink to={`/visuals/${item.slug}`}>
                <img
                  src={item.thumbnail.large}
                  alt={item.title}
                  className="thumbnail"
                />
              </FadeLink>
              <div className="headings">
                <h3 className="name">{item.title}</h3>
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
    allVimeoVideo(filter: { paid: { eq: true } }) {
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

    allPaidVideosJson {
      edges {
        node {
          _id
          order
        }
      }
    }
  }
`
