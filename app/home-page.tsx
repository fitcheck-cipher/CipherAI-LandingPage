'use client'

import { useRef } from 'react'
import { motion, useTransform, useSpring, useMotionValue, useScroll, useInView } from 'framer-motion'
import { ArrowRight, TShirt, Robot, Ruler } from '@phosphor-icons/react'
import Link from 'next/link'
import { useTheme } from './theme-context'
import SplitText from '@/components/SplitText'
import { WaitlistForm } from '@/components/WaitlistForm'

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
  { src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85', label: 'Your Wardrobe', sub: 'Catalogued & searchable' },
  { src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=85', label: 'Your Fit', sub: 'Measured once, forever' },
  { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85', label: 'Every Occasion', sub: 'Outfit for every moment' },
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=85', label: 'Your Style', sub: 'Decoded by Cipher' },
]

const MANIFESTO_ITEMS = [
  ['Enter once.', 'Your measurements, stored and applied everywhere. Never measure again.'],
  ['Shop anywhere.', 'Any site, any store, any app — Cipher adapts to you using the profile it already knows.'],
  ['Data stays yours.', 'On your device. Encrypted. We never sell it. A good cipher locks tight.'],
] as const

const FEATURES = [
  {
    num: '01',
    Icon: TShirt,
    title: 'Scan your wardrobe.',
    body: 'Upload what you own. Cipher catalogs every piece — fabric, color, occasion fit — and surfaces the right things at the right time. Nothing forgotten.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=85',
  },
  {
    num: '02',
    Icon: Ruler,
    title: 'Know your size. Always.',
    body: 'One body scan via your phone camera. MediaPipe maps your proportions. Every outfit recommendation is filtered to what will actually fit — goodbye, 3 sizes ordered, 2 returned.',
    img: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=1200&q=85',
  },
  {
    num: '03',
    Icon: Robot,
    title: 'AI builds the outfit.',
    body: 'Tell us the occasion. Our model assembles looks from your own wardrobe or shop-ready picks, scored for your body, your budget. No stylist required.',
    img: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85',
  },
]

const TEAM = [
  { name: 'Ruchira Balkudru Bhat', role: 'Founder & CEO', img: '/team/ruchira.jpg' },
  { name: 'Himani B Bhat', role: 'Co-Founder', img: '/team/himani.png' },
  { name: 'Subodh Pataki', role: 'Co-Founder', img: '/team/subodh.png' },
  { name: 'Shreyas Kumar', role: 'Advisor', img: '/team/shreyas.jpg' },
]

function ManifestoTimeline({ accentText, accentMuted, accentBorder }: {
  accentText: string; accentMuted: string; accentBorder: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 82%', 'end 25%'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const dot0Scale = useTransform(scrollYProgress, [0, 0.10], [0, 1])
  const dot1Scale = useTransform(scrollYProgress, [0.36, 0.48], [0, 1])
  const dot2Scale = useTransform(scrollYProgress, [0.74, 0.86], [0, 1])
  const dotScales = [dot0Scale, dot1Scale, dot2Scale]
  const item0Opacity = useTransform(scrollYProgress, [0.08, 0.22], [0, 1])
  const item0Y      = useTransform(scrollYProgress, [0.08, 0.22], [14, 0])
  const item1Opacity = useTransform(scrollYProgress, [0.40, 0.54], [0, 1])
  const item1Y      = useTransform(scrollYProgress, [0.40, 0.54], [14, 0])
  const item2Opacity = useTransform(scrollYProgress, [0.76, 0.90], [0, 1])
  const item2Y      = useTransform(scrollYProgress, [0.76, 0.90], [14, 0])
  const opacities = [item0Opacity, item1Opacity, item2Opacity]
  const yValues   = [item0Y, item1Y, item2Y]
  const dotTops   = ['2px', 'calc(50% - 4px)', 'calc(100% - 10px)']

  return (
    <div ref={ref} className="flex gap-7">
      <div className="relative flex-shrink-0" style={{ width: 2 }}>
        <div className="absolute inset-0" style={{ background: accentBorder }} />
        <motion.div className="absolute top-0 left-0 right-0" style={{ height: lineHeight, background: 'var(--camel)' }} />
        {dotTops.map((top, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', top, left: '50%', x: '-50%',
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--camel)', scale: dotScales[i], zIndex: 2,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-10 flex-1">
        {MANIFESTO_ITEMS.map(([title, body], i) => (
          <motion.div key={title} style={{ opacity: opacities[i], y: yValues[i] }}>
            <p className="poppins-semibold mb-2" style={{ color: accentText }}>{title}</p>
            <p className="text-sm leading-relaxed" style={{ color: accentMuted }}>{body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function StickyFeatureCard({ num, Icon, title, body, img, index }: {
  num: string; Icon: React.ElementType; title: string; body: string; img: string; index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const textFirst = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        position: 'sticky', top: 0, height: '100vh', zIndex: index + 1,
        display: 'flex', flexDirection: textFirst ? 'row' : 'row-reverse', overflow: 'hidden',
      }}
    >
      <div style={{
        width: '42%', flexShrink: 0, background: 'var(--surface)',
        padding: 'clamp(40px,5vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderRight: textFirst ? '1px solid var(--border)' : undefined,
        borderLeft: !textFirst ? '1px solid var(--border)' : undefined,
      }}>
        <motion.span
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.08 }}
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(3.5rem,7vw,5.5rem)', fontWeight: 400, lineHeight: 1, color: 'var(--border)', display: 'block', marginBottom: -4, letterSpacing: '-0.02em' }}
        >
          {num}
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.42, delay: 0.16 }}
          style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}
        >
          <Icon size={18} style={{ color: 'var(--camel)' }} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 18 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.62, delay: 0.22 }}
          style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2rem,3.2vw,3rem)', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--ink)', marginBottom: 16 }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.58, delay: 0.30 }}
          style={{ color: 'var(--ink-soft)', fontSize: '1rem', lineHeight: 1.72, maxWidth: 420 }}
        >
          {body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.48 }}
          style={{ marginTop: 'auto', paddingTop: 40, display: 'flex', gap: 6, alignItems: 'center' }}
        >
          {FEATURES.map((_, i) => (
            <div key={i} style={{ height: 2, width: i === index ? 28 : 8, borderRadius: 999, background: i === index ? 'var(--camel)' : 'var(--border)', transition: 'width 0.3s' }} />
          ))}
        </motion.div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <motion.img
          src={img} alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          initial={{ scale: 1.06 }} animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}

const ease = [0.22, 1, 0.36, 1] as const

export default function HomePage() {
  const { isDark } = useTheme()
  const { scrollY } = useScroll()
  const heroCardY = useTransform(scrollY, [0, 700], [0, -110])
  const heroTextY = useTransform(scrollY, [0, 700], [0, -55])

  const accentBg     = isDark ? '#141210' : 'var(--surface-2)'
  const accentText   = isDark ? '#F5F2EC' : 'var(--ink)'
  const accentMuted  = isDark ? 'rgba(245,242,236,0.45)' : 'var(--ink-soft)'
  const accentBorder = isDark ? 'rgba(255,255,255,0.09)' : 'var(--border)'

  return (
    <div className="overflow-x-hidden bg-[var(--bg)]">

      {/* ── HERO ── */}
      <section className="relative min-h-screen overflow-hidden flex flex-col lg:flex-row bg-[var(--bg)]">
        <motion.div style={{ y: heroTextY }} className="flex-1 flex flex-col justify-start px-6 sm:px-10 lg:px-16 xl:px-24 pt-24 pb-16 lg:pt-28 lg:pb-10 relative z-10">
          <div>
            <SplitText text="Dress for your" className="editorial-headline text-[clamp(3.8rem,8vw,6.5rem)] leading-[1] tracking-[-0.03em] text-[var(--ink)]" delay={0.1} stagger={0.06} />
            <SplitText text="actual life." className="editorial-headline text-[clamp(3.8rem,8vw,6.5rem)] leading-[1] tracking-[-0.03em] italic-serif text-[var(--camel)]" delay={0.32} stagger={0.07} />
          </div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52, duration: 0.6 }} className="text-[var(--ink-soft)] text-[1.05rem] leading-relaxed max-w-[440px] mt-7 mb-9">
            Cipher learns your shape, your wardrobe, your budget — and decodes your style. No fashion-speak. No size-chart math. No guessing.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.68, duration: 0.5 }}>
            <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>
              Reserve your spot
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: heroCardY }} className="hidden lg:flex lg:w-[48%] items-start justify-center relative overflow-hidden pt-28 pr-8">
          <div className="flex gap-3 items-start">
            {[{ ...HERO_CARDS[0], h: 380, mt: 40 }, { ...HERO_CARDS[1], h: 500, mt: 0 }, { ...HERO_CARDS[2], h: 360, mt: 60 }].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.14, duration: 0.85, ease }}
                className="relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ width: 168, height: card.h, marginTop: card.mt, flexShrink: 0 }}
                whileHover="hovered"
              >
                <motion.img src={card.img} alt={card.title} className="w-full h-full object-cover object-top" variants={{ hovered: { scale: 1.06 } }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
                <motion.div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent" variants={{ default: { opacity: 0, y: 14 }, hovered: { opacity: 1, y: 0 } }} initial="default" transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
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
        <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex items-center whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...Array(2)].flatMap((_, j) => MARQUEE.map(item => (
            <span key={`${j}-${item}`} className="inline-flex items-center gap-6 mx-6">
              <span className="editorial-headline text-xl text-[var(--ink-soft)]">{item}</span>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[var(--camel)]" />
            </span>
          )))}
        </motion.div>
      </div>

      {/* ── MANIFESTO ── */}
      <section className="px-6 sm:px-10 md:px-14 py-24 lg:py-32 overflow-hidden" style={{ background: accentBg }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30, rotateX: 18, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} style={{ perspective: 600, transformOrigin: 'bottom left' }}>
                <span className="editorial-headline text-[clamp(5rem,12vw,9rem)] leading-none text-[var(--camel)] block">92M</span>
                <p className="poppins-light text-sm uppercase tracking-widest mt-2 mb-8" style={{ color: accentMuted }}>tonnes of textile waste per year</p>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.6, ease }} className="text-2xl md:text-3xl leading-snug poppins-light" style={{ color: accentText }}>
                Most of it from clothes that were returned, never worn, or never fit.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.28, duration: 0.6, ease }} className="text-base leading-relaxed mt-5" style={{ color: accentMuted }}>
                We didn&apos;t set out to solve a sustainability problem. We set out to solve fit. The sustainability is a side effect.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.42, duration: 0.5, ease }} className="mt-10">
                <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>Join the waitlist <ArrowRight size={15} /></Link>
              </motion.div>
            </div>
            <ManifestoTimeline accentText={accentText} accentMuted={accentMuted} accentBorder={accentBorder} />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL GRID ── */}
      <section style={{ background: accentBg }}>
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ height: '90vh' }}>
          {GRID_IMGS.map(({ src, label, sub }, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 1.08 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.85, ease }} className="overflow-hidden relative group cursor-pointer" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
              <img src={src} alt={label} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 transition-colors duration-500" style={{ background: 'rgba(0,0,0,0.22)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5 md:p-7" style={{ background: 'rgba(4,3,2,0.36)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}>
                <p className="poppins-semibold text-white text-sm md:text-base mb-1 translate-y-3 group-hover:translate-y-0 transition-transform duration-500">{label}</p>
                <p className="text-white/55 text-xs md:text-sm italic-serif translate-y-3 group-hover:translate-y-0 transition-transform duration-500" style={{ transitionDelay: '60ms' }}>{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="px-6 sm:px-10 md:px-14 py-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5" style={{ background: accentBg, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <p className="italic-serif text-[var(--camel)] text-sm mb-1">Your style, decoded.</p>
            <p className="editorial-headline text-3xl md:text-4xl" style={{ color: accentText }}>Every look, powered by AI.</p>
          </div>
          <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>Get early access <ArrowRight size={15} /></Link>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <div id="features">
        {FEATURES.map(({ num, Icon, title, body, img }, i) => (
          <StickyFeatureCard key={num} num={num} Icon={Icon} title={title} body={body} img={img} index={i} />
        ))}
      </div>

      {/* ── WAITLIST ── */}
      <section id="waitlist" className="px-6 sm:px-10 md:px-14 py-28 lg:py-36 relative overflow-hidden" style={{ background: accentBg }}>
        <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full blur-3xl" style={{ background: 'var(--camel)' }} />
        </motion.div>
        <div className="max-w-2xl mx-auto text-center relative z-10" style={{ maxWidth: 680 }}>
          <motion.span initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease }} className="chip mb-6 inline-flex" style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'var(--surface)', color: accentMuted, borderColor: accentBorder }}>
            Early access
          </motion.span>
          <div>
            <SplitText text="Be first to unlock" className="editorial-headline leading-[1.06]" style={{ fontSize: 'clamp(2.6rem,5.5vw,4rem)', color: accentText }} delay={0.1} stagger={0.055} />
            <SplitText text="your style." className="editorial-headline leading-[1.06] italic-serif" style={{ fontSize: 'clamp(2.6rem,5.5vw,4rem)', color: 'var(--camel)' }} delay={0.42} stagger={0.07} />
          </div>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.5 }} className="mt-5 mb-8 text-[0.95rem] leading-relaxed" style={{ color: accentMuted }}>
            Your style was never missing. Just hidden. Join the waitlist and be the first to crack it.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.5 }} className="text-left" style={{ background: isDark ? 'rgba(255,255,255,0.04)' : 'var(--surface)', border: `1px solid ${accentBorder}`, borderRadius: 20, padding: '32px 28px' }}>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-24 lg:py-32 px-6 sm:px-10 md:px-14 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <SplitText text="Built by people who" className="editorial-headline leading-[1.05] text-[var(--ink)]" style={{ fontSize: 'clamp(2.4rem,4.5vw,3.5rem)' }} delay={0.05} stagger={0.05} />
            <SplitText text="love fashion & code." className="editorial-headline leading-[1.05] italic-serif text-[var(--camel)]" style={{ fontSize: 'clamp(2.4rem,4.5vw,3.5rem)' }} delay={0.35} stagger={0.05} />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4" style={{ gap: '1px', background: 'var(--border)' }}>
            {TEAM.map(({ name, role, img }, i) => (
              <TiltCard key={name} className="group cursor-default overflow-hidden" style={{ background: 'var(--surface)' }}>
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6, ease }} style={{ transformStyle: 'preserve-3d', background: 'var(--surface)' }}>
                  <div className="flex justify-center pt-8 pb-4">
                    <div className="overflow-hidden rounded-full" style={{ width: 140, height: 140, flexShrink: 0 }}>
                      <img src={img} alt={name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </div>
                  <motion.div style={{ translateZ: 16, borderTop: '1px solid var(--border)' }} className="p-5">
                    <p className="poppins-semibold text-[var(--ink)] text-[0.95rem]">{name}</p>
                    <p className="text-[var(--camel)] text-[10px] poppins-medium uppercase tracking-wider">{role}</p>
                  </motion.div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative px-6 sm:px-10 py-32 lg:py-40 overflow-hidden" style={{ background: accentBg }}>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.1, 0.04] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full blur-3xl" style={{ background: 'var(--camel)' }} />
        </motion.div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <SplitText text="Your style was never" className="editorial-headline leading-[1.06]" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', color: accentText }} delay={0.05} stagger={0.055} />
          <SplitText text="missing. Just hidden." className="editorial-headline leading-[1.06] italic-serif" style={{ fontSize: 'clamp(2.6rem,5.5vw,4.2rem)', color: 'var(--camel)' }} delay={0.4} stagger={0.055} />
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.36, duration: 0.5 }} className="mt-5 mb-10 text-[1rem] leading-relaxed" style={{ color: accentMuted }}>We help you crack it.</motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }} className="flex flex-wrap gap-3 justify-center">
            <Link href="#waitlist" className="pill" style={{ background: 'var(--camel)', color: '#fff' }}>Join the waitlist <ArrowRight size={15} /></Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: accentBg, borderTop: `1px solid ${accentBorder}` }}>
        <div className="px-6 sm:px-10 md:px-14 py-24 flex flex-col items-center gap-8 text-center">
          <span className="editorial-headline select-none leading-none" style={{ fontSize: 'clamp(3.5rem,11vw,8.5rem)', letterSpacing: '-0.04em', backgroundImage: isDark ? 'linear-gradient(145deg, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.13) 38%, rgba(196,160,116,0.45) 68%, rgba(255,255,255,0.08) 100%)' : 'linear-gradient(145deg, rgba(28,28,28,0.38) 0%, rgba(28,28,28,0.12) 38%, rgba(169,124,80,0.55) 68%, rgba(28,28,28,0.06) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            CipherAI
          </span>
          <div className="flex items-center gap-8">
            <a href="#waitlist" className="text-[11px] tracking-[0.18em] uppercase hover:opacity-80 transition-opacity" style={{ color: accentMuted }}>Join Waitlist</a>
            <span style={{ color: accentBorder }}>·</span>
            <a href="#features" className="text-[11px] tracking-[0.18em] uppercase hover:opacity-80 transition-opacity" style={{ color: accentMuted }}>Features</a>
            <span style={{ color: accentBorder }}>·</span>
            <a href="#team" className="text-[11px] tracking-[0.18em] uppercase hover:opacity-80 transition-opacity" style={{ color: accentMuted }}>Team</a>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: accentMuted, opacity: 0.5 }}>© 2026 CipherAI · All rights reserved</p>
        </div>
      </footer>

    </div>
  )
}
