import React from "react"
import styled from "styled-components"
import device from "../device"

import Loadable from "@loadable/component"
const LoadableMirage = Loadable(() => import("../canvas/mirage"))

const Wrapper = styled.section`
  margin-top: 0rem;
  ${device.small`margin-top: 2rem;`}
  ${device.large`margin-top: 4rem;`}
  .container {
    width: 90%;
    margin: 0 auto;
    position: relative;
    ${device.small`display: flex; flex-direction: column-reverse;`}
    .slogan {
      z-index: 1;
      position: absolute;
      top: 45%;
      transform: translate(0, -50%);
      font-size: 6.5rem;
      font-family: "Gilroy Bold";
      text-align: center;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--white);
      line-height: 1;
      ${device.small`font-size: 3rem; position: static; transform: none;`}
      ${device.large`font-size: 7.5rem;`}
    }
  }
`

const Scene = styled.div`
  margin-left: auto;
  position: relative;
  width: 35vmax;
  height: 35vmax;
  min-width: 250px;
  min-height: 250px;
  max-width: 800px;
  max-height: 800px;
`

const SocialLinks = styled.div`
  position: relative;
  ${device.small`display: none;`}
  .vertical {
    position: absolute;
    left: 0;
    top: 0;
    transform: rotate(270deg) translate(0, 0);
    transform-origin: 0 0;
    &.scroll {
      right: 0;
      left: auto;
      transform-origin: 100% 0;
      transform: rotate(90deg) translate(0, 0%);
    }
  }
  a {
    font-size: 0.9rem;
    &:first-child {
      margin-right: 2rem;
    }
  }
`

const Hero = () => (
  <Wrapper>
    <div className="container">
      <h1 className="slogan">
        to retronity
        <br />& beyond
      </h1>
      <Scene>
        <LoadableMirage />
      </Scene>
    </div>

    <SocialLinks>
      <div className="vertical">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/"
        >
          fb
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/"
        >
          insta
        </a>
      </div>
      <div className="scroll vertical">scroll down</div>
    </SocialLinks>
  </Wrapper>
)

export default Hero
