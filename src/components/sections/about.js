import React from "react"
import styled from "styled-components"
import device from "../device"

import dots from "../../images/about/dots.svg"

import Loadable from "@loadable/component"
const LoadableBulgeText = Loadable(() => import("../canvas/bulge-text"))

const Wrapper = styled.section`
  position: relative;
  .heading-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    & > div:first-child {
      flex: 1;
    }
  }
`

const Service = styled.div`
  margin-top: 4rem;
  width: 55%;
  max-width: 650px;
  margin-left: auto;
  ${device.small`width: 100%; margin-top: 0rem;`}
  h2 {
    font-weight: normal;
    font-size: 3rem;
    margin: 1.5rem 0;
    ${device.small`font-size: 1.7rem;`}
    ${device.large`font-size: 3.2rem;`}
  }
`

const RgbText = styled.div`
  font-size: 9vw;
  font-family: "Gilroy Bold";
  line-height: 1.2;
  ${device.small`font-size: 3.5rem;`}
  ${device.large`font-size: 9rem;`}
`

const TextWrapper = styled.div`
  position: relative;
  height: 32vmax;
`

const Dots = styled.div`
  margin-left: auto;
  ${device.small`display: none;`}
  img {
    width: 18vmax;
    max-width: 350px;
  }
`

const About = () => (
  <Wrapper>
    <div className="heading-wrapper">
      {/* <RgbText>
        retronity is
        <br />
        inspired by
        <br />
        '80s theme.
      </RgbText> */}
      <TextWrapper>
        <LoadableBulgeText />
      </TextWrapper>
      <Dots>
        <img src={dots} alt="Dots" />
      </Dots>
    </div>

    <Service>
      <h2>
        we provide free visuals
        <br />& loops for your music.
      </h2>
      <p>
        All the video loops you need you for your music! We select video loops
        every month to give away for free. If you are a video artist, VJ, media
        producer or video hobbyist you will find our site a valuable resource
        for your products/art.
      </p>
    </Service>
  </Wrapper>
)

export default About
