import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const NOTES = [
  {
    text: "Building in public is the scariest and the best decision I've ever made.",
    author: '— Day 1 journal entry',
    color: 'coral',
    rotate: '-2deg',
    x: '0%',
    delay: 0,
  },
  {
    text: "Every 'no' from a brand is data. Keep sending.",
    author: '— Brand outreach notes',
    color: 'sage',
    rotate: '1.5deg',
    x: '5%',
    delay: 0.3,
  },
  {
    text: "The agent doesn't sleep. That's the whole point.",
    author: '— After deploying the freight bot',
    color: 'gold',
    rotate: '-1deg',
    x: '0%',
    delay: 0.6,
  },
  {
    text: "AI doesn't replace you. It amplifies what you already are.",
    author: '— Naqiyah, Day 10',
    color: 'midnight',
    rotate: '2deg',
    x: '-3%',
    delay: 0.9,
  },
]

const COLOR_MAP = {
  coral:    { bg: 'bg-[#FFF0EE]', border: 'border-coral/30', text: 'text-coral/80', dot: 'bg-coral' },
  sage:     { bg: 'bg-[#EEF4EC]', border: 'border-sage/30',  text: 'text-sage-dark/80', dot: 'bg-sage' },
  gold:     { bg: 'bg-[#FBF5E8]', border: 'border-gold/30',  text: 'text-gold-dark/80', dot: 'bg-gold' },
  midnight: { bg: 'bg-midnight',   border: 'border-white/10', text: 'text-white/50', dot: 'bg-white/40' },
}

// SVG underline paths — hand-drawn feel
const UNDERLINES = [
  'M0,8 C20,2 80,14 130,6 C160,2 190,10 220,8',
  'M0,8 C30,2 70,14 110,8 C140,4 170,12 200,8',
  'M0,8 C25,2 75,14 120,6 C150,2 180,10 210,8',
  'M0,8 C20,4 60,12 100,6 C130,2 160,10 190,8',
]

function NoteCard({ text, author, color, rotate, x, delay, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const c = COLOR_MAP[color]

  // Split text into words for letter-by-letter animation
  const words = text.split(' ')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ x }}
      className={`relative rounded-2xl border p-6 shadow-md max-w-xs ${c.bg} ${c.border}`}
    >
      {/* Pin dot */}
      <div className={`absolute -top-2 left-6 w-4 h-4 rounded-full shadow-md ${c.dot}`} />

      {/* Handwritten text — staggered word reveal */}
      <p className="font-caveat text-midnight text-xl leading-relaxed mb-3">
        {inView ? words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 + i * 0.06, duration: 0.2 }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        )) : null}
      </p>

      {/* Animated underline */}
      {inView && (
        <motion.svg
          width="220"
          height="16"
          viewBox="0 0 220 16"
          fill="none"
          className="mb-2 opacity-40"
        >
          <motion.path
            d={UNDERLINES[index % UNDERLINES.length]}
            stroke={color === 'midnight' ? '#ffffff' : color === 'coral' ? '#FF6B6B' : color === 'sage' ? '#87A878' : '#C9A84C'}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: delay + 0.5, ease: 'easeInOut' }}
          />
        </motion.svg>
      )}

      <p className={`font-caveat text-sm ${c.text}`}>{author}</p>
    </motion.div>
  )
}

export default function Notes() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  const titleWords = "Thoughts from the build.".split(' ')

  return (
    <section id="notes" className="bg-offwhite-warm py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <span className="inline-block bg-gold/10 border border-gold/25 text-gold-dark text-xs font-dm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
            Founder Notes
          </span>

          {/* Animated handwritten title */}
          <h2 className="font-caveat text-5xl lg:text-6xl text-midnight mb-4 leading-tight">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="font-dm text-[#6C6C70] text-lg max-w-md mx-auto"
          >
            Real notes from a real build. Unfiltered.
          </motion.p>
        </div>

        {/* Notes grid — staggered positions for natural feel */}
        <div className="flex flex-wrap justify-center items-start gap-8 lg:gap-12">
          {NOTES.map((note, i) => (
            <NoteCard key={i} {...note} index={i} />
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="font-caveat text-3xl text-midnight/40">— Naqiyah Lakdawala</p>
          <p className="font-dm text-[#6C6C70] text-xs mt-1">Founder, Zyana Systems · Day 10</p>
        </motion.div>
      </div>
    </section>
  )
}
