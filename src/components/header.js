import React from "react"
import styled from "styled-components"
import device from "./device"
import Logo from "./logo"
import Sticky from "./sticky"
import MobileMenu from "./mobile-menu"
import FadeLink from "./transition-link"

const Wrapper = styled.header`
  width: calc(var(--spread) + 6rem);
  max-width: calc(var(--limit) + 10rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
  ${device.small`width: var(--spread); justify-content: space-between;`}
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
  return (
    <Wrapper>
      <Sticky>
        <Logo />
      </Sticky>
      <PageLinks>
        <FadeLink to="/visuals/" activeClassName="active">
          rad visuals
        </FadeLink>
        <FadeLink to="/faq/" activeClassName="active">
          wut da faq
        </FadeLink>
        <FadeLink to="/contact/" activeClassName="active">
          contact
        </FadeLink>
      </PageLinks>
      <MobileMenu />
    </Wrapper>
  )
}
export default Header
