'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const dotX = useMotionValue(-200)
  const dotY = useMotionValue(-200)
  const ringSize = useMotionValue(36)

  const ringX = useSpring(mouseX, { stiffness: 90, damping: 20, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 90, damping: 20, mass: 0.6 })
  const size = useSpring(ringSize, { stiffness: 200, damping: 22 })

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    if (!isTouch) setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    const enter = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) {
        ringSize.set(64)
      }
    }
    const leave = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [role="button"]')) {
        ringSize.set(36)
      }
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <>
      {/* Ring that lags behind */}
      <motion.div
        className="fixed rounded-full pointer-events-none"
        style={{
          top: 0, left: 0,
          x: ringX, y: ringY,
          width: size, height: size,
          translateX: '-50%', translateY: '-50%',
          border: '1.5px solid var(--camel)',
          backgroundColor: 'transparent',
          zIndex: 9999,
          opacity: 0.75,
        }}
      />
      {/* Dot that follows instantly */}
      <motion.div
        className="fixed rounded-full pointer-events-none"
        style={{
          top: 0, left: 0,
          x: dotX, y: dotY,
          width: 4, height: 4,
          translateX: '-50%', translateY: '-50%',
          backgroundColor: 'var(--camel)',
          zIndex: 9999,
        }}
      />
    </>
  )
}
