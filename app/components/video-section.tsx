"use client"

import YouTube from "react-youtube"
import { useState } from "react"

export function VideoSection({videoId} : {videoId : string}) {
  const [isPlaying, setIsPlaying] = useState(false)

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  }

  const onReady = (event: any) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const onPlay = () => {
    setIsPlaying(true)
  }

  const onPause = () => {
    setIsPlaying(false)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="relative mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">

              <div className="aspect-video">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
