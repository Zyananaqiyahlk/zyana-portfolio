import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Clapperboard, Zap, Check, Package, ArrowRight, Sparkles, Lock } from 'lucide-react'

const AGENTS = [
  {
    icon: Bot,
    name: 'Zara',
    tag: 'AI Front Desk Agent',
    tagColor: 'bg-coral/15 text-coral',
    desc: 'Your AI receptionist — answers calls, books appointments, sends reminders, and handles client intake 24/7. Built for clinics, hotels, restaurants and real estate agencies.',
    features: [
      'AI phone & chat front desk (24/7)',
      'Appointment booking + reminders',
      'Patient / guest intake automation',
      'CRM sync via n8n',
      'ManyChat keyword triggers',
      'Handoff to human when needed',
    ],
    stack: ['Claude Sonnet', 'n8n', 'Bland AI', 'ManyChat', 'Gmail API'],
    github: 'https://github.com/Zyananaqiyahlk/',
    color: 'coral',
  },
  {
    icon: Clapperboard,
    name: 'Content Creator Agent',
    tag: 'Zyana Studio Edition',
    tagColor: 'bg-sage/15 text-sage-dark',
    desc: 'Your AI-powered content command centre. Generates scripts, tracks engagement, writes brand outreach emails, and builds your media kit — all in one dashboard.',
    features: [
      'AI script generator (Hook → Body → CTA)',
      'Engagement tracker + analytics',
      'Brand outreach email writer',
      'Media kit builder',
      'Agent chat interface',
      'Platform tips per Reel/TikTok/Short',
    ],
    stack: ['Claude Sonnet', 'React', 'Vite', 'Tailwind', 'Zustand'],
    github: 'https://github.com/Zyananaqiyahlk/Content-Agent-Studio',
    color: 'sage',
  },
]

const BUNDLE_PERKS = [
  'Both agents — full source code',
  'Step-by-step setup documentation',
  'n8n workflow JSON export',
  'ManyChat keyword templates',
  'Private community access (Phase 2)',
  '30-day email support',
]

function AgentCard({ icon: Icon, name, tag, tagColor, desc, features, stack, github, color, index }) {
  const isCoral = color === 'coral'
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="bg-white rounded-3xl border border-offwhite-deep/60 p-7 shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-5">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCoral ? 'bg-coral/12 text-coral' : 'bg-sage/12 text-sage-dark'}`}>
          <Icon size={22} />
        </div>
        <span className={`text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>{tag}</span>
      </div>

      <h3 className="font-syne font-bold text-midnight text-xl mb-0.5">{name}</h3>
      <p className="font-dm text-[#6C6C70] text-sm leading-relaxed mb-5">{desc}</p>

      <ul className="space-y-2 mb-6">
        {features.map(f => (
          <li key={f} className="flex items-center gap-2.5">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${isCoral ? 'bg-coral/15' : 'bg-sage/15'}`}>
              <Check size={10} className={isCoral ? 'text-coral' : 'text-sage-dark'} />
            </div>
            <span className="font-dm text-xs text-midnight/70">{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {stack.map(s => (
          <span key={s} className="text-[10px] font-dm font-medium bg-offwhite px-2 py-0.5 rounded-md text-midnight/50 border border-offwhite-deep/50">
            {s}
          </span>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[11px] font-dm text-[#6C6C70] hover:text-midnight transition-colors"
      >
        <Lock size={10} /> Preview on GitHub →
      </a>
    </motion.div>
  )
}

export default function Products() {
  const [copied, setCopied] = useState(false)

  const handleCTA = () => {
    window.open('https://instagram.com/zyana_loire', '_blank')
  }

  return (
    <section id="products" className="bg-midnight py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-coral/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sage/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-dm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Package size={12} /> Digital Products
          </span>
          <h2 className="font-syne font-extrabold text-white text-4xl lg:text-5xl mb-4">
            Two Agents.
            <br />
            <span className="text-gradient-coral">One Bundle. One Price.</span>
          </h2>
          <p className="font-dm text-white/50 text-lg max-w-lg mx-auto">
            Built and battle-tested. Buy the code, deploy it yourself, or hire me to set it up for you.
          </p>
        </motion.div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {AGENTS.map((a, i) => <AgentCard key={a.name} {...a} index={i} />)}
        </div>

        {/* Bundle CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-coral via-[#E85D5D] to-[#C9A84C] rounded-3xl p-8 lg:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-white/80" />
                <span className="text-white/80 text-xs font-dm font-semibold tracking-wide uppercase">Founder Bundle</span>
              </div>
              <h3 className="font-syne font-extrabold text-white text-3xl mb-2">
                Front Desk + Content Agent
              </h3>
              <p className="font-dm text-white/75 text-sm leading-relaxed mb-5 max-w-md">
                Everything you need to automate your business operations AND your content engine. Built with the same stack I use every day.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {BUNDLE_PERKS.map(p => (
                  <div key={p} className="flex items-center gap-2">
                    <Check size={13} className="text-white/80 flex-shrink-0" />
                    <span className="font-dm text-white/80 text-xs">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <div className="text-center">
                <p className="font-dm text-white/60 text-xs mb-1">Bundle Price</p>
                <p className="font-syne font-extrabold text-white text-5xl leading-none">DM</p>
                <p className="font-dm text-white/70 text-sm mt-1">for pricing</p>
              </div>
              <button
                onClick={handleCTA}
                className="bg-white text-coral font-syne font-bold text-sm px-8 py-3.5 rounded-full hover:bg-offwhite transition-colors shadow-lg flex items-center gap-2"
              >
                <Zap size={14} />
                DM "BUNDLE" on Instagram
              </button>
              <p className="font-dm text-white/40 text-[10px] text-center">
                Powered by ManyChat · Instant reply
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
