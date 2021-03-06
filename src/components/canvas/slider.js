import React, { useEffect, useRef, useState } from "react"
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
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

function check_webp_feature(feature, callback) {
  var kTestImages = {
    lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
    lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
    alpha:
      "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
    animation:
      "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA",
  }
  var img = new Image()
  img.onload = function() {
    var result = img.width > 0 && img.height > 0
    callback(result)
  }
  img.onerror = function() {
    callback(false)
  }
  img.src = "data:image/webp;base64," + kTestImages[feature]
}

const Slider = ({ currIndex, prevIndex, thumbnails, mapImage }) => {
  const canvasWrapperRef = useRef(null)
  const canvasRef = useRef(null)

  const [filter, setFilter] = useState(null)
  const [sprites, setSprites] = useState(null)

  useEffect(() => {
    let container = new PIXI.Container()
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

    check_webp_feature("lossy", result => {
      result
        ? thumbnails.map(obj => loader.add(obj.name, obj.urlWebp))
        : thumbnails.map(obj => loader.add(obj.name, obj.url))

      loader.load((_, resources) => {
        const allImages = Object.values(resources).map(res => res.data)
        const allSprites = allImages.map((image, index) => {
          const texture = PIXI.Texture.from(image)
          const sprite = new PIXI.Sprite(texture)
          sprite.width = canvasWrapperRef.current.clientWidth
          sprite.height = canvasWrapperRef.current.clientHeight
          container.addChild(sprite)
          index && gsap.set(sprite, { alpha: 0 })
          return sprite
        })
        setSprites(allSprites)
      })
    })

    const app = new PIXI.Application({
      width: canvasWrapperRef.current.clientWidth,
      height: canvasWrapperRef.current.clientHeight,
      view: canvasRef.current,
      resolution: 1.0,
      resizeTo: canvasWrapperRef.current,
    })
    app.renderer.plugins.interaction.autoPreventDefault = false
    app.renderer.view.style.touchAction = "auto"
    app.stage.addChild(container)

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
