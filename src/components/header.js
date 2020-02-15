import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Sticky from "./sticky"
import device from "./device"

const Wrapper = styled.header`
  width: calc(var(--spread) + 6rem);
  max-width: calc(var(--limit) + 10rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
`

const Logo = styled.span`
  display: block;
  a {
    font-size: 2rem;
    font-family: "Gilroy Bold";
  }
`

const PageLinks = styled.div`
  padding-right: 3rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

const Header = () => (
  <Wrapper>
    <Sticky>
      <Logo>
        <Link to="/">retronity</Link>
      </Logo>
    </Sticky>
    <PageLinks>
      <Link to="/visuals">rad visuals</Link>
      <Link to="/faq">get the 411</Link>
      <Link to="/contact" className="bordered">
        contact
      </Link>
    </PageLinks>
  </Wrapper>
)

export default Header
