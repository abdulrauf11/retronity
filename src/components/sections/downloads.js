import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import device from "../device"
import arrow from "../../images/slider/right-arrow.svg"

import image1 from "../../images/slider/1.png"
import image2 from "../../images/slider/2.png"
import image3 from "../../images/slider/3.png"

// import Loadable from "@loadable/component"
// const LoadableSlider = Loadable(() => import("../canvas/slider"))

const Wrapper = styled.section`
  margin-bottom: 16rem;
  position: relative;
  ${device.small`margin-bottom: 8rem;`}
  ${device.large`margin-bottom: 20rem;`}
  
  h2 {
    margin: 2rem 0;
    font-size: 4rem;
    font-family: "Gilroy Bold";
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: var(--white);
    ${device.small`font-size: 3rem;`}
  }
`

const Carousel = styled.div`
  display: flex;
  align-items: center;
  .thumbnail-wrapper {
    flex: 3;
    .thumbnail {
      position: relative;
      width: 100%;
      height: 35vmax;
      max-height: 800px;
      background: var(--purple);
    }
  }
  .button-container {
    display: flex;
    justify-content: flex-end;
    flex: 1;
    ${device.small`display: none;`}
    .circle {
      position: relative;
      padding: 0;
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 1px solid var(--pink);
      transition: all 0.8s;
      ${device.large`width: 180px; height: 180px;`}
      &:hover {
        transform: scale(0.9);
        box-shadow: inset 0 0 0px 100px var(--pink);
      }
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 30%;
      }
    }
  }
`

const Card = styled.div`
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  width: 32vmax;
  max-width: 600px;
  padding: 3rem 2rem;
  color: var(--black);
  background: var(--white);
  ${device.small`position: static; transform: none; padding: 2rem; width: 100%;`}
  .name {
    font-size: 2rem;
    font-family: "Gilroy Bold";
    ${device.small`font-size: 1.5rem;`}
  }
  .text {
    margin: 1rem 0 2rem 0;
    width: 90%;
    ${device.small`width: 100%; margin-bottom: 1rem;`}
  }
  .link-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .next {
      border: 0;
      padding: 0;
      display: none;
      ${device.small`display: block;`}
      img {
        display: block;
        filter: brightness(0%);
        width: 40px;
      }
    }
  }
  .link {
    font-size: 0.95rem;
    font-family: "Gilroy Bold";
  }
`

const Downloads = () => {
  const data = [
    {
      title: "space retro loop",
      description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna`,
      thumbnail: image1,
      link: "",
    },
    {
      title: "space retro loop 2",
      description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna`,
      thumbnail: image2,
      link: "",
    },
    {
      title: "space retro loop 3",
      description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna`,
      thumbnail: image3,
      link: "",
    },
  ]
  const thumbnails = data.map(v => v.thumbnail)

  const animatedRef = useRef(null)

  const [currIndex, setCurrIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(-1)

  function handleClick() {
    setPrevIndex(currIndex)
    gsap.to(animatedRef.current, {
      duration: 0.5,
      opacity: 0,
      ease: "sine",
      onComplete: () => {
        setCurrIndex((currIndex + 1) % 3)
      },
    })
  }

  useEffect(() => {
    gsap.to(animatedRef.current, {
      duration: 1.5,
      opacity: 1,
      ease: "sine.inOut",
    })
  }, [currIndex])

  return (
    <Wrapper>
      <h2>visuals</h2>

      <Carousel>
        <div className="thumbnail-wrapper">
          <div className="thumbnail">
            {/* <LoadableSlider
              currIndex={currIndex}
              prevIndex={prevIndex}
              thumbnails={thumbnails}
            /> */}
          </div>
        </div>
        <div className="button-container">
          <button className="circle" onClick={handleClick}>
            <img src={arrow} alt="Arrow" />
          </button>
        </div>
      </Carousel>
      <Card>
        <div className="animated" ref={animatedRef}>
          <h3 className="name">{data[currIndex].title}</h3>
          <p className="text">{data[currIndex].description}</p>
        </div>
        
        <div className="link-wrapper">
          <span className="link">download now</span>
          <button className="next" onClick={handleClick}>
            <img src={arrow} alt="Arrow" />
          </button>
        </div>
      </Card>
    </Wrapper>
  )
}

export default Downloads
