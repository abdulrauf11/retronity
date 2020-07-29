import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import device from "../components/device"
import Layout from "../components/layout"
import SEO from "../components/seo"
import plus from "../images/faq/plus.svg"

const BlockContent = require("@sanity/block-content-to-react")

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
    margin-top: 1rem;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    ${device.small`width: 100%;`}
    p {
      font-size: 1.2rem;
      line-height: 1.6;
      ${device.large`font-size: 1.3rem;`}
    }

    a {
      color: var(--purple);
      text-decoration: underline;
    }
  }

  .plus {
    position: relative;
    background: none;
    border: none;
    padding: 0;
    width: 30px;
    height: 30px;
    transition: transform 0.2s ease-out;
    img {
      z-index: -1;
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      display: block;
      ${device.large`width: 50px;`}
    }
  }
`

const Faq = ({ data }) => {
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
            {data.allSanityFaq.edges.map(({ node }, index) => (
              <li key={index}>
                <div className="question">
                  {node.question}
                  <button className="plus" onClick={handleClick}>
                    <img src={plus} alt="Click to view answer" />
                  </button>
                </div>
                <BlockContent
                  blocks={node._rawAnswer}
                  className="answer"
                  renderContainerOnSingleChild={true}
                />
              </li>
            ))}
          </Accordian>
        </Wrapper>
      </main>
    </Layout>
  )
}

export default Faq

export const query = graphql`
  {
    allSanityFaq {
      edges {
        node {
          question
          _rawAnswer(resolveReferences: { maxDepth: 10 })
        }
      }
    }
  }
`
