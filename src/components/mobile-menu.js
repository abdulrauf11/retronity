import React, { useState, useEffect } from "react"
import FadeLink from "./transition-link"
import styled from "styled-components"
import device from "./device"
import { CSSTransition } from "react-transition-group"

const Wrapper = styled.div`
  display: none;
  ${device.small`display: block;`}

  .overlay-outer-enter {
    opacity: 0;
  }
  .overlay-outer-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .overlay-outer-exit {
    opacity: 1;
  }
  .overlay-outer-exit-active {
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
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  left: 0;
  overflow-y: scroll;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: var(--black);

  .overlay-inner {
    margin: 8rem 0;
  }

  .external-links {
    padding: 4rem 0;
  }
`

const PageLinks = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    margin: 1rem 0;
    display: block;
    font-size: 2.5rem;
    font-family: "Gilroy Bold";
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: var(--white);
    &.active {
      -webkit-text-stroke-color: var(--purple);
    }
  }
`

const SocialLinks = styled.div`
  font-size: 1.1rem;
  a {
    margin: 0 1rem;
  }
`

const Credits = styled.div`
  margin-top: 2rem;
  font-size: 1.1rem;
  a {
    color: var(--purple);
  }
`

const MobileMenu = () => {
  const [active, setActive] = useState(false)

  function toggleActive() {
    setActive(!active)
  }

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
    } else {
      document.body.style.overflow = "auto"
      document.body.style.position = "static"
    }
  }, [active])

  return (
    <Wrapper>
      <Hamburger onClick={toggleActive} aria-label="Toggle mobile menu">
        <div className={`bar ${active && "active"}`} />
        <div className={`bar ${active && "active"}`} />
      </Hamburger>
      <CSSTransition
        in={active}
        timeout={300}
        classNames="overlay-outer"
        unmountOnExit
      >
        <Overlay>
          <div className="overlay-inner">
            <PageLinks>
              <FadeLink to="/" activeClassName="active">
                home
              </FadeLink>
              <FadeLink to="/shop/" activeClassName="active">
                shop
              </FadeLink>
              <FadeLink to="/visuals/" activeClassName="active">
                free visuals
              </FadeLink>
              <FadeLink to="/faq/" activeClassName="active">
                wut da faq
              </FadeLink>
              <FadeLink to="/contact/" activeClassName="active">
                contact
              </FadeLink>
            </PageLinks>
            <div className="external-links">
              <SocialLinks>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.facebook.com/retronity"
                >
                  fb
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.instagram.com/toretronityandbeyond/"
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
          </div>
        </Overlay>
      </CSSTransition>
    </Wrapper>
  )
}
export default MobileMenu
