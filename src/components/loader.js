import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { gsap } from "gsap"

import device from "./device"
import Logo from "./logo"
import { useWindowContext } from "../components/context"

const Wrapper = styled.div`
  .overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    background-color: var(--black);
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.06;
      background-image: url(../images/gifnoise.gif);
    }
  }

  .outer-container {
    position: relative;
    width: var(--spread);
    max-width: var(--limit);
    height: 100%;
    margin: 0 auto;
  }

  .logo-wrapper {
    position: absolute;
    top: calc(50% - 3rem);
    left: 50%;
    transform: translate(-50%, -50%) scale(3);
    margin: 3rem 0;
    ${device.small`margin: 2rem 0; top: calc(50% - 2rem); transform: translate(-50%, -50%) scale(2);`}
    ${device.large`margin: 5rem 0; top: calc(50% - 5rem);`}
    }
  }
`

const Loader = () => {
  const { loaded } = useWindowContext()

  const [end, setEnd] = useState(false)

  useEffect(() => {
    setEnd(Object.values(loaded).every(val => val))
  }, [loaded])

  const overlayRef = useRef(null)
  const logoRef = useRef(null)
  useEffect(() => {
    const tl = gsap.timeline()
    end &&
      tl
        .to(logoRef.current, {
          delay: 1,
          duration: 1,
          top: 0,
          left: 0,
          x: "50%",
          y: "50%",
          scale: 1,
        })
        .to(overlayRef.current, {
          duration: 0.5,
          opacity: 0,
          delay: 0.5,
          zIndex: "-9999",
        })
  }, [end])

  return (
    <Wrapper>
      <div className="overlay" ref={overlayRef}>
        <div className="outer-container">
          <div className="logo-wrapper" ref={logoRef}>
            <Logo />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Loader
