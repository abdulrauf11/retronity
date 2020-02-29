import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { gsap } from "gsap"
import FadeLink from "./transition-link"

const LogoWrapper = styled.span`
  display: block;
  position: relative;
  z-index: 101;
  a {
    color: inherit;
    font-size: 1.5rem;
    font-family: "Gilroy Bold";
  }
`

const Logo = () => {
  const logoRef = useRef(null)
  useEffect(() => {
    const timeline = gsap.timeline({
      repeat: -1,
      defaults: { duration: 0.8, ease: "linear" },
    })
    timeline
      .to(logoRef.current, { css: { color: "var(--purple)" } })
      .to(logoRef.current, { css: { color: "var(--white)" } })
      .to(logoRef.current, { css: { color: "var(--pink)" } })
      .to(logoRef.current, { css: { color: "var(--white)" } })
  }, [])

  return (
    <LogoWrapper>
      <div className="container" ref={logoRef}>
        <FadeLink to="/">retronity</FadeLink>
      </div>
    </LogoWrapper>
  )
}
export default Logo
