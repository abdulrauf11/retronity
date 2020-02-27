import React from "react"
import styled from "styled-components"
import device from "../device"
import ccLogo from "../../images/attribution-license.svg"

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  ${device.small`display: block;`}
  .container {
    margin-left: 2rem;
    ${device.small`margin-left: 0; text-align: center;`}
    h2 {
      text-transform: none;
      font-size: 2.4rem;
      font-family: "Gilroy Bold";
      margin: 1rem 0;
      ${device.small`font-size: 1.9rem;`}
    }
    p {
      width: 90%;
      max-width: 600px;
      ${device.small`width: 100%;`}
    }
  }
`

const Stamp = styled.div`
  img {
    display: block;
    width: 18vmax;
    max-width: 300px;
    min-width: 150px;
    ${device.small`margin: 0 auto;`}
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
