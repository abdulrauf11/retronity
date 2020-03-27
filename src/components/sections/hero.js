import React from "react"
import styled from "styled-components"
import { useInView } from "react-intersection-observer"
import { CSSTransition } from "react-transition-group"
import device from "../device"

import Loadable from "@loadable/component"
// const LoadableMirage = Loadable(() => import("../canvas/mirage"), {
//   fallback: <div className="scene-loader"></div>,
// })
const LoadableMirage = Loadable(() => import("../canvas/mirage"))

const Wrapper = styled.section`
  margin-top: 0rem;
  ${device.small`margin-top: 2rem;`}
  ${device.large`margin-top: 4rem;`}
  .container {
    width: 90%;
    margin: 0 auto;
    position: relative;
    ${device.small`display: flex; flex-direction: column-reverse; justify-content: center; height: 72vh;`}
    .slogan {
      z-index: 2;
      position: absolute;
      top: 45%;
      transform: translate(0, -50%);
      font-size: 8vw;
      font-family: "Gilroy Bold";
      text-align: center;
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--white);
      line-height: 1;
      ${device.small`font-size: 3.2rem; position: static; width: 100%;
        transform: none; margin-top: 2rem; -webkit-text-stroke-width: 1px;`}
      ${device.large`font-size: 7.5rem;`}
    }
  }
`

const Scene = styled.div`
  z-index: 1;
  margin-left: auto;
  position: relative;
  width: 35vmax;
  height: 35vmax;
  min-width: 260px;
  min-height: 260px;
  max-width: 800px;
  max-height: 800px;
  ${device.small`margin-right: auto;`}
  .scene-loader {
    background: var(--pink);
    opacity: 0.1;
    border-radius: 50%;
    width: 93%;
    height: 93%;
  }

  .animated-wrapper {
    &.animated-enter {
      opacity: 0;
    }
    &.animated-enter-active {
      opacity: 1;
      transition: opacity 1s ease-out;
    }
  }
`

const SocialLinks = styled.div`
  margin-top: 5%;
  position: relative;
  ${device.small`display: none;`}
  .vertical {
    position: absolute;
    left: 0;
    top: 0;
    transform: rotate(270deg) translate(0, 0);
    transform-origin: 0 0;
    &.scroll {
      padding: 0 0.5rem;
      right: 0;
      left: auto;
      transform-origin: 100% 0;
      transform: rotate(90deg) translate(0, 0%);
    }
  }
  a {
    font-size: 0.9rem;
    position: relative;
    padding: 0.5rem;
    &:after {
      display: block;
      backface-visibility: none;
      left: 0;
      top: 50%;
      position: absolute;
      content: "";
      width: 100%;
      height: 2px;
      background: var(--purple);
      transform: scaleX(0);
      transform-origin: 0 0;
      transition: transform 0.35s ease-out;
    }
    &:hover:after {
      transform: scaleX(1);
    }
    &:first-child {
      margin-right: 1rem;
    }
  }
`

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true })
  return (
    <Wrapper ref={ref}>
      <div className="container">
        <h1 className="slogan">
          to retronity
          <br />& beyond
        </h1>
        <Scene>
          <CSSTransition
            in={inView}
            timeout={1000}
            classNames="animated"
            unmountOnExit
          >
            <div className="animated-wrapper">
              <LoadableMirage />
            </div>
          </CSSTransition>
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
}

export default Hero
