import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/forms/contactForm"

const Wrapper = styled.section`
  margin-top: 4rem;
`

const Text = styled.div`
  h1 {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 5rem;
  }
  p {
    max-width: 600px;
  }
`

const ContactPage = () => {
  return (
    <Layout>
      <SEO title="Contact" />
      <main>
        <Wrapper>
          <Text>
            <h1>contact</h1>
            <p>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et
            </p>
          </Text>
          <ContactForm />
        </Wrapper>
      </main>
    </Layout>
  )
}

export default ContactPage
