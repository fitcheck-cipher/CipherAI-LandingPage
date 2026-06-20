'use client'

import { useRef, useState } from 'react'
import { motion, useTransform, useSpring, useMotionValue, useScroll } from 'framer-motion'
import { ArrowRight, TShirt, Robot, Ruler, CheckCircle } from '@phosphor-icons/react'
import Link from 'next/link'
import { useTheme } from './theme-context'
import SplitText from '@/components/SplitText'
import MagneticElement from '@/components/MagneticElement'

function TiltCard({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), { stiffness: 260, damping: 24 })
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), { stiffness: 260, damping: 24 })
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - r.left) / r.width - 0.5)
    rawY.set((e.clientY - r.top) / r.height - 0.5)
  }
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0) }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const HERO_CARDS = [
  { img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&q=85', title: 'Evening Edit', note: 'Generated for tonight' },
  { img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&q=85', title: 'Weekend Casual', note: 'From your wardrobe' },
  { img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=85', title: 'Work Ready', note: 'Cipher pick' },
]

const MARQUEE = [
  'No fashion-speak', 'No size-chart math', 'No guessing',
  'Your style, decoded', 'Built for every body', 'Zero textile waste',
]

const GRID_IMGS = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=85',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=85',
]

const FEATURES = [
  {
    num: '01',
    Icon: TShirt,
    title: 'Scan your\nwardrobe.',
    body: 'Upload what you own. Cipher catalogs every piece — fabric, color, occasion fit — and surfaces the right things at the right time. Nothing forgotten.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85',
  },
  {
    num: '02',
    Icon: Ruler,
    title: 'Know your\nsize. Always.',
    body: 'One body scan via your phone camera. MediaPipe maps your proportions. Every outfit recommendation is filtered to what will actually fit — goodbye, 3 sizes ordered, 2 returned.',
    img: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=85',
  },
  {
    num: '03',
    Icon: Robot,
    title: 'AI builds\nthe outfit.',
    body: 'Tell us the occasion. Our model assembles looks from your own wardrobe or shop-ready picks, scored for your body, your budget. No stylist required.',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85',
  },
]

const TEAM = [
  { name: 'Aria Patel', role: 'Founder & CEO', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80', bio: 'Former fashion editor turned ML engineer. Built Cipher to democratize personal styling.' },
  { name: 'Jordan Lee', role: 'Head of AI', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80', bio: 'PhD in computer vision. Designed the outfit scoring model and body measurement pipeline.' },
  { name: 'Mia Chen', role: 'Lead Designer', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80', bio: 'Crafted the Luxury Editorial design system. Obsessed with typography and motion.' },
  { name: 'Sam Rivera', role: 'Engineering Lead', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80', bio: 'Full-stack architect behind the wardrobe and outfit generation pipeline.' },
]

function ParallaxFeature({ num, Icon, title, body, img, index, isDark }: {
  num: string; Icon: React.ElementType; title: string; body: string; img: string; index: number; isDark: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.08, 1, 1.04])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -4])
  const bgRgb = isDark ? '20,18,16' : '249,248,246'

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: 'var(--bg)', minHeight: '88vh' }}>
      <motion.div
        className="absolute inset-0"
        style={{
          left: index % 2 === 0 ? '42%' : undefined,
          right: index % 2 === 1 ? '42%' : undefined,
        }}
      >
        <motion.img
          src={img}
          alt={title}
          className="w-full h-full object-cover object-top"
          style={{ y: imageY, scale: imageScale }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: index % 2 === 0
              ? `linear-gradient(to right, rgb(${bgRgb}) 0%, rgba(${bgRgb},0.88) 38%, rgba(${bgRgb},0.2) 80%, transparent 100%)`
              : `linear-gradient(to left, rgb(${bgRgb}) 0%, rgba(${bgRgb},0.88) 38%, rgba(${bgRgb},0.2) 80%, transparent 100%)`,
          }}
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-14 py-28 flex items-center" style={{ minHeight: '88vh', perspective: 900 }}>
        <motion.div
          style={{ y: textY, rotateX }}
          className={`max-w-[460px]${index % 2 === 1 ? ' ml-auto' : ''}`}
        >
          <motion.span
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="editorial-headline leading-none select-none block -mb-3"
            style={{ fontSize: 'clamp(5rem,9vw,7rem)', color: 'var(--border)' }}
          >
            {num}
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
            style={{ background: 'var(--surface-2)' }}
          >
            <Icon size={18} className="text-[var(--camel)]" />
          </motion.div>
          <h2
            className="editorial-headline text-[var(--ink)] leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.6rem,5vw,4rem)' }}
          >
            {title.split('\n').map((line, li) => (
              <SplitText key={li} text={line} delay={0.1 + li * 0.18} stagger={0.05} />
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[1.05rem] leading-relaxed mb-8 text-[var(--ink-soft)]"
          >
            {body}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            <MagneticElement>
              <Link href="#waitlist" className="pill inline-flex" style={{ background: 'var(--camel)', color: '#fff' }}>
                Try it free <ArrowRight size={15} />
              </Link>
            </MagneticElement>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const ease = [0.22, 1, 0.36, 1] as const

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const { isDark } = useTheme()
  const { scrollY } = useScroll()
  const heroCardY = useTransform(scrollY, [0, 700], [0, -110])
  const heroTextY = useTransform(scrollY, [0, 700], [0, -55])

  const accentBg = isDark ? '#141210' : 'var(--surface-2)'
  const accentText = isDark ? '#F5F2EC' : 'var(--ink)'
  const accentMuted = isDark ? 'rgba(245,242,236,0.45)' : 'var(--ink-soft)'
  const accentBorder = isDark ? 'rgba(255,255,255,0.09)' : 'var(--border)'

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { user_email: email, signup_time: new Date().toISOString() },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="overflow-x-hidden bg-[var(--bg)]">

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden flex flex-col lg:flex-row bg-[var(--bg)]">
        <motion.div style={{ y: heroTextY }} className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 pb-28 lg:pt-10 lg:pb-10 relative z-10">
          <div>
            <SplitText
              text="Dress for your"
              className="editorial-headline text-[clamp(3.8rem,8vw,6.5rem)] leading-[1] tracking-[-0.03em] text-[var(--ink)]"
              delay={0.1}
              stagger={0.06}
            />
            <SplitText
              text="actual life."
              className="editorial-headline text-[clamp(3.8rem,8vw,6.5rem)] leading-[1] tracking-[-0.03em] italic-serif text-[var(--camel)]"
              delay={0.32}
              stagger={0.07}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.6 }}
            className="text-[var(--ink-soft)] text-[1.05rem] leading-relaxed max-w-[440px] mt-7 mb-9"
          >
            Cipher learns your shape, your wardrobe, your budget — and decodes your style.
            No fashion-speak. No size-chart math. No guessing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.68, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticElement>
              <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>
                Get started
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <ArrowRight size={16} />
                </motion.span>
              </Link>
            </MagneticElement>
            <MagneticElement>
              <a href="#features" className="pill pill-ghost">See how it works</a>
            </MagneticElement>
          </motion.div>
        </motion.div>

        {/* Right: editorial column grid */}
        <motion.div style={{ y: heroCardY }} className="hidden lg:flex lg:w-[48%] items-end justify-center relative overflow-hidden py-16 pr-8">
          <div className="flex gap-3 items-end">
            {[
              { ...HERO_CARDS[0], h: 380, mt: 60 },
              { ...HERO_CARDS[1], h: 500, mt: 0 },
              { ...HERO_CARDS[2], h: 360, mt: 80 },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.14, duration: 0.85, ease }}
                className="relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ width: 168, height: card.h, marginTop: card.mt, flexShrink: 0 }}
                whileHover="hovered"
              >
                <motion.img
                  src={card.img} alt={card.title}
                  className="w-full h-full object-cover object-top"
                  variants={{ hovered: { scale: 1.06 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  variants={{ default: { opacity: 0, y: 14 }, hovered: { opacity: 1, y: 0 } }}
                  initial="default"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="poppins-semibold text-white text-xs">{card.title}</p>
                  <p className="text-white/60 text-[10px] italic-serif mt-0.5">{card.note}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-[var(--border)] bg-[var(--surface)] py-4 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex items-center whitespace-nowrap"
          style={{ width: 'max-content' }}
        >
          {[...Array(2)].flatMap((_, j) =>
            MARQUEE.map(item => (
              <span key={`${j}-${item}`} className="inline-flex items-center gap-6 mx-6">
                <span className="editorial-headline text-xl text-[var(--ink-soft)]">{item}</span>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--camel)]" />
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ── MANIFESTO ── */}
      <section className="px-6 sm:px-10 md:px-14 py-24 lg:py-32 overflow-hidden" style={{ background: accentBg }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 18, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 1, ease }}
                style={{ perspective: 600, transformOrigin: 'bottom left' }}
              >
                <span className="editorial-headline text-[clamp(5rem,12vw,9rem)] leading-none text-[var(--camel)] block">92M</span>
                <p className="poppins-light text-sm uppercase tracking-widest mt-2 mb-8" style={{ color: accentMuted }}>tonnes of textile waste per year</p>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.6, ease }}
                className="text-2xl md:text-3xl leading-snug poppins-light" style={{ color: accentText }}
              >
                Most of it from clothes that were returned, never worn, or never fit.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: 0.28, duration: 0.6, ease }}
                className="text-base leading-relaxed mt-5" style={{ color: accentMuted }}
              >
                We didn&apos;t set out to solve a sustainability problem. We set out to solve fit.
                The sustainability is a side effect.
              </motion.p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                ['Enter once.', 'Your measurements, stored and applied everywhere. Never measure again.'],
                ['Shop anywhere.', 'Any site, any store, any app — Cipher adapts to you using the profile it already knows.'],
                ['Data stays yours.', 'On your device. Encrypted. We never sell it. A good cipher locks tight.'],
              ].map(([title, body], i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6, ease }}
                  className="pt-5" style={{ borderTop: `1px solid ${accentBorder}` }}
                >
                  <p className="poppins-semibold mb-1" style={{ color: accentText }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: accentMuted }}>{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL GRID ── */}
      <section style={{ background: accentBg }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ height: '90vh' }}>
          {GRID_IMGS.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1.08 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.85, ease }}
              className="overflow-hidden relative group"
              style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : undefined }}
            >
              <img src={src} alt="" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 transition-colors duration-700" style={{ background: 'rgba(0,0,0,0.22)' }} />
            </motion.div>
          ))}
        </div>
        <div className="px-6 sm:px-10 md:px-14 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5" style={{ background: accentBg, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <p className="italic-serif text-[var(--camel)] text-sm mb-1">Your style, decoded.</p>
            <p className="editorial-headline text-3xl md:text-4xl" style={{ color: accentText }}>Every look, powered by AI.</p>
          </div>
          <MagneticElement>
            <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>
              Start for free <ArrowRight size={15} />
            </Link>
          </MagneticElement>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <div id="features">
        {FEATURES.map(({ num, Icon, title, body, img }, i) => (
          <ParallaxFeature key={num} num={num} Icon={Icon} title={title} body={body} img={img} index={i} isDark={isDark} />
        ))}
      </div>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="px-6 sm:px-10 md:px-14 py-28 lg:py-36 relative overflow-hidden" style={{ background: accentBg }}>
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[700px] h-[700px] rounded-full blur-3xl" style={{ background: 'var(--camel)' }} />
        </motion.div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease }}
            className="chip mb-6 inline-flex" style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'var(--surface)', color: accentMuted, borderColor: accentBorder }}
          >
            Early access
          </motion.span>

          <div>
            <SplitText
              text="Be first to unlock"
              className="editorial-headline leading-[1.06]"
              style={{ fontSize: 'clamp(2.6rem,5.5vw,4rem)', color: accentText }}
              delay={0.1}
              stagger={0.055}
            />
            <SplitText
              text="your style."
              className="editorial-headline leading-[1.06] italic-serif"
              style={{ fontSize: 'clamp(2.6rem,5.5vw,4rem)', color: 'var(--camel)' }}
              delay={0.42}
              stagger={0.07}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-5 mb-8 text-[0.95rem] leading-relaxed" style={{ color: accentMuted }}
          >
            Your style was never missing. Just hidden. Join the waitlist and be the first to crack it.
          </motion.p>

          {status === 'done' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-3" style={{ color: accentText }}
            >
              <CheckCircle size={22} className="text-[var(--camel)]" weight="fill" />
              <span className="poppins-medium">You&apos;re on the list. We&apos;ll be in touch.</span>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.5 }}
              onSubmit={handleWaitlist}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3 rounded-full text-sm poppins-regular outline-none"
                style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'var(--surface)', border: `1px solid ${accentBorder}`, color: accentText }}
              />
              <MagneticElement>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="pill flex-shrink-0"
                  style={{ background: 'var(--camel)', color: '#fff', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? 'Sending…' : 'Join waitlist'}
                </button>
              </MagneticElement>
            </motion.form>
          )}
          {status === 'error' && (
            <p className="mt-3 text-xs" style={{ color: 'var(--accent-rose)' }}>Something went wrong. Try again.</p>
          )}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24 lg:py-32 px-6 sm:px-10 md:px-14 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <SplitText
              text="Built by people who"
              className="editorial-headline leading-[1.05] text-[var(--ink)]"
              style={{ fontSize: 'clamp(2.4rem,4.5vw,3.5rem)' }}
              delay={0.05}
              stagger={0.05}
            />
            <SplitText
              text="love fashion & code."
              className="editorial-headline leading-[1.05] italic-serif text-[var(--camel)]"
              style={{ fontSize: 'clamp(2.4rem,4.5vw,3.5rem)' }}
              delay={0.35}
              stagger={0.05}
            />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--border)' }}>
            {TEAM.map(({ name, role, img, bio }, i) => (
              <TiltCard key={name} className="group cursor-default overflow-hidden" style={{ background: 'var(--surface)' }}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  style={{ transformStyle: 'preserve-3d', background: 'var(--surface)' }}
                >
                  <div className="overflow-hidden relative">
                    <img src={img} alt={name} className="w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" style={{ aspectRatio: '3/4' }} />
                  </div>
                  <motion.div style={{ translateZ: 16, borderTop: '1px solid var(--border)' }} className="p-5">
                    <p className="poppins-semibold text-[var(--ink)] text-[0.95rem]">{name}</p>
                    <p className="text-[var(--camel)] text-[10px] poppins-medium uppercase tracking-wider mb-2">{role}</p>
                    <p className="text-xs leading-relaxed text-[var(--ink-soft)]">{bio}</p>
                  </motion.div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-6 sm:px-10 py-32 lg:py-40 overflow-hidden" style={{ background: accentBg }}>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[800px] h-[800px] rounded-full blur-3xl" style={{ background: 'var(--camel)' }} />
        </motion.div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <SplitText
            text="Your style was never"
            className="editorial-headline leading-[1.06]"
            style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', color: accentText }}
            delay={0.05}
            stagger={0.055}
          />
          <SplitText
            text="missing. Just hidden."
            className="editorial-headline leading-[1.06] italic-serif"
            style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', color: 'var(--camel)' }}
            delay={0.4}
            stagger={0.055}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.36, duration: 0.5 }}
            className="mt-5 mb-10 text-[1rem] leading-relaxed" style={{ color: accentMuted }}
          >
            We help you crack it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <MagneticElement>
              <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>
                Join the waitlist <ArrowRight size={15} />
              </Link>
            </MagneticElement>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: accentBg, borderTop: `1px solid ${accentBorder}` }}>
        <div className="px-6 sm:px-10 md:px-14 py-24 flex flex-col items-center gap-8 text-center">
          <span
            className="editorial-headline select-none leading-none"
            style={{
              fontSize: 'clamp(3.5rem,11vw,8.5rem)',
              letterSpacing: '-0.04em',
              backgroundImage: isDark
                ? 'linear-gradient(145deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.13) 38%, rgba(196,160,116,0.45) 68%, rgba(255,255,255,0.08) 100%)'
                : 'linear-gradient(145deg, rgba(28,28,28,0.38) 0%, rgba(28,28,28,0.12) 38%, rgba(169,124,80,0.55) 68%, rgba(28,28,28,0.06) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            CipherAI
          </span>
          <div className="flex items-center gap-8">
            <a href="#waitlist" className="text-[11px] tracking-[0.18em] uppercase hover:opacity-80 transition-opacity" style={{ color: accentMuted }}>Join Waitlist</a>
            <span style={{ color: accentBorder }}>·</span>
            <a href="#features" className="text-[11px] tracking-[0.18em] uppercase hover:opacity-80 transition-opacity" style={{ color: accentMuted }}>Features</a>
            <span style={{ color: accentBorder }}>·</span>
            <a href="#team" className="text-[11px] tracking-[0.18em] uppercase hover:opacity-80 transition-opacity" style={{ color: accentMuted }}>Team</a>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: accentMuted, opacity: 0.5 }}>
            © 2025 CipherAI · All rights reserved
          </p>
        </div>
      </footer>

    </div>
  )
}
