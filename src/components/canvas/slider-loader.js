import React from "react"
import styled from "styled-components"
import useImage from "../image"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Slider = ({ currIndex }) => {
  const allSlides = useImage()
  return <Wrapper>{allSlides[currIndex]}</Wrapper>
}

export default Slider
