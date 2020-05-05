import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FadeLink from "../components/transition-link"
import device from "../components/device"

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 15rem;
  ${device.small`margin-bottom: 10rem;`}
  ${device.large`margin-bottom: 20rem;`}
  text-align: center;
  p {
    margin: 0rem 0 4rem 0;
  }
  button {
    padding: calc(1rem / 1) calc(4rem / 1);
    transition: all 0.8s;
    &:hover {
      box-shadow: inset 0 0 0px 30px var(--purple);
    }
  }
`

const Heading = styled.h1`
  font-family: "Gilroy Bold";
  font-size: 5rem;
  margin: 0;
`

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Wrapper>
      <Heading>NOT FOUND</Heading>
      <p>You accidentally came to the year 2020</p>
      <FadeLink to="/">
        <button>go back now</button>
      </FadeLink>
    </Wrapper>
  </Layout>
)

export default NotFoundPage
