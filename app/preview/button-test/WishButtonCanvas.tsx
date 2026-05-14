'use client'

import { useEffect, useRef } from 'react'

export default function WishButtonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2))
    const width = 360
    const height = 86

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const plumes = [
      { baseX: width - 30, baseY: height + 2, size: 16, rise: 52, drift: 14, speed: 1.8, alpha: 1, blur: 0 },
      { baseX: width - 44, baseY: height + 6, size: 15, rise: 46, drift: 12, speed: 1.55, alpha: 0.92, blur: 0.5 },
      { baseX: width - 18, baseY: height + 10, size: 13, rise: 40, drift: 10, speed: 1.42, alpha: 0.82, blur: 1 },
      { baseX: width - 58, baseY: height + 12, size: 12, rise: 34, drift: 10, speed: 1.28, alpha: 0.68, blur: 1.5 },
      { baseX: width - 8, baseY: height + 14, size: 10, rise: 28, drift: 8, speed: 1.18, alpha: 0.55, blur: 2 },
    ]

    const drawRoundedRect = () => {
      const radius = 18
      ctx.beginPath()
      ctx.moveTo(radius, 0)
      ctx.lineTo(width - radius, 0)
      ctx.quadraticCurveTo(width, 0, width, radius)
      ctx.lineTo(width, height - radius)
      ctx.quadraticCurveTo(width, height, width - radius, height)
      ctx.lineTo(radius, height)
      ctx.quadraticCurveTo(0, height, 0, height - radius)
      ctx.lineTo(0, radius)
      ctx.quadraticCurveTo(0, 0, radius, 0)
      ctx.closePath()
    }

    const render = (t: number) => {
      const time = t * 0.001
      ctx.clearRect(0, 0, width, height)

      drawRoundedRect()
      ctx.save()
      ctx.clip()

      const bg = ctx.createLinearGradient(0, 0, 0, height)
      bg.addColorStop(0, 'rgba(40,40,40,0.95)')
      bg.addColorStop(0.18, 'rgba(12,12,12,0.98)')
      bg.addColorStop(1, 'rgba(0,0,0,1)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      const sideGlow = ctx.createRadialGradient(width - 30, height + 6, 0, width - 30, height + 6, 110)
      sideGlow.addColorStop(0, 'rgba(255,255,255,0.42)')
      sideGlow.addColorStop(0.14, 'rgba(245,245,245,0.18)')
      sideGlow.addColorStop(0.26, 'rgba(180,180,180,0.08)')
      sideGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = sideGlow
      ctx.fillRect(width - 180, -20, 220, 160)

      plumes.forEach((p, index) => {
        const phase = time * p.speed + index * 0.9
        const flicker = (Math.sin(phase * 4.2) + 1) * 0.5
        const snap = (Math.sin(phase * 8.5) + 1) * 0.5
        const x = p.baseX - flicker * p.drift + Math.sin(phase * 2.2) * 2
        const y = p.baseY - flicker * p.rise - snap * 8 + Math.cos(phase * 1.4) * 1.5
        const stretchX = p.size * (0.42 + flicker * 0.12)
        const stretchY = p.size * (2.1 + flicker * 1.8 + snap * 0.5)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(-0.42 + Math.sin(phase * 1.7) * 0.06)
        ctx.filter = `blur(${p.blur}px)`

        const g = ctx.createLinearGradient(0, -stretchY, 0, stretchY)
        g.addColorStop(0, `rgba(255,255,255,${0.98 * p.alpha})`)
        g.addColorStop(0.28, `rgba(248,248,248,${0.84 * p.alpha})`)
        g.addColorStop(0.58, `rgba(214,214,214,${0.32 * p.alpha})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g

        ctx.beginPath()
        ctx.moveTo(0, -stretchY)
        ctx.bezierCurveTo(stretchX * 0.34, -stretchY * 0.84, stretchX * 0.8, -stretchY * 0.08, stretchX * 0.4, stretchY * 0.62)
        ctx.bezierCurveTo(stretchX * 0.12, stretchY * 0.9, -stretchX * 0.1, stretchY * 0.94, -stretchX * 0.36, stretchY * 0.62)
        ctx.bezierCurveTo(-stretchX * 0.82, -stretchY * 0.08, -stretchX * 0.34, -stretchY * 0.84, 0, -stretchY)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      for (let i = 0; i < 5; i++) {
        const phase = (time * 0.62 + i * 0.19) % 1
        const smokeX = width - 18 - phase * 66 + Math.sin(time * 1.2 + i) * 4
        const smokeY = height - 10 - phase * 42 + Math.cos(time * 1.1 + i) * 3
        const smoke = ctx.createRadialGradient(smokeX, smokeY, 0, smokeX, smokeY, 24 + i * 4)
        smoke.addColorStop(0, 'rgba(255,255,255,0.08)')
        smoke.addColorStop(0.45, 'rgba(190,190,190,0.05)')
        smoke.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = smoke
        ctx.beginPath()
        ctx.arc(smokeX, smokeY, 22 + i * 3, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      const stroke = ctx.createLinearGradient(0, 0, width, height)
      stroke.addColorStop(0, 'rgba(255,255,255,0.95)')
      stroke.addColorStop(1, 'rgba(215,215,215,0.82)')
      ctx.strokeStyle = stroke
      ctx.lineWidth = 1.2
      drawRoundedRect()
      ctx.stroke()

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="wish-button-canvas-shell">
      <canvas ref={canvasRef} className="wish-button-canvas" aria-hidden="true" />
      <span className="wish-button-text wish-button-text-canvas">wish</span>
    </div>
  )
}
