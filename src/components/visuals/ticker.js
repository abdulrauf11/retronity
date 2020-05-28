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
  .list {
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

const Ticker = ({ text }) => {
  const containerRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current.cloneNode(true)
    containerRef.current.appendChild(list)
    gsap.to(containerRef.current.children, {
      duration: 30,
      x: -list.offsetWidth,
      repeat: -1,
      ease: "linear",
      force3D: true,
      rotation: 0.01,
    })
  }, [])

  return (
    <Wrapper ref={containerRef}>
      <div className="list" ref={listRef}>
        <h1 className="heading">{text}</h1>
        <h1 className="heading">{text}</h1>
        <h1 className="heading">{text}</h1>
      </div>
    </Wrapper>
  )
}

export default Ticker
