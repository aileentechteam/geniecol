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

    const plumeCount = 18
    const particles = Array.from({ length: plumeCount }, (_, i) => ({
      seed: i * 0.37 + 1,
      offset: Math.random() * Math.PI * 2,
      size: 18 + Math.random() * 24,
      speed: 0.5 + Math.random() * 0.8,
      drift: 18 + Math.random() * 28,
      rise: 26 + Math.random() * 32,
      alpha: 0.15 + Math.random() * 0.24,
    }))

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

      particles.forEach((p, index) => {
        const cycle = (time * p.speed + p.offset) % 1
        const x = width - 28 - cycle * p.drift + Math.sin(time * 1.8 + p.seed) * 6
        const y = height - 4 - cycle * p.rise + Math.cos(time * 1.2 + p.seed) * 3
        const stretchX = p.size * (1.15 + cycle * 0.55)
        const stretchY = p.size * (1.8 + cycle * 1.1)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(-0.72 + Math.sin(time * 1.2 + index) * 0.08)
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, stretchY)
        g.addColorStop(0, `rgba(255,255,255,${0.78 * p.alpha + 0.12})`)
        g.addColorStop(0.28, `rgba(242,242,242,${0.55 * p.alpha + 0.08})`)
        g.addColorStop(0.5, `rgba(205,205,205,${0.24 * p.alpha + 0.04})`)
        g.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.ellipse(0, 0, stretchX * 0.55, stretchY, 0, 0, Math.PI * 2)
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
