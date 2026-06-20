'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  stagger?: number
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function SplitText({ text, className = '', style, delay = 0, stagger = 0.06 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-10px' })
  const words = text.split(' ')

  return (
    <span
      ref={ref}
      aria-label={text}
      role="text"
      className={className}
      style={{ display: 'block', ...style }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            marginRight: i < words.length - 1 ? '0.28em' : 0,
          }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '108%' }}
            animate={{ y: isInView ? '0%' : '108%' }}
            transition={
              isInView
                ? { delay: delay + i * stagger, duration: 0.72, ease: EASE_OUT }
                : { duration: 0 }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
