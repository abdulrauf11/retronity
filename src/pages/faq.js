import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import device from "../components/device"
import Layout from "../components/layout"
import SEO from "../components/seo"
import plus from "../images/faq/plus.svg"

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 15rem;
  ${device.small`margin-bottom: 10rem;`}
  ${device.large`margin-bottom: 20rem;`}
`

const Accordian = styled.ul`
  margin-top: 4rem;
  li {
    margin-top: 6rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 0, 255, 0.3);
  }
  .question {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${device.small`font-size: 2rem;`}
    ${device.large`font-size: 4.5rem;`}
  }
  .answer {
    font-size: 1.2rem;
    margin-top: 1rem;
    line-height: 1.6;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    ${device.small`width: 100%;`}
    ${device.large`font-size: 1.3rem;`}
  }

  .plus {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    transition: transform 0.2s ease-out;
    img {
      width: 30px;
      ${device.large`width: 50px;`}
    }
  }
`

const Faq = ({ data }) => {
  const faqs = data.allFaqsJson.edges

  function handleClick(e) {
    const button = e.currentTarget
    if (button.style.transform) {
      button.style.transform = null
    } else {
      button.style.transform = "rotate(45deg)"
    }
    const question = button.parentElement.nextSibling
    if (question.style.maxHeight) {
      question.style.maxHeight = null
    } else {
      question.style.maxHeight = question.scrollHeight + "px"
    }
  }

  return (
    <Layout>
      <SEO title={"faq"} />
      <main>
        <Wrapper>
          <Accordian>
            {faqs.map(({ node }, index) => (
              <li key={index}>
                <div className="question">
                  {node.question}
                  <button className="plus" onClick={handleClick}>
                    <img src={plus} alt="Click to view answer" />
                  </button>
                </div>
                <div className="answer">{node.answer}</div>
              </li>
            ))}
          </Accordian>
        </Wrapper>
      </main>
    </Layout>
  )
}

export default Faq

export const queryVisual = graphql`
  {
    allFaqsJson {
      edges {
        node {
          question
          answer
        }
      }
    }
  }
`
