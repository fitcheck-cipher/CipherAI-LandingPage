'use client'
import Link from 'next/link'
import { Sparkle, Sun, Moon } from '@phosphor-icons/react'
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
        <Link href="/" className="flex items-center gap-2">
          <Sparkle weight="fill" className="text-[var(--camel)]" size={22} />
          <span className="font-serif text-2xl tracking-tight" style={{ color: isDark ? '#fff' : 'var(--ink)' }}>
            Cipher<span className="italic text-[var(--camel)]">AI</span>
          </span>
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
