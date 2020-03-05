import React from "react"
import styled from "styled-components"
import SubscribeForm from "./forms/subscribeForm"
import device from "./device"

const Wrapper = styled.footer`
  width: var(--spread);
  max-width: var(--limit);
  margin: 3rem auto;
  position: relative;
  font-size: 0.9rem;
  .container {
    display: flex;
  }
`

const SocialLinks = styled.div`
  flex: 1;
  height: 200px;
  position: relative;
  ${device.small`display: none;`}
  ${device.large`height: 300px;`}
  .vertical {
    position: absolute;
    left: 0;
    top: 0;
    transform: rotate(270deg) translate(-100%);
    transform-origin: 0 0;
  }
  a {
    position: relative;
    padding: 0.5rem;
    &:after {
      display: block;
      backface-visibility: none;
      left: 0;
      top: 50%;
      position: absolute;
      content: "";
      width: 100%;
      height: 2px;
      background: var(--purple);
      transform: scaleX(0);
      transform-origin: 0 0;
      transition: transform 0.35s ease-out;
    }
    &:hover:after {
      transform: scaleX(1);
    }
    &:first-child {
      margin-right: 1rem;
    }
  }
`

const End = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  ${device.small`flex-direction: column; margin-top: 4rem;`}
  div {
    margin: 1rem 0;
  }
  .credits a {
    color: var(--purple);
  }
`

const Footer = () => (
  <Wrapper>
    <div className="container">
      <SocialLinks>
        <div className="vertical">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/"
          >
            fb
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/"
          >
            insta
          </a>
        </div>
      </SocialLinks>
      <SubscribeForm />
    </div>
    <End>
      <div className="copyright">© Copyright {new Date().getFullYear()}</div>
      <div className="privacy-policy">Privacy Policy</div>
      <div className="credits">
        Website by{"  "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.rauftech.com/"
        >
          Rauf Tech
        </a>
      </div>
    </End>
  </Wrapper>
)

export default Footer
