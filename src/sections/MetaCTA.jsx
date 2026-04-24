import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, MessageCircle, Zap, ArrowRight, Check, Sparkles, Video } from 'lucide-react'

const KEYWORDS = [
  { word: 'BUNDLE',     desc: 'Get the digital product bundle info', color: 'coral' },
  { word: 'COLLAB',     desc: 'Brand collab & UGC enquiries',       color: 'sage' },
  { word: 'AUTOMATE',   desc: 'AI automation quote for your biz',   color: 'gold' },
  { word: 'CLINIC',     desc: 'Clinic AI agent demo',               color: 'coral' },
  { word: 'HOTEL',      desc: 'Hotel automation demo',              color: 'sage' },
  { word: 'REAL ESTATE','desc': 'Real estate agent demo',           color: 'gold' },
]

const COLOR_MAP = {
  coral: 'bg-coral/10 border-coral/25 text-coral hover:bg-coral/20',
  sage:  'bg-sage/10 border-sage/25 text-sage-dark hover:bg-sage/20',
  gold:  'bg-gold/10 border-gold/25 text-gold-dark hover:bg-gold/20',
}

const HIGGSFIELD_AD_CONCEPTS = [
  { title: '"The Setup"',       desc: 'A cinematic 15s walkthrough of my Apple ecosystem — MacBook, iPad, iPhone all in frame.', tag: 'Apple Lifestyle' },
  { title: '"3am Build"',       desc: 'Time-lapse of deploying an AI agent overnight. Dark room, glowing screens, coffee.', tag: 'Founder Story' },
  { title: '"Before & After"',  desc: 'Split screen — manual freight quoting vs AI agent. Same task. 24hrs vs 4 mins.', tag: 'Product Demo' },
]

export default function MetaCTA() {
  const [generated, setGenerated] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = (concept) => {
    setLoading(true)
    setTimeout(() => {
      setGenerated(concept)
      setLoading(false)
    }, 2000)
  }

  return (
    <section id="meta-cta" className="bg-midnight py-24 px-6 relative overflow-hidden">
      {/* Glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-coral/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sage/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-[#E1306C]/10 border border-[#E1306C]/25 text-[#E1306C] text-xs font-dm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Instagram size={12} /> Follow the Build
          </span>
          <h2 className="font-syne font-extrabold text-white text-4xl lg:text-5xl mb-4">
            DM Me on Instagram.
            <br />
            <span className="text-gradient-coral">I Actually Reply.</span>
          </h2>
          <p className="font-dm text-white/50 text-lg max-w-lg mx-auto">
            Powered by ManyChat — send a keyword and get an instant, personalised response about exactly what you need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left — Instagram + ManyChat keywords */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Instagram profile card */}
            <div className="glass-dark rounded-3xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-coral via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white font-syne font-bold text-xl">
                  NL
                </div>
                <div>
                  <p className="font-syne font-bold text-white">@zyana_loire</p>
                  <p className="font-dm text-white/40 text-xs">AI Founder · UGC Creator · Building Day {10}</p>
                </div>
                <a
                  href="https://instagram.com/zyana_loire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto bg-coral text-white text-xs font-dm font-medium px-4 py-1.5 rounded-full hover:bg-coral-dark transition-colors"
                >
                  Follow
                </a>
              </div>
              <div className="flex gap-6 text-center">
                {[{ v: '10', l: 'Days Live' }, { v: '90', l: 'Day Goal' }, { v: '3', l: 'Agents' }].map(({ v, l }) => (
                  <div key={l}>
                    <p className="font-syne font-bold text-white text-lg">{v}</p>
                    <p className="font-dm text-white/40 text-[10px]">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ManyChat keywords */}
            <div className="glass-dark rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={14} className="text-coral" />
                <p className="font-syne font-bold text-white text-sm">ManyChat Keywords</p>
                <span className="ml-auto text-[10px] font-dm text-white/30 bg-white/5 px-2 py-0.5 rounded-full">Instant Reply</span>
              </div>
              <div className="space-y-2">
                {KEYWORDS.map(({ word, desc, color }) => (
                  <div
                    key={word}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${COLOR_MAP[color]}`}
                    onClick={() => window.open('https://instagram.com/zyana_loire', '_blank')}
                  >
                    <div>
                      <p className="font-syne font-bold text-xs tracking-wide">"{word}"</p>
                      <p className="font-dm text-[10px] opacity-70">{desc}</p>
                    </div>
                    <ArrowRight size={12} className="opacity-60" />
                  </div>
                ))}
              </div>
              <p className="font-dm text-white/25 text-[10px] text-center mt-4">
                DM any keyword above on Instagram → instant AI response
              </p>
            </div>
          </motion.div>

          {/* Right — Higgsfield ad generator stub */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-dark rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Video size={14} className="text-gold" />
              <p className="font-syne font-bold text-white text-sm">Higgsfield Ad Generator</p>
              <span className="ml-auto text-[10px] font-dm text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">Coming Soon</span>
            </div>
            <p className="font-dm text-white/40 text-xs mb-5">
              AI video concepts for brand pitches — powered by Higgsfield. API integration live when plan upgrades.
            </p>

            <div className="space-y-3 mb-5">
              {HIGGSFIELD_AD_CONCEPTS.map((concept, i) => (
                <motion.div
                  key={concept.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="bg-white/5 border border-white/8 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-syne font-bold text-white text-xs">{concept.title}</p>
                    <span className="text-[9px] font-dm text-coral bg-coral/10 px-2 py-0.5 rounded-full">{concept.tag}</span>
                  </div>
                  <p className="font-dm text-white/50 text-[11px] leading-relaxed mb-3">{concept.desc}</p>
                  <button
                    onClick={() => handleGenerate(concept)}
                    disabled={loading}
                    className="w-full bg-white/8 hover:bg-white/12 border border-white/10 text-white/60 text-xs font-dm py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    {loading && generated?.title === concept.title
                      ? <><Sparkles size={11} className="animate-spin" /> Generating…</>
                      : <><Video size={11} /> Preview Concept</>
                    }
                  </button>
                </motion.div>
              ))}
            </div>

            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-coral/10 border border-coral/25 rounded-xl p-4 text-center"
              >
                <Check size={16} className="text-coral mx-auto mb-2" />
                <p className="font-syne font-bold text-white text-xs mb-1">Concept Queued: {generated.title}</p>
                <p className="font-dm text-white/50 text-[10px]">Add Higgsfield API key in settings to generate video.</p>
                <a
                  href="https://higgsfield.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-coral text-[10px] font-dm mt-2 hover:underline"
                >
                  Get Higgsfield API <ArrowRight size={9} />
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="font-caveat text-white/50 text-2xl mb-4">Ready to work together?</p>
          <a
            href="https://instagram.com/zyana_loire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-coral to-[#E1306C] text-white font-syne font-bold text-sm px-10 py-4 rounded-full hover:opacity-90 transition-opacity shadow-[0_0_40px_rgba(255,107,107,0.3)]"
          >
            <Instagram size={16} />
            Follow @zyana_loire — DM "BUNDLE"
          </a>
          <p className="font-dm text-white/25 text-xs mt-3">Built with ManyChat · Instant response guaranteed</p>
        </motion.div>
      </div>
    </section>
  )
}
