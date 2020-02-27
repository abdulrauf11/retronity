import React from "react"
import styled from "styled-components"
import device from "../components/device"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/forms/contactForm"

import semicircle from "../images/contact/semi-circle.svg"

const Main = styled.main`
  position: relative;
  .semi-circle {
    position: absolute;
    width: 45vmax;
    top: 50%;
    transform: translate(40%, -60%);
    right: 0;
    z-index: -1;
    ${device.small`transform: translate(40%, 0%); top: 0; width: 250px;`}
  }
`

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 15rem;
  ${device.small`margin-bottom: 10rem;`}
  ${device.large`margin-bottom: 20rem;`}
`

const Text = styled.div`
  h1 {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 5rem;
  }
  p {
    margin-top: 1rem;
    width: 65%;
    max-width: 1000px;
    ${device.small`width: 100%;`}
  }
`

const ContactPage = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <Main>
        <img className="semi-circle" src={semicircle} alt="Circle" />
        <Wrapper>
          <Text>
            <h1>yello</h1>
            <p>
              Feel free to reach out whether you're interested in working with
              us, or just want to talk about the '80s.
              <br />
              Later days and better lays!
            </p>
          </Text>
          <ContactForm />
        </Wrapper>
      </Main>
    </Layout>
  )
}

export default ContactPage
