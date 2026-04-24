import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, Flame, Star, Zap } from 'lucide-react'

const DAYS = [
  { day: 1,  title: 'The Idea',          desc: 'Why I quit playing it safe and decided to build in public.', tag: 'Foundation', done: true },
  { day: 2,  title: 'Stack Reveal',      desc: 'Claude + n8n + ManyChat. The exact tools I use daily.', tag: 'Tech', done: true },
  { day: 3,  title: 'First Agent Live',  desc: 'Deployed my first AI automation agent for a real client.', tag: 'Build', done: true },
  { day: 4,  title: 'Content OS',        desc: 'How I batch 30 days of content in one afternoon.', tag: 'Systems', done: true },
  { day: 5,  title: 'Real Estate Agent', desc: 'Built a full lead capture AI for a real estate firm.', tag: 'Client Work', done: true, keyword: 'REAL ESTATE' },
  { day: 6,  title: 'Hotel Bot',         desc: 'Automated hotel guest comms — 3 hour manual job → 4 mins.', tag: 'Client Work', done: true, keyword: 'HOTEL' },
  { day: 7,  title: 'Clinic AI',         desc: 'Patient intake + reminders agent. Live in 48 hours.', tag: 'Client Work', done: true, keyword: 'CLINIC' },
  { day: 8,  title: 'Brand Pitch',       desc: 'My first official UGC pitch to a tech brand. Here\'s what I said.', tag: 'Growth', done: true },
  { day: 9,  title: 'Apple Setup Tour',  desc: 'Every device in my workflow and why it matters.', tag: 'Lifestyle', done: true },
  { day: 10, title: 'Digital Products',  desc: 'Packaging my agents as sellable products. You\'re watching it happen.', tag: 'Milestone', done: true, featured: true },
  { day: 11, title: 'Coming Next…',      desc: 'The ManyChat + Instagram automation I\'m building next.', tag: 'Upcoming', done: false },
]

const TAG_COLORS = {
  Foundation:   'bg-offwhite-deep/40 text-[#1C1C1E]',
  Tech:         'bg-midnight/80 text-white',
  Build:        'bg-coral/15 text-coral-dark',
  Systems:      'bg-sage/20 text-sage-dark',
  'Client Work':'bg-gold/15 text-gold-dark',
  Growth:       'bg-coral/10 text-coral',
  Lifestyle:    'bg-sage/15 text-sage-dark',
  Milestone:    'bg-coral text-white',
  Upcoming:     'bg-white/40 text-[#6C6C70]',
}

function DayCard({ day, title, desc, tag, done, featured, keyword, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`relative rounded-2xl p-5 card-lift cursor-pointer
        ${featured
          ? 'bg-midnight border-2 border-coral/50 shadow-[0_0_40px_rgba(255,107,107,0.2)]'
          : done
            ? 'bg-white/70 border border-offwhite-deep/50'
            : 'bg-white/30 border border-dashed border-offwhite-deep/40 opacity-60'
        }`}
    >
      {featured && (
        <div className="absolute -top-3 left-4 bg-coral text-white text-[10px] font-syne font-bold px-3 py-0.5 rounded-full tracking-wide flex items-center gap-1">
          <Flame size={10} /> Day 10 — Live Now
        </div>
      )}
      <div className="flex items-start justify-between mb-2">
        <span className="font-syne font-extrabold text-3xl text-offwhite-deep/30 leading-none">{String(day).padStart(2, '0')}</span>
        <span className={`text-[10px] font-dm font-semibold px-2.5 py-0.5 rounded-full ${TAG_COLORS[tag] || 'bg-white/50 text-gray-600'}`}>
          {tag}
        </span>
      </div>
      <h3 className={`font-syne font-bold text-base mb-1 ${featured ? 'text-white' : 'text-midnight'}`}>{title}</h3>
      <p className={`font-dm text-xs leading-relaxed ${featured ? 'text-white/60' : 'text-[#6C6C70]'}`}>{desc}</p>
      {keyword && (
        <div className="mt-3 inline-flex items-center gap-1.5 bg-gold/10 border border-gold/20 rounded-lg px-2.5 py-1">
          <Zap size={10} className="text-gold" />
          <span className="text-[10px] font-dm font-medium text-gold-dark">DM "{keyword}"</span>
        </div>
      )}
      {done && !featured && (
        <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-sage/30 flex items-center justify-center">
          <Star size={10} className="text-sage-dark fill-sage-dark" />
        </div>
      )}
    </motion.div>
  )
}

export default function Series() {
  return (
    <section id="series" className="bg-offwhite py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 bg-coral/10 border border-coral/25 text-coral text-xs font-dm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Play size={10} fill="currentColor" /> 90-Day Public Series
            </span>
            <h2 className="font-syne font-extrabold text-midnight text-4xl lg:text-5xl mb-4">
              Building Every Day.
              <br />
              <span className="text-gradient-coral">Documenting Everything.</span>
            </h2>
            <p className="font-dm text-[#6C6C70] text-lg max-w-xl mx-auto">
              From zero to AI automation agency — every decision, every build, every deal.
              Follow the journey on Instagram.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DAYS.map((d, i) => (
            <DayCard key={d.day} {...d} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com/zyana_loire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-midnight text-white font-syne font-bold text-sm px-8 py-3.5 rounded-full hover:bg-midnight/80 transition-colors"
          >
            <Play size={14} fill="currentColor" />
            Watch the Full Series on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  )
}
