import React, { useRef } from "react"
import { gsap } from "gsap"
import styled from "styled-components"
import device from "./device"

const Box = styled.div`
  padding: 3rem;
  ${device.small`padding: 2rem 0;`}
  ${device.large`padding: 5rem;`}
`

const Sticky = ({ children, movement = 10, duration = 1, className }) => {
  const stickyRef = useRef(null)

  function handleMouseMove(e) {
    if (!stickyRef.current.firstChild) return
    const target = stickyRef.current.firstChild
    const width = target.offsetWidth
    const height = target.offsetHeight
    const relX = e.pageX - target.offsetLeft
    const relY = e.pageY - target.offsetTop
    gsap.to(target, {
      duration,
      x: ((relX - width / 2) / width) * movement,
      y: ((relY - height / 2) / height) * movement,
      ease: "power2.out",
    })
  }

  function handleMouseLeave() {
    if (!stickyRef.current.firstChild) return
    const target = stickyRef.current.firstChild
    gsap.to(target, {
      duration,
      x: 0,
      y: 0,
      ease: "power2.out",
    })
  }

  return (
    <Box
      ref={stickyRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </Box>
  )
}

export default Sticky
