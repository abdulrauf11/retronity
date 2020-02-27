import React, { useState, useRef, useEffect } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { gsap } from "gsap"
import device from "../device"

import arrow from "../../images/visuals/right-arrow.svg"
import tree from "../../images/visuals/tree.svg"
import image1 from "../../images/slider/ride_along.png"
import image2 from "../../images/slider/chasing_dreams.png"
import image3 from "../../images/slider/fade_away.png"

import Loadable from "@loadable/component"
const LoadableSlider = Loadable(() => import("../canvas/slider"))

const Wrapper = styled.div`
  margin-bottom: 16rem;
  position: relative;
  ${device.small`margin-bottom: 8rem;`}
  ${device.large`margin-bottom: 20rem;`}

  .tree {
    position: absolute;
    width: 35vmax;
    z-index: -1;
    left: 0;
    bottom: 0;
    transform: translate(-30%, 30%);
    ${device.small`display: none;`}
    ${device.large`width: 40vmax;`}
  }

  section {
    position: relative;
  }

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
  height: 250px;
  display: flex;
  justif-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  transform: translateY(-50%);
  width: 32vmax;
  max-width: 600px;
  padding: 0rem 2rem;
  color: var(--black);
  background: var(--white);
  ${device.small`position: static; transform: none; width: 100%;`}
  .name {
    font-size: 2rem;
    font-family: "Gilroy Bold";
    ${device.small`font-size: 1.5rem;`}
  }
  .quote {
    font-size: 0.9rem;
    margin: 1rem 0 2rem 0;
  }
  .reference {
    font-style: oblique;
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
    color: var(--black);
    font-size: 0.95rem;
    font-family: "Gilroy Bold";
  }
`

const Downloads = () => {
  const data = [
    {
      title: "ride along",
      quote:
        "If my calculations are correct, when this baby hits 88 miles per hour, you're gonna see some serious shit.",
      reference: "Back to the Future (1985)",
      thumbnail: image1,
      slug: "/visuals/ride-along",
    },
    {
      title: "chasing dreams",
      quote:
        "All he'd wanted were the same answers the rest of us want. Where did I come from? Where am I going? How long have I got?",
      reference: "Blade Runner (1982)",
      thumbnail: image2,
      slug: "/visuals/chasing-dreams",
    },
    {
      title: "fade away",
      quote: "The more things change, the more they stay the same.",
      reference: "The Color Purple (1985)",
      thumbnail: image3,
      slug: "/visuals/fade-away",
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

  const treeRef = useRef(null)
  useEffect(() => {
    gsap.to(treeRef.current, {
      duration: 1,
      rotation: 5,
      ease: "steps(1)",
      repeat: -1,
      yoyo: true,
    })
  }, [])

  return (
    <Wrapper>
      <img className="tree" src={tree} alt="Tree" ref={treeRef} />
      <section>
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
            <p className="quote">
              "{data[currIndex].quote}" –{" "}
              <span className="reference">{data[currIndex].reference}</span>
            </p>
            <div className="link-wrapper">
              <Link className="link" to={data[currIndex].slug}>
                download now
              </Link>
              <button className="next" onClick={handleClick}>
                <img src={arrow} alt="Arrow" />
              </button>
            </div>
          </div>
        </Card>
      </section>
    </Wrapper>
  )
}

export default Downloads
