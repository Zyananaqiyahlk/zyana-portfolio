import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Smartphone, Monitor, Sparkles, Play, ArrowRight,
  Instagram, Star, Zap, Camera, Video, Mic, Film,
  Coffee, Plane, Flower2, Shirt
} from 'lucide-react'

/* ─── DATA ──────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: 'all',     label: 'All Content',         color: 'midnight' },
  { id: 'tech',    label: 'Tech & AI',            color: 'coral'    },
  { id: 'travel',  label: 'Travel & Hotels',      color: 'sage'     },
  { id: 'beauty',  label: 'Beauty & Skincare',    color: 'gold'     },
  { id: 'fashion', label: 'Fashion & Lifestyle',  color: 'offwhite' },
]

const CONTENT = [
  // TECH & AI
  {
    id: 1, cat: 'tech',
    hook: '"Watch me build a clinic AI front desk in 48 hours."',
    format: 'Screen Recording', platform: 'YouTube Shorts', duration: '0:58',
    vibe: 'Build-in-public demo — real client, real deployment',
    accent: '#FF6B6B', gradient: 'from-coral/20 to-midnight/80',
  },
  {
    id: 2, cat: 'tech',
    hook: '"3 AI tools that now run my entire agency for me."',
    format: 'Talking Head', platform: 'Instagram Reels', duration: '0:45',
    vibe: 'Founder POV — authentic, high information density',
    accent: '#FF6B6B', gradient: 'from-coral/20 to-midnight/80',
  },
  {
    id: 3, cat: 'tech',
    hook: '"I automated my entire content pipeline with AI. Here\'s what happened."',
    format: 'Case Study', platform: 'TikTok', duration: '0:52',
    vibe: 'Before/after + results — built-in credibility',
    accent: '#FF6B6B', gradient: 'from-coral/20 to-midnight/80',
  },
  {
    id: 4, cat: 'tech',
    hook: '"The only AI setup a small business owner needs in 2026."',
    format: 'Tutorial', platform: 'Instagram Reels', duration: '0:47',
    vibe: 'Educational + product integration — drives signups',
    accent: '#FF6B6B', gradient: 'from-coral/20 to-midnight/80',
  },
  // TRAVEL & HOTELS
  {
    id: 5, cat: 'travel',
    hook: '"Running an AI agency from hotel rooms. My full remote setup."',
    format: 'Day-in-Life', platform: 'Instagram Reels', duration: '1:02',
    vibe: 'Aspirational founder lifestyle — high shareability',
    accent: '#87A878', gradient: 'from-sage/20 to-midnight/80',
  },
  {
    id: 6, cat: 'travel',
    hook: '"This hotel automated their check-in with AI. I built it."',
    format: 'Case Study', platform: 'TikTok', duration: '0:49',
    vibe: 'Behind-the-build — unique creator-meets-client POV',
    accent: '#87A878', gradient: 'from-sage/20 to-midnight/80',
  },
  {
    id: 7, cat: 'travel',
    hook: '"My carry-on-only packing list as a female tech founder."',
    format: 'Lifestyle', platform: 'YouTube Shorts', duration: '0:54',
    vibe: 'Practical + relatable — strong female founder angle',
    accent: '#87A878', gradient: 'from-sage/20 to-midnight/80',
  },
  {
    id: 8, cat: 'travel',
    hook: '"Hotel room → content studio in 8 minutes. Full setup tour."',
    format: 'Tutorial', platform: 'Instagram Reels', duration: '0:48',
    vibe: 'Transformation content — satisfying visual payoff',
    accent: '#87A878', gradient: 'from-sage/20 to-midnight/80',
  },
  // BEAUTY & SKINCARE
  {
    id: 9, cat: 'beauty',
    hook: '"My 5-minute look for filming AI demos. No filter needed."',
    format: 'Get Ready With Me', platform: 'Instagram Reels', duration: '0:43',
    vibe: 'Relatable routine — authentic, no-filter energy',
    accent: '#C9A84C', gradient: 'from-gold/20 to-midnight/80',
  },
  {
    id: 10, cat: 'beauty',
    hook: '"Products that actually survive a 16-hour founder day on camera."',
    format: 'Product Review', platform: 'TikTok', duration: '0:51',
    vibe: 'Honest review — high trust signal from a credible voice',
    accent: '#C9A84C', gradient: 'from-gold/20 to-midnight/80',
  },
  {
    id: 11, cat: 'beauty',
    hook: '"Founder 6 AM skincare routine. Before the build days start."',
    format: 'Morning Routine', platform: 'Instagram Reels', duration: '0:46',
    vibe: 'Aspirational routine — targets ambitious female audience',
    accent: '#C9A84C', gradient: 'from-gold/20 to-midnight/80',
  },
  {
    id: 12, cat: 'beauty',
    hook: '"How I stay camera-ready while running a startup. Honest."',
    format: 'Lifestyle', platform: 'YouTube Shorts', duration: '0:55',
    vibe: 'Authentic testimonial — no perfection, just real',
    accent: '#C9A84C', gradient: 'from-gold/20 to-midnight/80',
  },
  // FASHION & LIFESTYLE
  {
    id: 13, cat: 'fashion',
    hook: '"What a female AI founder actually wears to brand meetings."',
    format: 'OOTD', platform: 'Instagram Reels', duration: '0:39',
    vibe: 'Aspirational but real — founder fashion niche is wide open',
    accent: '#F5ECD7', gradient: 'from-offwhite/20 to-midnight/80',
  },
  {
    id: 14, cat: 'fashion',
    hook: '"My work-from-anywhere capsule — 10 pieces, unlimited content."',
    format: 'Styling', platform: 'TikTok', duration: '0:53',
    vibe: 'High utility + aspirational — saves + shares well',
    accent: '#F5ECD7', gradient: 'from-offwhite/20 to-midnight/80',
  },
  {
    id: 15, cat: 'fashion',
    hook: '"From code to content shoot. My outfit transition under 60s."',
    format: 'Transformation', platform: 'Instagram Reels', duration: '0:41',
    vibe: 'Visual payoff — satisfying transition format',
    accent: '#F5ECD7', gradient: 'from-offwhite/20 to-midnight/80',
  },
  {
    id: 16, cat: 'fashion',
    hook: '"I reviewed 6 travel bags as a female founder. Here\'s the winner."',
    format: 'Product Review', platform: 'YouTube Shorts', duration: '0:57',
    vibe: 'Decision-helper content — drives conversions',
    accent: '#F5ECD7', gradient: 'from-offwhite/20 to-midnight/80',
  },
]

const FORMATS = [
  { icon: Mic,    label: 'Talking Head',      desc: 'Founder POV, straight-to-camera, no fluff.' },
  { icon: Monitor,label: 'Screen Recording',  desc: 'Live builds, tool demos, workflow walkthroughs.' },
  { icon: Film,   label: 'Day-in-Life',       desc: 'Authentic behind-the-scenes of my founder life.' },
  { icon: Camera, label: 'Product Review',    desc: 'Honest, real-world testing from a credible voice.' },
  { icon: Video,  label: 'Tutorial',          desc: 'Step-by-step how-to content that drives signups.' },
  { icon: Sparkles, label: 'GRWM / Styling',  desc: 'Beauty and fashion integrated into founder life.' },
]

const PACKAGES = [
  {
    tier: '01', name: 'Spark',
    price: '$500', per: 'per deliverable',
    color: 'coral',
    includes: [
      '1 × UGC video (up to 60s)',
      '1 platform (Reels, TikTok, or Shorts)',
      'Script, filming & editing',
      'Usage rights for 6 months',
    ],
    best: false,
  },
  {
    tier: '02', name: 'Studio',
    price: '$1,500', per: '3-video bundle',
    color: 'gold',
    includes: [
      '3 × UGC videos (up to 60s each)',
      'Multi-platform cut-downs',
      'Script, filming & editing',
      'Usage rights for 12 months',
      'Brand story integration',
    ],
    best: true,
  },
  {
    tier: '03', name: 'Series',
    price: '$2,500', per: 'monthly retainer',
    color: 'sage',
    includes: [
      '8 × UGC videos per month',
      'All platforms + LinkedIn',
      'Script, filming & editing',
      'Unlimited usage rights',
      'ManyChat keyword strategy',
      'Monthly performance report',
    ],
    best: false,
  },
]

const STATS = [
  { value: '5', label: 'Platforms' },
  { value: '90', label: 'Day Series' },
  { value: '4', label: 'Brand Niches' },
  { value: '48h', label: 'Turnaround' },
]

/* ─── COLOR MAPS ─────────────────────────────────────────────────────────── */
const CAT_COLORS = {
  tech:    { pill: 'bg-coral/15 text-coral border-coral/25',    dot: 'bg-coral' },
  travel:  { pill: 'bg-sage/15 text-sage-dark border-sage/25',  dot: 'bg-sage'  },
  beauty:  { pill: 'bg-gold/15 text-gold-dark border-gold/25',  dot: 'bg-gold'  },
  fashion: { pill: 'bg-white/15 text-offwhite border-white/20', dot: 'bg-offwhite' },
}
const CAT_ICONS = { tech: Zap, travel: Plane, beauty: Flower2, fashion: Shirt }
const CAT_LABELS = { tech: 'Tech & AI', travel: 'Travel & Hotels', beauty: 'Beauty & Skincare', fashion: 'Fashion & Lifestyle' }

/* ─── SUB-COMPONENTS ─────────────────────────────────────────────────────── */

function ContentCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon = CAT_ICONS[item.cat]
  const colors = CAT_COLORS[item.cat]

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group bg-midnight-soft border border-white/8 rounded-2xl overflow-hidden card-lift cursor-default"
    >
      {/* Video mock frame */}
      <div className={`relative bg-gradient-to-br ${item.gradient} aspect-[9/10] flex flex-col items-center justify-center p-5`}>
        {/* Play button */}
        <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center mb-4 group-hover:border-white/60 transition-all">
          <Play size={20} className="text-white/70 ml-1 group-hover:text-white transition-colors" fill="currentColor" />
        </div>
        {/* Hook line */}
        <p className="font-caveat text-white text-center text-lg leading-snug px-2">
          {item.hook}
        </p>
        {/* Duration chip */}
        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-dm text-white/70">
          {item.duration}
        </div>
        {/* Platform chip */}
        <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-[10px] font-dm text-white/80 flex items-center gap-1">
          <Instagram size={10} />
          {item.platform}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-syne font-semibold uppercase tracking-wide ${colors.pill}`}>
            <Icon size={9} />
            {CAT_LABELS[item.cat]}
          </span>
          <span className="text-[10px] font-dm text-white/35 uppercase tracking-wider">{item.format}</span>
        </div>
        <p className="text-xs font-dm text-white/45 leading-relaxed">{item.vibe}</p>
      </div>
    </motion.div>
  )
}

function PackageCard({ pkg, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const colorMap = {
    coral: {
      accent: 'text-coral',
      border: 'border-coral/20',
      dot: 'bg-coral',
      hover: 'hover:border-coral/40',
      btn: 'bg-coral hover:bg-coral-light text-white',
    },
    gold: {
      accent: 'text-gold',
      border: 'border-gold/30',
      dot: 'bg-gold',
      hover: 'hover:border-gold/50',
      btn: 'bg-gold hover:bg-gold-light text-midnight',
    },
    sage: {
      accent: 'text-sage',
      border: 'border-sage/20',
      dot: 'bg-sage',
      hover: 'hover:border-sage/40',
      btn: 'bg-sage hover:bg-sage-light text-white',
    },
  }
  const c = colorMap[pkg.color]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative bg-midnight-soft border ${c.border} ${c.hover} rounded-3xl p-8 transition-all duration-300 flex flex-col ${pkg.best ? 'ring-1 ring-gold/30' : ''}`}
    >
      {pkg.best && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-midnight text-[10px] font-syne font-bold uppercase tracking-widest px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-6">
        <p className={`font-syne font-bold text-xs uppercase tracking-[0.2em] ${c.accent} mb-2`}>{pkg.tier}</p>
        <h3 className="font-syne font-extrabold text-white text-3xl mb-1">{pkg.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className={`font-syne font-bold text-4xl ${c.accent}`}>{pkg.price}</span>
          <span className="font-dm text-white/30 text-sm">{pkg.per}</span>
        </div>
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {pkg.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-3 font-dm text-sm text-white/65">
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
            {item}
          </li>
        ))}
      </ul>

      <a
        href="#brand-contact"
        className={`w-full py-3 rounded-xl text-sm font-syne font-bold text-center transition-all ${c.btn}`}
      >
        Get Started
      </a>
    </motion.div>
  )
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */

export default function UGCBrandPortfolio() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? CONTENT
    : CONTENT.filter(c => c.cat === activeCategory)

  return (
    <section id="brand-portfolio" className="bg-midnight">

      {/* ── HERO BANNER ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/6">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)', backgroundSize: '48px 48px' }}
        />

        <div className="max-w-7xl mx-auto px-6 py-24 relative">
          {/* Issue tag */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <span className="w-8 h-px bg-coral" />
            <span className="font-syne text-coral text-xs font-bold uppercase tracking-[0.25em]">
              Naqiyah Lakdawala — UGC Creator Portfolio
            </span>
          </motion.div>

          {/* Editorial headline */}
          <div className="max-w-5xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-syne font-extrabold text-white leading-[0.92] mb-8"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
            >
              Content that{' '}
              <span className="text-gradient-coral">converts</span>
              .<br />
              Across every{' '}
              <em className="not-italic text-white/40">category</em>{' '}
              you sell in.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-dm text-white/50 text-lg max-w-2xl leading-relaxed"
            >
              I'm Naqiyah — AI founder, UGC creator, and 90-day public builder.
              I make scroll-stopping content for tech tools, travel brands, beauty products,
              and lifestyle companies. Authentic, fast-turnaround, and built around your audience.
            </motion.p>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/8"
          >
            {STATS.map((s, i) => (
              <div key={i}>
                <p className="font-syne font-extrabold text-white text-4xl leading-none">{s.value}</p>
                <p className="font-dm text-white/35 text-xs uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
            <div>
              <p className="font-syne font-extrabold text-coral text-4xl leading-none">Day 10</p>
              <p className="font-dm text-white/35 text-xs uppercase tracking-widest mt-1">of 90 Live Series</p>
            </div>
            <div>
              <div className="flex gap-1 mt-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-gold" fill="#C9A84C" />)}
              </div>
              <p className="font-dm text-white/35 text-xs uppercase tracking-widest mt-1">48hr Turnaround</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CONTENT SHOWCASE ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section label */}
        <div className="flex items-center justify-between flex-wrap gap-6 mb-12">
          <div>
            <p className="font-syne text-white/25 text-xs uppercase tracking-[0.25em] mb-2">02 — Content Showcase</p>
            <h2 className="font-syne font-extrabold text-white text-4xl">What I create for you</h2>
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full border text-xs font-syne font-semibold uppercase tracking-wide transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white text-midnight border-white'
                    : 'bg-transparent text-white/45 border-white/15 hover:border-white/35 hover:text-white/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── FORMATS ──────────────────────────────────────────────── */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="font-syne text-white/25 text-xs uppercase tracking-[0.25em] mb-2">03 — Content Formats</p>
              <h2 className="font-syne font-extrabold text-white text-4xl">Six ways I show up for your brand</h2>
            </div>
            <p className="font-dm text-white/35 text-sm max-w-xs text-right">
              Every format is designed for the platform where your audience actually scrolls.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {FORMATS.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-midnight-soft border border-white/6 rounded-2xl p-5 hover:border-white/15 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                    <Icon size={16} className="text-white/50" />
                  </div>
                  <p className="font-syne font-bold text-white text-sm mb-2">{f.label}</p>
                  <p className="font-dm text-white/35 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── EDITORIAL PULL QUOTE ─────────────────────────────────── */}
      <div className="border-t border-b border-white/6 bg-midnight-soft">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-2 border-r border-white/6 pr-12">
              <p className="font-caveat text-white/80 leading-snug mb-4"
                style={{ fontSize: 'clamp(24px, 4vw, 42px)' }}>
                "I don't create content about products. I create content about{' '}
                <span className="text-coral">how products fit into a real founder's life</span> — and that's
                the difference between content that gets saved and content that gets scrolled past."
              </p>
              <p className="font-dm text-white/25 text-sm">— Naqiyah Lakdawala, Day 10 of 90</p>
            </div>
            <div className="pl-12 pt-4 md:pt-0 space-y-6 hidden md:block">
              <div>
                <p className="font-syne font-bold text-white/80 text-sm mb-1">Turnaround Time</p>
                <p className="font-syne font-extrabold text-coral text-3xl">48 hrs</p>
                <p className="font-dm text-white/30 text-xs">from brief to delivery</p>
              </div>
              <div className="h-px bg-white/8" />
              <div>
                <p className="font-syne font-bold text-white/80 text-sm mb-1">Revision Policy</p>
                <p className="font-syne font-extrabold text-sage text-3xl">2×</p>
                <p className="font-dm text-white/30 text-xs">included on every deliverable</p>
              </div>
              <div className="h-px bg-white/8" />
              <div>
                <p className="font-syne font-bold text-white/80 text-sm mb-1">Content Style</p>
                <p className="font-syne font-extrabold text-gold text-2xl leading-tight">Raw.<br/>Real.<br/>Results.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGES ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="font-syne text-white/25 text-xs uppercase tracking-[0.25em] mb-3">04 — Packages</p>
          <h2 className="font-syne font-extrabold text-white mb-4" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
            Simple, transparent pricing
          </h2>
          <p className="font-dm text-white/40 max-w-xl mx-auto">
            No hidden fees. No vague deliverables. Every package includes scripting, filming, editing, and full usage rights.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PACKAGES.map((pkg, i) => <PackageCard key={i} pkg={pkg} index={i} />)}
        </div>

        <p className="text-center font-dm text-white/25 text-sm mt-8">
          Need something custom? Let's build a package around your campaign brief.{' '}
          <a href="#brand-contact" className="text-coral underline underline-offset-2 hover:text-coral-light">
            Get in touch →
          </a>
        </p>
      </div>

      {/* ── BRAND CATEGORIES I SERVE ─────────────────────────────── */}
      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <p className="font-syne text-white/25 text-xs uppercase tracking-[0.25em] mb-12">05 — Brand Categories</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Zap,     label: 'Tech & AI Tools',       desc: 'Automation, SaaS, productivity, AI platforms.', accent: 'coral',  note: 'Actively pitching 25+ brands' },
              { icon: Plane,   label: 'Travel & Hotels',       desc: 'Hotels, airlines, luggage, travel accessories.', accent: 'sage',  note: 'Available for partnerships' },
              { icon: Flower2, label: 'Beauty & Skincare',     desc: 'Skincare, makeup, wellness, self-care products.', accent: 'gold', note: 'Available for partnerships' },
              { icon: Shirt,   label: 'Fashion & Lifestyle',   desc: 'Founder fashion, WFH style, accessories, home.', accent: 'offwhite', note: 'Available for partnerships' },
            ].map((cat, i) => {
              const Icon = cat.icon
              const accentMap = {
                coral: 'text-coral bg-coral/10 border-coral/20',
                sage: 'text-sage-dark bg-sage/10 border-sage/20',
                gold: 'text-gold-dark bg-gold/10 border-gold/20',
                offwhite: 'text-offwhite bg-white/5 border-white/15',
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-midnight-soft border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-colors"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-syne font-semibold uppercase tracking-wide mb-4 ${accentMap[cat.accent]}`}>
                    <Icon size={11} />
                    {cat.label}
                  </div>
                  <p className="font-dm text-white/55 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <p className={`font-dm text-xs ${cat.accent === 'coral' ? 'text-coral' : 'text-white/25'}`}>
                    {cat.note}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div id="brand-contact" className="border-t border-white/6 bg-midnight-soft">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-syne text-white/25 text-xs uppercase tracking-[0.25em] mb-6">06 — Let's Work</p>
            <h2 className="font-syne font-extrabold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
              Your brand.<br />
              <span className="text-gradient-coral">My audience.</span><br />
              Real results.
            </h2>
            <p className="font-dm text-white/45 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              I'm currently accepting brand partners for my ongoing 90-day series.
              Slots are limited — reach out before the next batch closes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:naqiyahlk@gmail.com?subject=Brand Partnership Enquiry — Zyana Systems"
                className="inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-light text-white font-syne font-bold px-8 py-4 rounded-2xl text-sm transition-all hover:shadow-lg hover:shadow-coral/25"
              >
                Email Me a Brief
                <ArrowRight size={16} />
              </a>
              <a
                href="https://www.instagram.com/zyana_loire"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 text-white/60 hover:text-white font-syne font-bold px-8 py-4 rounded-2xl text-sm transition-all"
              >
                <Instagram size={16} />
                DM on Instagram
              </a>
            </div>
            <p className="font-dm text-white/20 text-xs mt-8">
              Keyword DM: Send <span className="text-white/40 font-semibold">COLLAB</span> to{' '}
              <span className="text-white/40">@zyana_loire</span> to get the collaboration deck instantly.
            </p>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
