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
  margin-bottom: 15rem;
  ${device.large`margin-bottom: 20rem;`}
`

const Checkout = styled.div`
  margin-top: 6rem;
  display: flex;
  ${device.medium`flex-direction: column;`}
  .description {
    flex: 1;
  }
`

const Video = styled.div`
  background: var(--black);
  flex: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
  ${device.medium`padding-top: ${props => props.aspectRatio}%;`};
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

const Info = styled.div`
  margin-left: 4rem;
  ${device.medium`margin-left: 0; margin-top: 2rem;`}
  .price {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 4rem;
  }
  .details {
    margin: 3rem 0;
    width: 70%;
    ${device.small`width: 100%;`}
    .item {
      display: flex;
      margin: 1rem 0;
    }
    span {
      flex: 1;
    }
    span:first-child {
      font-family: "Gilroy Bold";
    }
  }
  .note {
    margin: 4rem 0;
    font-style: italic;
    font-size: 0.9rem;
  }
  a {
    text-align: center;
    text-transform: uppercase;
    display: block;
    padding: 1rem;
    width: 100%;
    font-size: 0.8rem;
    background: var(--purple);
  }
`

const VisualSingle = ({ data }) => {
  const { id, title, width, height, iframe } = data.vimeoVideo

  const buy_code = data.allPaidVideosJson.edges.find(
    ({ node }) => node._id === id
  ).node.buy_code

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

  useEffect(() => {
    function init2Checkout(document, src, libName, config) {
      var script = document.createElement("script")
      script.src = src
      script.async = true
      var firstScriptElement = document.getElementsByTagName("script")[0]
      script.onload = function() {
        for (var namespace in config) {
          if (config.hasOwnProperty(namespace)) {
            window[libName].setup.setConfig(namespace, config[namespace])
          }
        }
        window[libName].register()
      }

      firstScriptElement.parentNode.insertBefore(script, firstScriptElement)
    }
    init2Checkout(
      document,
      "https://secure.avangate.com/checkout/client/twoCoInlineCart.js",
      "TwoCoInlineCart",
      {
        app: { merchant: "250356384615", iframeLoad: "checkout" },
        cart: {
          host: "https://secure.2checkout.com",
          customization: "inline",
        },
      }
    )
  }, [])

  return (
    <Layout>
      <SEO title={title} />
      <Main>
        <img className="tree" src={tree} alt="Tree" ref={treeRef} />

        <Wrapper>
          <h1 className="name">{title}</h1>
          <Checkout>
            <Video
              aspectRatio={(height / width) * 100}
              dangerouslySetInnerHTML={{ __html: iframe }}
            />
            <Info>
              <div className="price">$80</div>
              <div className="details">
                <div className="item">
                  <span>resolution</span>
                  <span>
                    {width}X{height}
                  </span>
                </div>
                <div className="item">
                  <span>format</span>
                  <span>mp4</span>
                </div>
                <div className="item">
                  <span>video encoding</span>
                  <span>H.264</span>
                </div>
              </div>

              <div className="note">
                <p>
                  download includes loop video only. download link sent via
                  email.
                </p>
              </div>

              <div className="button-wrapper">
                <a
                  href="#buy"
                  className="avangate_button"
                  product-code={buy_code}
                  product-quantity="1"
                >
                  Buy now
                </a>
              </div>
            </Info>
          </Checkout>
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

    allPaidVideosJson {
      edges {
        node {
          _id
          buy_code
        }
      }
    }
  }
`
