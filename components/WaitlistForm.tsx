'use client'

import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'

const ROLES = [
  'Fashion Enthusiast',
  'Student',
  'Working Professional',
  'Stylist / Fashion Consultant',
  'Content Creator / Blogger',
  'Parent dressing for real life',
  'Other',
]

const CHALLENGES = [
  "Clothes never fit my body right",
  "No idea what to wear for occasions",
  "My wardrobe is full but feels empty",
  "Online shopping is a gamble on fit",
  "I spend too much and wear too little",
  "I don't know what suits my body type",
  "Something else",
]

const HEARD_FROM = [
  'Social media',
  'Friend or family',
  'Search engine',
  'University / TAMU',
  'News article or blog',
  'Other',
]

function Dropdown({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        className="dropdown-btn"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '8px',
          border: `1px solid ${open ? 'var(--camel)' : 'var(--border)'}`,
          backgroundColor: 'var(--surface)',
          color: value ? 'var(--ink)' : 'var(--ink-soft)',
          fontSize: '14px',
          fontFamily: 'Poppins, sans-serif',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          transition: 'border-color 0.2s',
        }}
      >
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value || placeholder}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            flexShrink: 0,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M2 4l4 4 4-4" stroke="var(--ink-soft)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            overflow: 'hidden',
          }}
        >
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              className="dropdown-option"
              onClick={() => { onChange(opt); setOpen(false) }}
              style={{
                width: '100%',
                padding: '10px 16px',
                backgroundColor: value === opt ? 'var(--surface-2)' : 'transparent',
                color: value === opt ? 'var(--camel)' : 'var(--ink)',
                fontSize: '14px',
                fontFamily: 'Poppins, sans-serif',
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
                display: 'block',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={e => {
                if (value !== opt) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--surface-2)'
              }}
              onMouseLeave={e => {
                if (value !== opt) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface FormData {
  name: string
  email: string
  role: string
  challenge: string
  heard_from: string
  message: string
}

export function WaitlistForm({ prefillEmail = '' }: { prefillEmail?: string }) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: prefillEmail,
    role: '',
    challenge: '',
    heard_from: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const set = (key: keyof FormData) => (val: string) =>
    setFormData(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim()) return
    setStatus('loading')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          role: formData.role || 'Not specified',
          challenge: formData.challenge || 'Not specified',
          heard_from: formData.heard_from || 'Not specified',
          message: formData.message.trim() || '—',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or email us at fitcheck.cipher@gmail.com')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--surface)',
    color: 'var(--ink)',
    fontSize: '14px',
    fontFamily: 'Poppins, sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--ink-soft)',
    marginBottom: '6px',
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%',
          backgroundColor: 'rgba(169,124,80,0.15)',
          border: '1px solid var(--camel)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="var(--camel)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
          fontWeight: 400, color: 'var(--ink)', marginBottom: 12, letterSpacing: '-0.02em',
        }}>
          You&apos;re on the list.
        </h3>
        <p style={{ color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.6 }}>
          We&apos;ll reach out to {formData.email} when Cipher is ready.<br />
          Thank you for believing in this early.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>Full Name *</label>
          <input
            name="name" type="text" required placeholder="Your name"
            value={formData.name} onChange={handleChange} style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--camel)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>
        <div>
          <label style={labelStyle}>Email Address *</label>
          <input
            name="email" type="email" required placeholder="you@example.com"
            value={formData.email} onChange={handleChange} style={inputStyle}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--camel)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>I would describe myself as</label>
        <Dropdown options={ROLES} value={formData.role} onChange={set('role')} placeholder="Select one" />
      </div>

      <div>
        <label style={labelStyle}>My biggest styling challenge is</label>
        <Dropdown options={CHALLENGES} value={formData.challenge} onChange={set('challenge')} placeholder="Select one" />
      </div>

      <div>
        <label style={labelStyle}>How did you hear about Cipher?</label>
        <Dropdown options={HEARD_FROM} value={formData.heard_from} onChange={set('heard_from')} placeholder="Select one" />
      </div>

      <div>
        <label style={labelStyle}>Anything else you want us to know? (optional)</label>
        <textarea
          name="message" rows={3}
          placeholder="Your biggest style frustration, a dream feature, or just say hi..."
          value={formData.message} onChange={handleChange}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 80 }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--camel)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
        />
      </div>

      {status === 'error' && (
        <p style={{ fontSize: 13, color: '#C0392B' }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '14px 32px', borderRadius: 999,
          backgroundColor: 'var(--camel)', color: '#FAF8F5',
          fontSize: 14, fontWeight: 500, fontFamily: 'Poppins, sans-serif',
          border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
          transition: 'background-color 0.2s, opacity 0.2s',
          letterSpacing: '0.02em', alignSelf: 'flex-start',
        }}
        onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--camel-deep)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--camel)' }}
      >
        {status === 'loading' ? 'Sending...' : 'Request Early Access'}
      </button>

      <p style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: -4 }}>
        No spam. No noise. Just a heads-up when Cipher is ready for you.
      </p>
    </form>
  )
}
