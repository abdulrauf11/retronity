import React, { useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  .player {
    margin: 2rem 0;
    // border: 5px solid rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    &:fullscreen {
      max-width: none;
      width: 100%;
    }
    &:-webkit-full-screen {
      max-width: none;
      width: 100%;
    }
    .player__video {
      width: 100%;
    }
  }

  .player__button {
    position: absolute;
    top: 20px;
    left: 20px;
    background: none;
    border: 0;
    line-height: 1;
    color: white;
    text-align: center;
    outline: 0;
    padding: 0;
    cursor: pointer;
    max-width: 50px;
    &:focus {
      border-color: var(--pink);
    }
  }

  .player__slider {
    width: 10px;
    height: 50px;
  }

  .player__controls {
    display: flex;
    position: absolute;
    bottom: 0;
    width: 100%;
    transform: translateY(100%) translateY(-5px);
    transition: all 0.3s;
    flex-wrap: wrap;
    background: rgba(0, 0, 0, 0.1);
    & > * {
      flex: 1;
    }
  }

  .progress {
    flex: 10;
    position: relative;
    display: flex;
    flex-basis: 100%;
    height: 5px;
    transition: height 0.3s;
    background: rgba(0, 0, 0, 0.5);
    cursor: ew-resize;
    .progress__filled {
      width: 50%;
      background: var(--pink);
      flex: 0;
      flex-basis: 0%;
    }
  }
`

const Video = ({ src }) => {
  const [mouseDown, setMouseDown] = useState(false)

  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const progressBarRef = useRef(null)
  const toggleRef = useRef(null)

  function togglePlay() {
    const method = videoRef.current.paused ? "play" : "pause"
    videoRef.current[method]()
  }

  function updateButton() {
    const icon = videoRef.current.paused ? "►" : "❚ ❚"
    toggleRef.current.textContent = icon
  }

  function handleProgress() {
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    progressBarRef.current.style.flexBasis = `${percent}%`
  }

  function scrub(e) {
    const scrubTime =
      (e.nativeEvent.offsetX / progressRef.current.offsetWidth) *
      videoRef.current.duration
    videoRef.current.currentTime = scrubTime
  }

  // function skip(e) {
  //   videoRef.current.currentTime += parseFloat(e.currentTarget.dataset.skip)
  // }

  // function handleRangeUpdate(e) {
  //   videoRef.current[e.currentTarget.name] = e.currentTarget.value
  // }

  return (
    <Wrapper>
      <div className="player">
        <button
          className="player__button toggle"
          title="Toggle Play"
          ref={toggleRef}
          onClick={togglePlay}
        >
          ►
        </button>

        <video
          className="player__video viewer"
          src={src}
          ref={videoRef}
          onClick={togglePlay}
          onPlay={updateButton}
          onPause={updateButton}
          onTimeUpdate={handleProgress}
        ></video>
        <div className="player__controls">
          <div
            className="progress"
            ref={progressRef}
            onClick={scrub}
            onMouseMove={e => mouseDown && scrub(e)}
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
          >
            <div className="progress__filled" ref={progressBarRef}></div>
          </div>
          {/* <input
            type="range"
            name="volume"
            className="player__slider"
            min="0"
            max="1"
            step="0.05"
            value="1"
            onChange={handleRangeUpdate}
            onMouseMove={handleRangeUpdate}
          />
          <input
            type="range"
            name="playbackRate"
            className="player__slider"
            min="0.5"
            max="2"
            step="0.1"
            value="1"
            onChange={handleRangeUpdate}
            onMouseMove={handleRangeUpdate}
          /> */}
          {/* <button data-skip="-10" className="player__button" onClick={skip}>
            « 10s
          </button>
          <button data-skip="25" className="player__button" onClick={skip}>
            25s »
          </button> */}
        </div>
      </div>
    </Wrapper>
  )
}

export default Video
