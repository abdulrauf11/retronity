import React, { useEffect, useRef, useState } from "react"
import * as PIXI from "pixi.js"
import { gsap } from "gsap"
import PixiPlugin from "gsap/PixiPlugin"
import styled from "styled-components"
import { useWindowContext } from "../context"

import mapImage from "../../images/swirly.png"

PixiPlugin.registerPIXI(PIXI)

const CanvasWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  canvas {
  }
`

const Slider = ({ currIndex, prevIndex, thumbnails }) => {
  const { loaded, setLoaded } = useWindowContext()

  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

  const [filter, setFilter] = useState(null)
  const [sprites, setSprites] = useState(null)

  function background(bgSize, inputSprite, type, forceSize) {
    var sprite = inputSprite
    var bgContainer = new PIXI.Container()
    var mask = new PIXI.Graphics()
      .beginFill(0x8bc5ff)
      .drawRect(0, 0, bgSize.x, bgSize.y)
      .endFill()
    bgContainer.mask = mask
    bgContainer.addChild(mask)
    bgContainer.addChild(sprite)
    function resize() {
      var sp = { x: sprite.width, y: sprite.height }
      if (forceSize) sp = forceSize
      var winratio = bgSize.x / bgSize.y
      var spratio = sp.x / sp.y
      var scale = 1
      var pos = new PIXI.Point(0, 0)
      if (type === "cover" ? winratio > spratio : winratio < spratio) {
        //photo is wider than background
        scale = bgSize.x / sp.x
        pos.y = -(sp.y * scale - bgSize.y) / 2
      } else {
        //photo is taller than background
        scale = bgSize.y / sp.y
        pos.x = -(sp.x * scale - bgSize.x) / 2
      }
      sprite.scale = new PIXI.Point(scale, scale)
      sprite.position = pos
    }
    resize()
    return {
      container: bgContainer,
      doResize: resize,
    }
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

    function resize() {
      const newWidth = canvasWrapperRef.current.clientWidth
      const newHeight = canvasWrapperRef.current.clientHeight
      app.renderer.resize(newWidth, newHeight)
      container.width = app.screen.width
      container.height = app.screen.height
    }
    window.addEventListener("resize", resize)

    let container = new PIXI.Container()
    app.stage.addChild(container)

    const displacementSprite = PIXI.Sprite.from(mapImage)
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    )
    displacementFilter.padding = 10
    container.addChild(displacementSprite)
    displacementFilter.scale.x = 0
    displacementFilter.scale.y = 0
    container.filters = [displacementFilter]

    setFilter(displacementFilter)

    const loader = new PIXI.Loader()
    loader
      .add("one", thumbnails[0])
      .add("two", thumbnails[1])
      .add("three", thumbnails[2])

    loader.load((_, resources) => {
      const allImages = [
        resources.one.data,
        resources.two.data,
        resources.three.data,
      ]
      const allSprites = allImages.map((image, index) => {
        const texture = PIXI.Texture.from(image)
        const sprite = new PIXI.Sprite(texture)
        const slide = background(
          { x: app.screen.width, y: app.screen.height },
          sprite,
          "cover"
        )
        container.addChild(slide.container)
        index && gsap.set(sprite, { alpha: 0 })
        return sprite
      })
      setSprites(allSprites)
    })

    setLoaded({ ...loaded, slider: true })
  }, [])

  useEffect(() => {
    if (!sprites || prevIndex < 0) return
    const baseTimeline = gsap.timeline({
      defaults: { duration: 0.5, ease: "sine" },
    })
    baseTimeline
      .to(filter.scale, { duration: 1, x: -500, y: 0 })
      .to(sprites[prevIndex], { duration: 1, alpha: 0 }, "<")
  }, [prevIndex, sprites, filter])

  useEffect(() => {
    if (!sprites) return
    const baseTimeline = gsap.timeline({
      defaults: { duration: 1.5, ease: "sine" },
    })
    baseTimeline
      .to(filter.scale, { duration: 1, x: 0, y: 0 })
      .to(sprites[currIndex], { duration: 1, alpha: 1 }, "<")
  }, [currIndex, sprites, filter])

  return (
    <CanvasWrapper ref={canvasWrapperRef}>
      <canvas ref={canvasRef}></canvas>
    </CanvasWrapper>
  )
}

export default Slider
