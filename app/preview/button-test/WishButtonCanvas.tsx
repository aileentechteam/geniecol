'use client'

export default function WishButtonCanvas() {
  return (
    <div className="wish-button-canvas-shell">
      <video
        className="wish-button-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/assets/button-flame-loop.webm" type="video/webm" />
        <source src="/assets/button-flame-loop.mp4" type="video/mp4" />
      </video>
      <div className="wish-button-video-grade" aria-hidden="true" />
      <span className="wish-button-text wish-button-text-canvas">wish</span>
    </div>
  )
}
