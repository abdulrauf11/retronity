import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Sticky from "./sticky"
import device from "./device"
import { gsap } from "gsap"

const Wrapper = styled.header`
  width: calc(var(--spread) + 6rem);
  max-width: calc(var(--limit) + 10rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
  ${device.small`width: var(--spread);`}
`

const Logo = styled.span`
  display: block;
  a {
    font-size: 1.5rem;
    font-family: "Gilroy Bold";
  }
`

const PageLinks = styled.div`
  padding-right: 3rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${device.small`display: none;`}
  ${device.large`padding-right: 5rem;`}
  a {
    display: block;
    font-size: 0.9rem;
    margin-left: 3rem;
    ${device.large`margin-left: 5rem;`}
    &:first-child {
      margin-left: 0;
    }
    &.bordered {
      font-size: 0.8rem;
      border: 1px solid var(--purple);
      padding: 0.6rem 2rem;
      text-transform: uppercase;
    }
  }
`

const Header = () => {
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
    <Wrapper>
      <Sticky>
        <Logo>
          <Link to="/" ref={logoRef}>
            retronity
          </Link>
        </Logo>
      </Sticky>
      <PageLinks>
        <Link to="/visuals">rad visuals</Link>
        <Link to="/faq">wut da faq</Link>
        <Link to="/contact">contact</Link>
      </PageLinks>
    </Wrapper>
  )
}
export default Header
