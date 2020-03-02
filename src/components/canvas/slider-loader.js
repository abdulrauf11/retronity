import React, { useEffect, useState } from "react"
import { gsap } from "gsap"
import styled from "styled-components"
import useImage from "../image"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Slider = ({ currIndex, prevIndex }) => {
  const allSlides = useImage()
  //   useEffect(() => {
  //     if (prevIndex < 0) return
  //     const baseTimeline = gsap.timeline({
  //       defaults: { duration: 0.5, ease: "sine" },
  //     })
  //     baseTimeline.to(sprites[prevIndex], { duration: 1, alpha: 0 })
  //   }, [prevIndex, sprites])

  //   useEffect(() => {
  //     const baseTimeline = gsap.timeline({
  //       defaults: { duration: 1.5, ease: "sine" },
  //     })
  //     baseTimeline.to(sprites[currIndex], { duration: 1, alpha: 1 })
  //   }, [currIndex, sprites])
  return <Wrapper>{allSlides[currIndex]}</Wrapper>
}

export default Slider
