import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import styled from "styled-components"
import device from "../device"

const Wrapper = styled.div`
  width: var(--spread);
  max-width: var(--limit);
  height: 250px;
  margin: 0 auto;
  position: relative;
  z-index: -1;
  ${device.small`height: 130px; width: 100%;`}
  ${device.large`height: 350px;`}

  .lines {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    .line {
      display: block;
      transform: scale(0);
      background: var(--purple);
    }
    &.horizontal {
      flex-direction: column;
      .line {
        width: 100%;
        height: 2px;
        ${device.small`height: 1px;`}
      }
    }
    &.vertical {
      top: 0;
      position: absolute;
      .line {
        width: 2px;
        height: 100%;
        ${device.small`width: 1px;`}
      }
    }
  }
`

const Checkers = () => {
  const hRef = useRef([])
  const vRef = useRef([])

  useEffect(() => {
    gsap.to(hRef.current, {
      duration: 1.5,
      scale: 1,
      delay: 0.5,
      stagger: { from: "center", amount: 1.5 / 6 },
      ease: "power2.out",
    })
    gsap.to(vRef.current, {
      duration: 1.5,
      scale: 1,
      delay: 0.5,
      stagger: { from: "center", amount: 1.5 / 20 },
      ease: "power2.out",
    })
  }, [])

  return (
    <Wrapper>
      <div className="horizontal lines">
        {Array(6)
          .fill(null)
          .map((_, i) => (
            <span
              className="line"
              key={i}
              ref={e => {
                hRef.current[i] = e
              }}
            />
          ))}
      </div>
      <div className="vertical lines">
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <span
              className="line"
              key={i}
              ref={e => {
                vRef.current[i] = e
              }}
            />
          ))}
      </div>
    </Wrapper>
  )
}

export default Checkers
