import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import styled from "styled-components"
import device from "../device"


const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  overflow: hidden;
  font-size: 0;
  .headings {
    display: inline-block;
    .heading {
      display: inline;
      margin-right: 3rem;
      font-family: "Gilroy Bold", sans-serif;
      font-size: 8rem;
      ${device.small`font-size: 4rem;`}
    }
  }
`

const Ticker = () => {
  const headingsRef1 = useRef(null)
  const headingsRef2 = useRef(null)

  useEffect(() => {
    gsap.to([headingsRef1.current, headingsRef2.current], {
      duration: 50,
      x: -headingsRef1.current.offsetWidth,
      repeat: -1,
      ease: "none",
      // to improve jittery animation
      force3D: true,
      rotation: 0.01,
    })
  }, [])

  return (
    <Wrapper>
      <div className="headings" ref={headingsRef1}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <h1 className="heading" key={index}>
              free downloads
            </h1>
          ))}
      </div>
      <div className="headings" ref={headingsRef2}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <h1 className="heading" key={index}>
              free downloads
            </h1>
          ))}
      </div>
    </Wrapper>
  )
}

export default Ticker
