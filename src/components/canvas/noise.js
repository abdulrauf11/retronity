import React, { useEffect, useRef } from "react"
import * as PIXI from "pixi.js"
import { gsap } from "gsap"
import PixiPlugin from "gsap/PixiPlugin"
import styled from "styled-components"

PixiPlugin.registerPIXI(PIXI)
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(
  PIXI.settings.SPRITE_MAX_TEXTURES,
  16
)

const CanvasWrapper = styled.div`
  position: fixed;
  z-index: -999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  overflow: visible;
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const NoiseBg = () => {
  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const app = new PIXI.Application({
      width: canvasWrapperRef.current.clientWidth,
      height: canvasWrapperRef.current.clientHeight,
      view: canvasRef.current,
      resizeTo: canvasWrapperRef.current,
      resolution: 0.5,
    })
    app.renderer.plugins.interaction.autoPreventDefault = false
    app.renderer.view.style.touchAction = "auto"

    const container = new PIXI.Graphics()
      .beginFill(0x000000)
      .drawRect(0, 0, app.renderer.screen.width, app.renderer.screen.height)
    const noiseFilter = new PIXI.filters.NoiseFilter()
    noiseFilter.noise = 0.15
    noiseFilter.seed = 0

    container.filters = [noiseFilter]

    app.stage.addChild(container)

    gsap.to(noiseFilter, {
      duration: 5,
      seed: Math.random(),
      repeat: -1,
    })

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
    <>
      <CanvasWrapper ref={canvasWrapperRef}>
        <canvas ref={canvasRef}></canvas>
      </CanvasWrapper>
    </>
  )
}

export default NoiseBg
