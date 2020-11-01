import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { gsap } from "gsap"

import device from "./device"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  pointer-events: none;
  opacity: 0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: var(--white);
  transform: scale(0.5);

  ${device.small`display: none;`};
`

function Cursor() {
  const cursorRef = useRef()

  function handleMouseEnterLink() {
    if (!cursorRef.current) return
    gsap.set(cursorRef.current, { mixBlendMode: "exclusion" })
    gsap.to(cursorRef.current, {
      duration: 0.3,
      scale: 2,
      ease: "sine",
      force3D: true,
    })
  }

  function handleMouseLeaveLink() {
    if (!cursorRef.current) return
    gsap.set(cursorRef.current, { mixBlendMode: "none" })
    gsap.to(cursorRef.current, {
      duration: 0.3,
      scale: 0.5,
      ease: "sine",
      force3D: true,
    })
  }

  function handleMouseMove(e, mouse) {
    mouse.x = e.x
    mouse.y = e.y
    cursorRef.current &&
      gsap.to(cursorRef.current, {
        duration: 0.2,
        opacity: 1,
        xPercent: -50,
        yPercent: -50,
      })
  }

  function handleMouseOut(e) {
    if (e.toElement == null && e.relatedTarget == null) {
      cursorRef.current && gsap.to(cursorRef.current, { opacity: 0 })
    }
  }

  useEffect(() => {
    const ball = cursorRef.current

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const mouse = { x: pos.x, y: pos.y }
    const speed = 1.0

    const fpms = 60 / 1000

    const xSet = gsap.quickSetter(ball, "x", "px")
    const ySet = gsap.quickSetter(ball, "y", "px")

    window.addEventListener("mousemove", e => handleMouseMove(e, mouse))
    window.addEventListener("mouseout", e => handleMouseOut(e))

    gsap.ticker.add((_, deltaTime) => {
      const delta = deltaTime * fpms
      const dt = 1.0 - Math.pow(1.0 - speed, delta)

      pos.x += (mouse.x - pos.x) * dt
      pos.y += (mouse.y - pos.y) * dt
      xSet(pos.x)
      ySet(pos.y)
    })

    return () => {
      window.removeEventListener("mousemove", e => handleMouseMove(e, mouse))
      window.removeEventListener("mouseout", e => handleMouseOut(e))
    }
  }, [])

  useEffect(() => {
    const links = document.querySelectorAll("a, button")

    links.forEach(l => {
      l.addEventListener("mouseenter", handleMouseEnterLink)
      l.addEventListener("mouseleave", handleMouseLeaveLink)
    })

    return () => {
      links.forEach(l => {
        l.removeEventListener("mouseenter", handleMouseEnterLink)
        l.removeEventListener("mouseleave", handleMouseLeaveLink)
      })
    }
  }, [])

  return <Container ref={cursorRef}></Container>
}

export default Cursor
