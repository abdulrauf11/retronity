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
    width: 100%;
    height: 100%;
  }
`

const NoiseBg = () => {
  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      view: canvasRef.current,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
      transparent: true,
    })
    app.renderer.plugins.interaction.autoPreventDefault = false
    app.renderer.view.style.touchAction = "auto"

    function resize() {
      app.renderer.resize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", resize)

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
  }, [])

  return (
    <CanvasWrapper ref={canvasWrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  )
}

export default NoiseBg
