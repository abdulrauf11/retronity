import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

export default function useImage() {
  const data = useStaticQuery(graphql`
    query {
      sliderOne: file(relativePath: { eq: "slider/ride_along.png" }) {
        childImageSharp {
          fluid(maxHeight: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sliderTwo: file(relativePath: { eq: "slider/chasing_dreams.png" }) {
        childImageSharp {
          fluid(maxHeight: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sliderThree: file(relativePath: { eq: "slider/fade_away.png" }) {
        childImageSharp {
          fluid(maxHeight: 800) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return {
    sliderOne: <Img fluid={data.sliderOne.childImageSharp.fluid} />,
    sliderTwo: <Img fluid={data.sliderOne.childImageSharp.fluid} />,
    sliderThree: <Img fluid={data.sliderOne.childImageSharp.fluid} />,
  }
}
