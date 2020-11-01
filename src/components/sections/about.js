import React from "react"
import Loadable from "@loadable/component"
import styled from "styled-components"
import device from "../device"
import dots from "../../images/about/dots.svg"

const RgbText = styled.div`
  font-size: 9vw;
  font-family: "Gilroy Bold";
  ${device.small`font-size: 45px;`}
  ${device.large`font-size: 9rem;`}
`

const BulgeText = Loadable(() => import("../canvas/bulge-text"), {
  fallback: (
    <RgbText>
      retronity is
      <br />
      inspired by
      <br />
      '80s theme.
    </RgbText>
  ),
})

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
  max-width: 550px;
  margin-left: auto;
  ${device.small`width: 100%; margin-top: 0rem;`}
  ${device.large`max-width: 650px;`}
  h2 {
    font-weight: normal;
    font-size: 3rem;
    margin: 1.5rem 0;
    ${device.small`font-size: 1.5rem;`}
    ${device.large`font-size: 3.2rem;`}
  }
`

const TextWrapper = styled.div`
  position: relative;
  height: 32vmax;
  max-height: 650px;
  ${device.small`height: auto; margin-bottom: 2rem;`}
`

const Dots = styled.div`
  margin-left: auto;
  ${device.small`display: none;`}
  img {
    width: 18vmax;
    max-width: 350px;
  }
`

const About = () => {
  return (
    <Wrapper>
      <div className="heading-wrapper">
        <TextWrapper>
          <BulgeText />
        </TextWrapper>
        <Dots>
          <img src={dots} alt="Dots" />
        </Dots>
      </div>

      <Service>
        <h2>
          we provide rad visuals
          <br />& loops for your music.
        </h2>
        <p>
          All the video loops you need you for your music! We select video loops
          every month to give away for free. If you are a video artist, VJ,
          media producer or video hobbyist you will find our site a valuable
          resource for your products/art.
        </p>
      </Service>
    </Wrapper>
  )
}

export default About
