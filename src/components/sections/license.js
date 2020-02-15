import React from "react"
import styled from "styled-components"
import device from "../device"
import ccLogo from "../../images/attribution-license.svg"

const Wrapper = styled.section`
  margin-top: 16rem;
  display: flex;
  align-items: center;
  width: 80%;
  ${device.large`margin-top: 20rem;`}
  .container {
    margin-left: 2rem;
    h2 {
      text-transform: none;
      font-size: 2.4rem;
      font-family: "Gilroy Bold";
      margin: 1rem 0;
    }
    p {
      width: 90%;
      max-width: 600px;
    }
  }
`

const Stamp = styled.div`
  img {
    display: block;
    width: 18vmax;
    max-width: 300px;
    min-width: 150px;
  }
`

const License = () => (
  <Wrapper>
    <Stamp>
      <img src={ccLogo} alt="Attribution License Logo" />
    </Stamp>
    <div className="container">
      <h2>attribution license (CC-BY)</h2>
      <p>
        All videos are released under the Creative Commons license and are
        available for both commercial and non-commercial work in ANY form as
        long as you give credit for the original creation.
      </p>
    </div>
  </Wrapper>
)

export default License
