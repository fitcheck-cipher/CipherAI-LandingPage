'use client'
import Link from 'next/link'
import { Sun, Moon } from '@phosphor-icons/react'
import { useTheme } from '@/app/theme-context'
import MagneticElement from '@/components/MagneticElement'

export default function Navbar() {
  const { isDark, toggle } = useTheme()
  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{
        background: isDark ? 'rgba(20,18,16,0.78)' : 'rgba(249,248,246,0.78)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <svg viewBox="0 0 280 68" xmlns="http://www.w3.org/2000/svg" width="148" height="36">
            <line x1="14" y1="54" x2="46" y2="14" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
            <polygon points="14,54 10,58 18,56" fill="var(--ink)" />
            <ellipse cx="44" cy="16" rx="4.5" ry="2.5" fill="none" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-52 44 16)" />
            <path d="M 46 12 Q 58 4 62 10 Q 66 16 60 20" fill="none" stroke="var(--camel)" strokeWidth="1.5" strokeLinecap="round" />
            <g transform="translate(56,24)">
              <path d="M 0 -5 L 0.9 -0.9 L 5 0 L 0.9 0.9 L 0 5 L -0.9 0.9 L -5 0 L -0.9 -0.9 Z" fill="var(--camel)" />
            </g>
            <text x="76" y="40" fontFamily="Georgia, 'Times New Roman', serif" fontSize="26" fontWeight="300" fill="var(--ink)" letterSpacing="-0.5">
              Cipher<tspan fontStyle="italic" fill="var(--camel)">AI</tspan>
            </text>
          </svg>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-full border hover:opacity-80 transition-opacity"
            style={{
              borderColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.12)',
              color: isDark ? 'rgba(245,242,236,0.7)' : 'var(--ink-soft)',
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <MagneticElement>
            <Link href="#waitlist" className="pill text-sm" style={{ background: 'var(--camel)', color: '#fff' }}>
              Join Waitlist
            </Link>
          </MagneticElement>
        </div>
      </div>
    </header>
  )
}
