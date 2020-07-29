import React from "react"
import getVideoId from "get-video-id"

const Preview = ({ value }) => {
  function getEmbedCode(value) {
    const videoId = value && value.url ? getVideoId(value.url) : ""
    if (!videoId) {
      return <span />
    }

    switch (videoId.service) {
      case "youtube": {
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId.id}?rel=0`}
            frameBorder="0"
            allowFullScreen
            style={{ width: "100%" }}
          />
        )
      }
      case "vimeo": {
        return (
          <iframe
            src={`https://player.vimeo.com/video/${videoId.id}`}
            frameBorder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowFullScreen
            style={{ width: "100%" }}
          />
        )
      }
      default: {
        return <span>Unsupported video service: {videoId.service}</span>
      }
    }
  }

  return <div style={{ minHeight: "2em" }}>{getEmbedCode(value)}</div>
}

export default {
  title: "Video Url",
  name: "videoUrl",
  type: "object",
  fields: [
    {
      type: "url",
      name: "url",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: Preview,
  },
}
