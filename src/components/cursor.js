import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import device from "./device"

const CircleWrapper = styled.div`
  .circle {
    position: fixed;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--white);
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1000000;
    mix-blend-mode: exclusion;
    ${device.small`display: none;`}
    &.large {
      transform: scale(5);
    }
  }
`

const Cursor = () => {
  const circleRef = useRef(null)
  function handleMouseMove(e) {
    if (!circleRef.current) return
    gsap.to(circleRef.current, 0.3, {
      x: e.clientX,
      y: e.clientY,
    })
  }

  function handleMouseEnter() {
    gsap.to(circleRef.current, 0.35, {
      scale: 5,
      ease: "sine",
    })
  }

  function handleMouseLeave() {
    gsap.to(circleRef.current, 0.35, {
      scale: 1,
      ease: "sine",
    })
  }

  useEffect(() => {
    gsap.set(circleRef.current, {
      xPercent: -50,
      yPercent: -50,
    })

    const getLinks = document.querySelectorAll("a, button")
    getLinks.forEach(l => {
      l.addEventListener("mouseenter", handleMouseEnter)
      l.addEventListener("mouseleave", handleMouseLeave)
    })

    document.addEventListener("mousemove", e => handleMouseMove(e))

    return () => {
      document.removeEventListener("mousemove", e => handleMouseMove(e))
      getLinks.forEach(l => {
        l.removeEventListener("mouseenter", handleMouseEnter)
        l.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <CircleWrapper>
      <div className="circle" ref={circleRef}></div>
    </CircleWrapper>
  )
}

export default Cursor
