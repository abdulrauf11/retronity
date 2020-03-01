import React, { useEffect, useRef, useState } from "react"
import * as PIXI from "pixi.js"
import { gsap } from "gsap"
import PixiPlugin from "gsap/PixiPlugin"
import { RGBSplitFilter } from "@pixi/filter-rgb-split"
import styled from "styled-components"
import { useWindowContext } from "../context"
import Gilroy from "../../fonts/gilroy-extrabold.otf"

import sprite from "../../images/displacement_map.jpg"

PixiPlugin.registerPIXI(PIXI)

const CanvasWrapper = styled.div`
  width: 100%;
  height: 300px;
  canvas {
    width: 100%;
    height: 100%;
  }
`

const RgbText = ({ textContent }) => {
  const { isScrolling, setScrolling } = useWindowContext()

  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

  let [filters, setFilters] = useState({
    rgb: null,
    disp: null,
  })

  useEffect(() => {
    const loader = new PIXI.Loader()

    loader.add("font", Gilroy)

    const app = new PIXI.Application({
      view: canvasRef.current,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
      resizeTo: canvasWrapperRef.current,
      transparent: true,
    })
    app.renderer.plugins.interaction.autoPreventDefault = false
    app.renderer.view.style.touchAction = "auto"

    loader.load((_, resources) => {
      const style = new PIXI.TextStyle({
        fontFamily: "Gilroy Bold",
        fontSize: 80,
        fill: "#fff",
        lineHeight: 100,
        // wordWrap: true,
        // whiteSpace: "normal",
      })

      let text = new PIXI.Text(textContent, style)
      text.y = app.renderer.screen.height / 2
      text.anchor.y = 0.5

      let rgbFilter = new RGBSplitFilter()
      rgbFilter.red = { x: 0, y: 0 }
      rgbFilter.green = { x: 0, y: 0 }
      rgbFilter.blue = { x: 0, y: 0 }

      const displacementSprite = PIXI.Sprite.from(sprite)
      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
      displacementSprite.position = text.position
      app.stage.addChild(displacementSprite)
      const displacementFilter = new PIXI.filters.DisplacementFilter(
        displacementSprite
      )
      displacementFilter.scale.set(0, 0)

      text.filters = [rgbFilter, displacementFilter]
      app.stage.addChild(text)

      let updatedFilters = { rgb: rgbFilter, disp: displacementFilter }
      setFilters(filters => ({ ...filters, ...updatedFilters }))
    })
  }, [])

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1 } })
    if (!(filters.rgb && filters.disp)) return
    if (isScrolling) {
      timeline
        .to(filters.rgb.red, { x: 0, y: 4 }, 0)
        .to(filters.disp.scale, { x: 20, y: 20 }, 0)
        .to(filters.rgb.red, { x: 0, y: 0 }, 1)
        .to(filters.disp.scale, { x: 0, y: 0 }, 1)
        .add(() => setScrolling(false))
    }
  }, [isScrolling, setScrolling, filters])

  return (
    <CanvasWrapper ref={canvasWrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  )
}

export default RgbText
