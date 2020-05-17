import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { gsap } from "gsap"

import device from "../components/device"
import Layout from "../components/layout"
import SEO from "../components/seo"
import tree from "../images/visuals/tree.svg"

const Main = styled.main`
  position: relative;
  .tree {
    display: none;
    position: absolute;
    width: 35vmax;
    right: 0;
    z-index: -1;
    ${device.large`width: 40vmax;`}
  }

  .name {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 5rem;
    ${device.small`font-size: 3.5rem;`}
  }
`

const Wrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 12rem;
  ${device.large`margin-bottom: 17rem;`}
`

const Checkout = styled.div`
  margin-top: 2rem;
  display: flex;
  ${device.medium`flex-direction: column;`}
  .video-wrapper,
  .description {
    flex: 1;
  }
  .video-wrapper {
    video {
      width: 100%;
      height: auto;
    }
  }
  .description {
    ${device.medium`margin-top: 2rem;`}
    span {
      margin-left: 4rem;
      display: block;
      margin-bottom: 1rem;
      ${device.medium`margin-left: 0;`}
    }

    .price {
      font-family: "Gilroy Bold", sans-serif;
      font-size: 2rem;
    }
  }

  button {
    margin-top: 4rem;
    padding: 1rem;
    width: 100%;
    font-size: 0.8rem;
    background: var(--purple);
  }
`

const VisualSingle = ({ data }) => {
  const {
    name,
    childContentfulPaidVisualVideoJsonNode: video,
  } = data.contentfulPaidVisual

  const previewLink = video.secure_url.replace(
    "/video/upload/",
    "/video/upload/q_auto:good/"
  )
  const downloadLink = video.secure_url.replace(
    "/video/upload/",
    `/video/upload/q_auto:good,fl_attachment:${name}/`
  )

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
      <SEO title={name} />
      <Main>
        <img className="tree" src={tree} alt="Tree" ref={treeRef} />

        <Wrapper>
          <h1 className="name">{name}</h1>
          <Checkout>
            <div className="video-wrapper">
              <video controls disablePictureInPicture controlsList="nodownload">
                <source src={previewLink} type="video/mp4" />
              </video>
            </div>
            <div className="description">
              <span className="price">$80</span>
              <span>resolution: 1080X1080</span>
              <span>format: mp4</span>
              <span>download includes loop video only.</span>
              <span>download link sent via email.</span>
              <span>
                <button>Buy Now</button>
              </span>
            </div>
          </Checkout>
        </Wrapper>
      </Main>
    </Layout>
  )
}

export default VisualSingle

export const queryVisual = graphql`
  query($slug: String!) {
    contentfulPaidVisual(slug: { eq: $slug }) {
      name
      order
      childContentfulPaidVisualVideoJsonNode {
        secure_url
        width
        height
      }
    }
  }
`
