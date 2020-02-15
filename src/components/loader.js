import React from "react"
import styled from "styled-components"

const Wrapper = styled.footer`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background-color: var(--black);
`

const Loader = () => <Wrapper>LOADER</Wrapper>

export default Loader
