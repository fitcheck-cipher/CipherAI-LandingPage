'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(t)
  }, [])

  if (!mounted) return null

  const e = [0.22, 1, 0.36, 1] as const

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--bg)',
          }}
        >
          <motion.svg
            viewBox="6 8 68 56"
            width="88"
            height="88"
            style={{ overflow: 'visible' }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.2 },
              y: { delay: 1, duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {/* tip — fades in first */}
            <motion.polygon
              points="14,54 10,58 18,56"
              fill="var(--ink)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.3, ease: e }}
            />

            {/* body — draws from tip up to eye */}
            <motion.path
              d="M 14 54 L 46 14"
              stroke="var(--ink)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: e }}
            />

            {/* eye — traces itself */}
            <motion.ellipse
              cx="44" cy="16" rx="4.5" ry="2.5"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.5"
              transform="rotate(-52 44 16)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.35, ease: e }}
            />

            {/* thread — curls out last */}
            <motion.path
              d="M 46 12 Q 58 4 62 10 Q 66 16 60 20"
              fill="none"
              stroke="var(--camel)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.45, ease: e }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
