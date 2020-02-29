import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import device from "./device"
import { CSSTransition } from "react-transition-group"

const Wrapper = styled.div`
  display: none;
  ${device.small`display: block;`}
  .overlay-enter {
    opacity: 0;
  }
  .overlay-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .overlay-exit {
    opacity: 1;
  }
  .overlay-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`

const Hamburger = styled.button`
  position: relative;
  z-index: 101;
  padding: 0;
  border: 0;
  background: var(--white);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: transform 0.2s ease-out;
  &:active {
    transform: scale(0.9);
  }
  .bar {
    width: 1.25rem;
    height: 2px;
    background: var(--purple);
    backface-visibility: none;
    transition: all 0.3s ease-out;
    &.active {
      height: 1px;
    }
    &:last-child {
      margin-top: 0.3rem;
      &.active {
        margin-top: 0;
      }
    }
  }
`

const Overlay = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: var(--black);
  display: flex;
  flex-direction: column;
  text-align: center;
`

const PageLinks = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    margin: 0.5rem 0;
    display: block;
    font-size: 3.2rem;
    font-family: "Gilroy Bold";
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: var(--white);
    &.active {
      -webkit-text-stroke-color: var(--purple);
    }
  }
`

const SocialLinks = styled.div`
  font-size: 1.2rem;
  a {
    margin: 0 1rem;
  }
`

const Credits = styled.div`
  margin: 2rem 0 4rem 0;
  font-size: 1.2rem;
  a {
    color: var(--purple);
  }
`

const MobileMenu = () => {
  const [active, setActive] = useState(false)

  function toggleActive() {
    setActive(!active)
  }

  return (
    <Wrapper>
      <Hamburger onClick={toggleActive}>
        <div className={`bar ${active && "active"}`} />
        <div className={`bar ${active && "active"}`} />
      </Hamburger>
      <CSSTransition
        in={active}
        timeout={300}
        classNames="overlay"
        unmountOnExit
      >
        <Overlay>
          <PageLinks>
            <Link to="/" activeClassName="active">
              home
            </Link>
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
          <div className="external-links">
            <SocialLinks>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/"
              >
                fb
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/"
              >
                insta
              </a>
            </SocialLinks>
            <Credits>
              Website by{"  "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.rauftech.com/"
              >
                Rauf Tech
              </a>
            </Credits>
          </div>
        </Overlay>
      </CSSTransition>
    </Wrapper>
  )
}
export default MobileMenu
