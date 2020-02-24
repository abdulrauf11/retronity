import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"

import device from "../components/device"
import Layout from "../components/layout"
import SEO from "../components/seo"

const VideoWrapper = styled.section`
  margin-top: 4rem;
  margin-bottom: 15rem;
  ${device.large`margin-bottom: 20rem;`}
  video {
    margin: 2rem 0;
    width: 100%;
  }

  .faq-link {
    text-align: center;
    margin-top: 10rem;
    a {
      font-size: 4rem;
      font-family: "Gilroy Bold", sans-serif;
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--white);
      ${device.large`font-size: 5rem;`}
      transition: all 0.3s;
      &:hover {
        -webkit-text-fill-color: transparent;
      }
    }
  }
`

const Details = styled.div`
  .name {
    font-family: "Gilroy Bold", sans-serif;
    font-size: 5rem;
    ${device.small`font-size: 3.5rem;`}
  }
  .details {
    margin: 1rem 0;
    max-width: 600px;
  }
`

const Buttons = styled.div`
  text-align: center;
  button,
  a {
    min-width: 140px;
    margin: 0 1rem;
    ${device.small`margin: 1rem auto; display: inline-block; width: 50%;`}
    &.download {
      font-size: 0.8rem;
      text-transform: uppercase;
      border: 1px solid var(--purple);
      padding: 0.6rem 2rem;
      background: var(--purple);
    }
  }
`

const VisualSingle = ({ data }) => {
  const {
    name,
    childContentfulVisualVideoJsonNode: video,
  } = data.contentfulVisual

  const splitUrl = video.secure_url.split("/")
  const randomNumber = splitUrl[splitUrl.length - 2]
  const slug = splitUrl[splitUrl.length - 1]
  const downloadLink = `https://res.cloudinary.com/tippydreamer/video/upload/fl_attachment:${name}/${randomNumber}/${slug}`

  return (
    <Layout>
      <SEO title={name} />
      <main>
        <VideoWrapper>
          <Details>
            <h1 className="name">{name}</h1>
            <p className="details">
              {video.width}X{video.height}
            </p>
          </Details>
          {/* <Video src={video.secure_url} /> */}
          <video src={video.secure_url} controls />
          <Buttons>
            <a className="download" href={downloadLink} download>
              Download
            </a>
            <button className="donate">Donate</button>
          </Buttons>

          <div className="faq-link">
            <Link to="/faq">how to use?</Link>
          </div>
        </VideoWrapper>
      </main>
    </Layout>
  )
}

export default VisualSingle

export const queryVisual = graphql`
  query($slug: String!) {
    contentfulVisual(slug: { eq: $slug }) {
      name
      order
      childContentfulVisualVideoJsonNode {
        secure_url
        width
        height
      }
    }
  }
`
