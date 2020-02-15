import React, { useEffect, useRef } from "react"
import * as PIXI from "pixi.js"
import PixiPlugin from "gsap/PixiPlugin"
import styled from "styled-components"

import { BulgePinchFilter } from "@pixi/filter-bulge-pinch"
import { useWindowContext } from "../context"

PixiPlugin.registerPIXI(PIXI)

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

const BulgeText = () => {
  const { loaded, setLoaded } = useWindowContext()

  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

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
    app.stage.interactive = true

    function resize() {
      text.position.set(50, app.renderer.screen.height / 2)
      setTextSize()
    }
    window.addEventListener("resize", resize)

    const container = new PIXI.Container()
    app.stage.addChild(container)

    const style = new PIXI.TextStyle({
      fontFamily: "Gilroy Bold",
      fontWeight: "bold",
      fill: "#fff",
      padding: 50,
      letterSpacing: 2,
    })

    function setTextSize() {
      const maxSize = 180
      const condition = window.innerWidth < 2000
      const responsiveSize = (8 * window.innerWidth) / 100
      style.fontSize = condition ? responsiveSize : maxSize
    }
    setTextSize()

    let text = new PIXI.Text("retronity is\ninspired by\n'80s theme.", style)
    text.anchor.set(0, 0.5)
    text.position.set(50, app.renderer.screen.height / 2)
    container.addChild(text)

    const bulgeFilter = new BulgePinchFilter()
    bulgeFilter.radius = 300
    bulgeFilter.strength = 0.3

    const minX = text.position.x / 2 - bulgeFilter.radius / 2
    const maxX = minX + text.width
    let minY = text.position.y / 2 - bulgeFilter.radius / 2
    let maxY = minY + text.height

    function onPointerMove(eventData) {
      bulgeFilter.center.x = (eventData.data.global.x - minX) / (maxX - minX)
      bulgeFilter.center.y = (eventData.data.global.y - minY) / (maxY - minY)
      container.filters = [bulgeFilter]
    }

    app.stage.on("mousemove", onPointerMove)

    setLoaded({ ...loaded, bulge: true })
  }, [])

  return (
    <CanvasWrapper ref={canvasWrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  )
}

export default BulgeText
