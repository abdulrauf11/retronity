import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import device from "./device"
import { gsap } from "gsap"
import Sticky from "./sticky"
import MobileMenu from "./mobile-menu"

const Wrapper = styled.header`
  width: calc(var(--spread) + 6rem);
  max-width: calc(var(--limit) + 10rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
  ${device.small`width: var(--spread); justify-content: space-between;`}
`

const Logo = styled.span`
  display: block;
  position: relative;
  z-index: 101;
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

    position: relative;
    &:after {
      display: block;
      backface-visibility: none;
      left: -5%;
      top: 50%;
      position: absolute;
      content: "";
      width: 110%;
      height: 1px;
      background: var(--purple);
      transform: scaleX(0);
      transform-origin: 0 0;
      transition: transform 0.35s ease-out;
    }

    &:hover:after,
    &.active:after {
      transform: scaleX(1);
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
        <Link to="/visuals/" activeClassName="active">
          rad visuals
        </Link>
        <Link to="/faq/" activeClassName="active">
          wut da faq
        </Link>
        <Link to="/contact/" activeClassName="active">
          contact
        </Link>
      </PageLinks>
      <MobileMenu />
    </Wrapper>
  )
}
export default Header
