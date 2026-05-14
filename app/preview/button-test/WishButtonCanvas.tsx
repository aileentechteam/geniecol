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
      { baseX: width - 34, baseY: height - 2, size: 20, rise: 42, drift: 20, speed: 1.1, alpha: 0.95, blur: 0 },
      { baseX: width - 52, baseY: height + 2, size: 18, rise: 36, drift: 18, speed: 0.92, alpha: 0.82, blur: 1.5 },
      { baseX: width - 20, baseY: height + 6, size: 16, rise: 30, drift: 14, speed: 0.82, alpha: 0.72, blur: 2.5 },
      { baseX: width - 66, baseY: height + 8, size: 14, rise: 28, drift: 16, speed: 0.74, alpha: 0.58, blur: 4 },
      { baseX: width - 12, baseY: height + 10, size: 12, rise: 24, drift: 12, speed: 0.68, alpha: 0.5, blur: 5 },
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

      const sideGlow = ctx.createRadialGradient(width - 38, height - 4, 0, width - 38, height - 4, 140)
      sideGlow.addColorStop(0, 'rgba(255,255,255,0.55)')
      sideGlow.addColorStop(0.12, 'rgba(245,245,245,0.26)')
      sideGlow.addColorStop(0.28, 'rgba(180,180,180,0.12)')
      sideGlow.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = sideGlow
      ctx.fillRect(width - 180, -20, 220, 160)

      plumes.forEach((p, index) => {
        const phase = time * p.speed + index * 0.8
        const flicker = (Math.sin(phase * 2.2) + 1) * 0.5
        const x = p.baseX - flicker * p.drift + Math.sin(phase * 1.4) * 3
        const y = p.baseY - flicker * p.rise + Math.cos(phase * 1.1) * 2
        const stretchX = p.size * (0.62 + flicker * 0.18)
        const stretchY = p.size * (1.8 + flicker * 1.35)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(-0.62 + Math.sin(phase) * 0.08)
        ctx.filter = `blur(${p.blur}px)`

        const g = ctx.createRadialGradient(0, stretchY * 0.15, 0, 0, 0, stretchY)
        g.addColorStop(0, `rgba(255,255,255,${0.95 * p.alpha})`)
        g.addColorStop(0.22, `rgba(248,248,248,${0.75 * p.alpha})`)
        g.addColorStop(0.48, `rgba(215,215,215,${0.34 * p.alpha})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g

        ctx.beginPath()
        ctx.moveTo(0, -stretchY)
        ctx.bezierCurveTo(stretchX * 0.85, -stretchY * 0.62, stretchX * 0.95, stretchY * 0.1, 0, stretchY)
        ctx.bezierCurveTo(-stretchX * 0.92, stretchY * 0.14, -stretchX * 0.82, -stretchY * 0.6, 0, -stretchY)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      })

      for (let i = 0; i < 8; i++) {
        const phase = (time * 0.45 + i * 0.17) % 1
        const smokeX = width - 20 - phase * 85 + Math.sin(time + i) * 8
        const smokeY = height - 10 - phase * 52 + Math.cos(time * 0.9 + i) * 5
        const smoke = ctx.createRadialGradient(smokeX, smokeY, 0, smokeX, smokeY, 34 + i * 4)
        smoke.addColorStop(0, 'rgba(255,255,255,0.12)')
        smoke.addColorStop(0.4, 'rgba(190,190,190,0.08)')
        smoke.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = smoke
        ctx.beginPath()
        ctx.arc(smokeX, smokeY, 36 + i * 3, 0, Math.PI * 2)
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
