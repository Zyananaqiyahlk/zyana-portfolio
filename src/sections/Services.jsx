import React from 'react'
import { motion } from 'framer-motion'
import { Bot, Clapperboard, BarChart3, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: Bot,
    color: 'coral',
    title: 'AI Automation Systems',
    subtitle: 'For Small Businesses',
    desc: 'I build end-to-end AI agents that replace manual workflows. Lead intake, customer comms, freight quoting, appointment booking — all automated with Claude + n8n.',
    bullets: ['Custom agent builds in 5–10 days', 'Claude + n8n + ManyChat stack', 'Clinics, hotels, real estate, e-com'],
    cta: 'Get Automated',
    href: 'https://zyanacosystems.com',
  },
  {
    icon: Clapperboard,
    color: 'sage',
    title: 'UGC Content Creation',
    subtitle: 'For Tech & Travel Brands',
    desc: 'Authentic, founder-led content that converts. I film my real workflow, real devices, real results. No stock footage, no actors — just genuine story-driven ads.',
    bullets: ['iPhone Reels, TikToks, YouTube Shorts', 'Tech & travel product integrations', 'Turnaround in 48–72 hours'],
    cta: 'Pitch to Me',
    href: '#meta-cta',
  },
  {
    icon: BarChart3,
    color: 'gold',
    title: 'Meta Growth Strategy',
    subtitle: 'Instagram & ManyChat',
    desc: 'I build Instagram funnels that turn followers into clients using ManyChat keyword triggers, story flows, and AI-powered DM automation.',
    bullets: ['ManyChat keyword campaigns', 'Instagram Reels → DM funnel', 'Lead capture + nurture sequences'],
    cta: 'Grow My Brand',
    href: '#meta-cta',
  },
]

const COLOR_MAP = {
  coral: {
    bg: 'bg-coral/8',
    border: 'border-coral/20 hover:border-coral/50',
    icon: 'bg-coral/15 text-coral',
    pill: 'bg-coral/10 text-coral',
    cta: 'bg-coral text-white hover:bg-coral-dark',
    glow: 'hover:shadow-[0_20px_60px_rgba(255,107,107,0.15)]',
  },
  sage: {
    bg: 'bg-sage/8',
    border: 'border-sage/20 hover:border-sage/50',
    icon: 'bg-sage/15 text-sage-dark',
    pill: 'bg-sage/10 text-sage-dark',
    cta: 'bg-sage text-white hover:bg-sage-dark',
    glow: 'hover:shadow-[0_20px_60px_rgba(135,168,120,0.15)]',
  },
  gold: {
    bg: 'bg-gold/8',
    border: 'border-gold/20 hover:border-gold/50',
    icon: 'bg-gold/15 text-gold-dark',
    pill: 'bg-gold/10 text-gold-dark',
    cta: 'bg-gold text-white hover:bg-gold-dark',
    glow: 'hover:shadow-[0_20px_60px_rgba(201,168,76,0.15)]',
  },
}

export default function Services() {
  return (
    <section id="services" className="bg-offwhite-warm py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-midnight/8 text-midnight/60 text-xs font-dm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide uppercase">
            What I Do
          </span>
          <h2 className="font-syne font-extrabold text-midnight text-4xl lg:text-5xl mb-4">
            Three Ways I Can
            <br />
            <span className="text-gradient-sage">Help Your Brand Grow</span>
          </h2>
          <p className="font-dm text-[#6C6C70] text-lg max-w-lg mx-auto">
            AI systems that save you time. Content that actually converts. Growth funnels that run while you sleep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ icon: Icon, color, title, subtitle, desc, bullets, cta, href }, i) => {
            const c = COLOR_MAP[color]
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-3xl p-7 border transition-all duration-300 card-lift ${c.bg} ${c.border} ${c.glow}`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${c.icon}`}>
                  <Icon size={22} />
                </div>

                <span className={`text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full tracking-wide ${c.pill}`}>
                  {subtitle}
                </span>

                <h3 className="font-syne font-bold text-midnight text-xl mt-3 mb-2">{title}</h3>
                <p className="font-dm text-[#6C6C70] text-sm leading-relaxed mb-5">{desc}</p>

                <ul className="space-y-2 mb-6">
                  {bullets.map(b => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0 opacity-50" style={{ color: 'inherit' }} />
                      <span className="font-dm text-xs text-midnight/70">{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center gap-2 text-sm font-syne font-bold px-5 py-2.5 rounded-full transition-colors ${c.cta}`}
                >
                  {cta} <ArrowRight size={14} />
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
