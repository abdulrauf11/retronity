import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { gsap } from "gsap"

import FadeLink from "../components/transition-link"
import device from "../components/device"
import Layout from "../components/layout"
import SEO from "../components/seo"
import tree from "../images/visuals/tree.svg"

const Main = styled.main`
  position: relative;
  .tree {
    position: absolute;
    width: 35vmax;
    right: 0;
    z-index: -1;
    ${device.large`width: 40vmax;`}
  }
`

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 12rem;
  ${device.large`margin-bottom: 17rem;`}

  .faq-link {
    text-align: center;
    margin-top: 10rem;
    a {
      font-size: 3.5rem;
      font-family: "Gilroy Bold", sans-serif;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--white);
      transition: all 0.3s ease-out;
      ${device.large`font-size: 4.5rem;`}
      &:hover {
        color: var(--black);
      }
    }
  }
`

const Video = styled.div`
  margin: 2rem 0 4rem 0;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: ${props => props.aspectRatio}%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`

const Details = styled.div`
  .name {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 5rem;
    ${device.small`font-size: 3.5rem;`}
  }
  .details {
    margin: 0.5rem 0;
    max-width: 600px;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${device.small`flex-direction: column;`}
  a {
    text-align: center;
    margin: 0 1rem;
    padding: 1rem;
    width: 12rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    border: 1px solid var(--purple);
    ${device.small`width: 100%;`}
    &.download {
      background: var(--purple);
      ${device.small`margin-bottom: 2rem;`}
    }
  }
`

const VisualSingle = ({ data }) => {
  const { id, title, width, height, iframe } = data.vimeoVideo

  const download_link = data.allFreeVideosJson.edges.find(
    ({ node }) => node._id === id
  ).node.download_link

  const treeRef = useRef(null)
  useEffect(() => {
    gsap.set(treeRef.current, { scaleX: -1, xPercent: 30 })
    gsap.to(treeRef.current, {
      duration: 1,
      rotation: 5,
      ease: "steps(1)",
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <Layout>
      <SEO title={title} />
      <Main>
        <img className="tree" src={tree} alt="Tree" ref={treeRef} />

        <Wrapper>
          <Details>
            <h1 className="name">{title}</h1>
            <p className="details">
              {width}X{height}
            </p>
          </Details>
          <Video
            aspectRatio={(height / width) * 100}
            dangerouslySetInnerHTML={{ __html: iframe }}
          />
          <Buttons>
            <a
              href={download_link}
              className="download"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download
            </a>
            <a
              className="donate"
              href="https://www.patreon.com/tippydreamer"
              target="_blank"
              rel="noopener noreferrer"
            >
              donate
            </a>
          </Buttons>
          <div className="faq-link">
            <FadeLink to="/faq/">how to use this rad visual?</FadeLink>
          </div>
        </Wrapper>
      </Main>
    </Layout>
  )
}

export default VisualSingle

export const queryVisual = graphql`
  query($slug: String!) {
    vimeoVideo(slug: { eq: $slug }) {
      id
      title
      width
      height
      iframe
    }

    allFreeVideosJson {
      edges {
        node {
          _id
          download_link
        }
      }
    }
  }
`
