import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import device from "./device"

const CircleWrapper = styled.div`
  .circle {
    position: fixed;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: var(--white);
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 1000000;
    mix-blend-mode: exclusion;
    ${device.small`display: none;`}
  }
`

const Cursor = () => {
  const circleRef = useRef(null)
  function handleMouseMove(e) {
    if (!circleRef.current) return
    gsap.to(circleRef.current, 0.1, {
      x: e.clientX,
      y: e.clientY,
      ease: "sine",
    })
  }

  function handleMouseEnter() {
    gsap.to(circleRef.current, 0.35, {
      scale: 1,
      ease: "sine",
      force3D: false,
    })
  }

  function handleMouseLeave() {
    gsap.to(circleRef.current, 0.35, {
      scale: 1 / 5,
      ease: "sine",
      force3D: false,
    })
  }

  useEffect(() => {
    gsap.set(circleRef.current, {
      xPercent: -50,
      yPercent: -50,
      scale: 1 / 5,
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
