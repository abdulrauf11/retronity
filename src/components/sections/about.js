import React from "react"
import styled from "styled-components"
import device from "../device"

import dots from "../../images/about/dots.svg"

// import Loadable from "@loadable/component"
// const LoadableBulgeText = Loadable(() => import("../canvas/bulge-text"))

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
  width: 50%;
  max-width: 650px;
  margin-left: auto;
  h2 {
    font-weight: normal;
    font-size: 3rem;
    margin: 1.5rem 0;
    ${device.large`font-size: 3.2rem;`}
  }
`

const RgbText = styled.div`
  font-size: 9vw;
  font-family: "Gilroy Bold";
  ${device.large`font-size: 9rem;`}
`

const TextWrapper = styled.div`
  position: relative;
  height: 30vmax;
`

const Dots = styled.div`
  margin-left: auto;
  img {
    width: 18vmax;
    max-width: 350px;
  }
`

const About = () => (
  <Wrapper>
    <div className="heading-wrapper">
      <RgbText>
        retronity is
        <br />
        inspired by
        <br />
        '80s theme.
      </RgbText>
      {/* <TextWrapper>
      <LoadableBulgeText />
    </TextWrapper> */}
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
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita
      </p>
    </Service>
  </Wrapper>
)

export default About
