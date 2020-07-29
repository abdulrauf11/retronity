import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import * as PIXI from "pixi.js"
import { gsap } from "gsap"
import PixiPlugin from "gsap/PixiPlugin"
import { useStaticQuery, graphql } from "gatsby"

import { GlitchFilter } from "@pixi/filter-glitch"
import { RGBSplitFilter } from "@pixi/filter-rgb-split"

PixiPlugin.registerPIXI(PIXI)
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
  PIXI.settings.SPRITE_MAX_TEXTURES,
  16
)

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const Mirage = () => {
  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

  const imgData = useStaticQuery(graphql`
    query {
      sun: file(relativePath: { eq: "hero/sun.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      car: file(relativePath: { eq: "hero/car.png" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      map: file(relativePath: { eq: "displacement_map.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  let allImages = [
    imgData.sun.childImageSharp.fluid,
    imgData.car.childImageSharp.fluid,
    imgData.map.childImageSharp.fluid,
  ]
  const sunImage = allImages[0].src
  const carImage = allImages[1].src
  const mapImage = allImages[2].src

  function randomIntFromInterval(min, max) {
    return Math.random() * (max - min + 1) + min
  }

  useEffect(() => {
    const app = new PIXI.Application({
      width: canvasWrapperRef.current.clientWidth,
      height: canvasWrapperRef.current.clientHeight,
      view: canvasRef.current,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
      resizeTo: canvasWrapperRef.current,
      transparent: true,
    })
    app.renderer.plugins.interaction.autoPreventDefault = false
    app.renderer.view.style.touchAction = "auto"

    let container = new PIXI.Container()
    app.stage.addChild(container)

    const sunTexture = PIXI.Texture.from(sunImage)
    const sun = new PIXI.Sprite(sunTexture)
    sun.x = 0
    sun.y = 0
    sun.width = app.screen.width * 0.92
    sun.height = app.screen.height * 0.92
    container.addChild(sun)

    const displacementSprite = PIXI.Sprite.from(mapImage)
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    )
    displacementFilter.padding = 20
    displacementSprite.position = sun.position
    container.addChild(displacementSprite)
    sun.filters = [displacementFilter]
    displacementFilter.scale.x = 50
    displacementFilter.scale.y = 0

    const carTexture = PIXI.Texture.from(carImage)
    const car = new PIXI.Sprite(carTexture)
    car.anchor.set(1)
    car.x = app.screen.width
    car.y = app.screen.height
    car.width = app.screen.width
    car.height = app.screen.height / 2
    container.addChild(car)

    const rgbFilter = new RGBSplitFilter()
    const glitchFilter = new GlitchFilter()
    car.filters = [rgbFilter, glitchFilter]
    // reset rgb
    rgbFilter.red = { x: 0, y: 0 }
    rgbFilter.green = { x: 0, y: 0 }
    rgbFilter.blue = { x: 0, y: 0 }
    // reset glitch
    glitchFilter.slices = 0
    glitchFilter.offset = 20

    function displacementAnimation() {
      gsap.to(displacementSprite, {
        duration: 5,
        x: 512, // displacementSprite.width
        repeat: -1,
        ease: "none",
      })
    }

    function glitchAnimation() {
      const tl = gsap.timeline({
        delay: randomIntFromInterval(0, 3),
        onComplete: glitchAnimation,
      })

      tl.to(rgbFilter.red, {
        duration: 0.2,
        x: randomIntFromInterval(-15, 15),
        y: randomIntFromInterval(-15, 15),
      })

      tl.to(rgbFilter.red, {
        duration: 0.01,
        x: 0,
        y: 0,
      })

      tl.to(
        rgbFilter.blue,
        {
          duration: 0.2,
          x: randomIntFromInterval(-15, 15),
          y: 0,
          onComplete() {
            glitchFilter.slices = 20
            glitchFilter.direction = randomIntFromInterval(-75, 75)
          },
        },
        "-=0.2"
      )

      tl.to(rgbFilter.blue, {
        duration: 0.1,
        x: randomIntFromInterval(-15, 15),
        y: randomIntFromInterval(-5, 5),
        onComplete() {
          glitchFilter.slices = 12
          glitchFilter.direction = randomIntFromInterval(-75, 75)
        },
      })

      tl.to(rgbFilter.blue, {
        duration: 0.01,
        x: 0,
        y: 0,
        onComplete() {
          glitchFilter.slices = 0
          glitchFilter.direction = 0
        },
      })

      tl.to(
        rgbFilter.green,
        {
          duration: 0.2,
          x: randomIntFromInterval(-15, 15),
          y: 0,
        },
        "-=0.2"
      )

      tl.to(rgbFilter.green, {
        duration: 0.1,
        x: randomIntFromInterval(-20, 20),
        y: randomIntFromInterval(-15, 15),
      })

      tl.to(rgbFilter.green, {
        duration: 0.01,
        x: 0,
        y: 0,
      })
    }

    displacementAnimation()
    glitchAnimation()

    function resize() {
      const newWidth = canvasWrapperRef.current.clientWidth
      const newHeight = canvasWrapperRef.current.clientHeight
      app.renderer.resize(newWidth, newHeight)
      container.width = app.screen.width
      container.height = app.screen.height
    }
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <CanvasWrapper ref={canvasWrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  )
}

export default Mirage
