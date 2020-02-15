import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Video from "../components/video"

const Details = styled.div`
  .name {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 5rem;
  }
  .details {
    margin: 1rem 0;
    max-width: 600px;
  }
`

const Buttons = styled.div`
  text-align: center;
  button {
    min-width: 140px;
    margin: 0 1rem;
    &.download {
      background: var(--purple);
    }
  }
`

const Information = styled.div`
  h2 {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 2rem;
  }
  p {
    margin: 1rem 0;
    max-width: 600px;
  }
`

const VisualSingle = ({ data }) => {
  const {
    name,
    childContentfulVisualVideoJsonNode: video,
  } = data.contentfulVisual
  return (
    <Layout>
      <SEO title="Visual - Name" />
      <main>
        <section style={{ marginTop: "4rem" }}>
          <Details>
            <h1 className="name">{name}</h1>
            <p className="details">video details</p>
          </Details>
          <Video src={video.secure_url} />
          <Buttons>
            <button className="download">Download</button>
            <button className="donate">Donate</button>
          </Buttons>
        </section>

        <Information>
          <section className="terms">
            <h2>terms and conditions</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </p>
          </section>
          <section className="faqs">
            <h2>faqs</h2>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </p>
          </section>
        </Information>
      </main>
    </Layout>
  )
}

export default VisualSingle

export const queryVisual = graphql`
  query($slug: String!) {
    contentfulVisual(slug: { eq: $slug }) {
      name
      order
      childContentfulVisualVideoJsonNode {
        secure_url
        width
        height
      }
    }
  }
`
