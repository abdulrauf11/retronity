import React, { useRef, useEffect } from "react"
import styled from "styled-components"

import glasses from "../images/parallax/glasses.svg"

import { gsap } from "gsap"
// import ScrollMagic from "scrollmagic"

// factory(require("scrollmagic"), TweenMax, TimelineMax)
// require("imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap")

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  div {
    position: relative;
    top: 100%;
    glasses {
    }
  }
`

const Parallax = () => {
  const objRef = useRef(null)

  // useEffect(() => {
  //   const timeline = gsap.timeline({
  //     paused: true,
  //     defaults: { ease: "none", duration: 1 },
  //   })
  //   timeline.to(objRef.current, { y: -180 })

  //   let controller = new ScrollMagic.Controller()

  //   new ScrollMagic.Scene({
  //     triggerElement: this,
  //     triggerHook: 0.4,
  //     duration: "100%",
  //   })
  //     .setTween(timeline)
  //     .addIndicators({
  //       colorTrigger: "red",
  //       colorStart: "red",
  //       colorEnd: "red",
  //       indent: 10,
  //     })
  //     .addTo(controller)
  // }, [])

  return (
    <Wrapper>
      <div ref={objRef}>
        <img src={glasses} alt="Glasses" />
      </div>
    </Wrapper>
  )
}

export default Parallax
