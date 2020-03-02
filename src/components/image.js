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
          fluid(maxWidth: 1200, maxHeight: 750) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sliderTwo: file(relativePath: { eq: "slider/chasing_dreams.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200, maxHeight: 750) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sliderThree: file(relativePath: { eq: "slider/fade_away.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200, maxHeight: 750) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sliderFour: file(relativePath: { eq: "slider/collage.png" }) {
        childImageSharp {
          fluid(maxWidth: 1200, maxHeight: 750) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const style = {
    width: "100%",
    height: "100%",
  }
  return [
    <Img fluid={data.sliderOne.childImageSharp.fluid} style={style} />,
    <Img fluid={data.sliderTwo.childImageSharp.fluid} style={style} />,
    <Img fluid={data.sliderThree.childImageSharp.fluid} style={style} />,
    <Img fluid={data.sliderFour.childImageSharp.fluid} style={style} />,
  ]
}
