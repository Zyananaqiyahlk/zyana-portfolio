import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowDown, Instagram, Zap, Linkedin, Facebook, Globe, Music2 } from 'lucide-react'

const SOCIALS = [
  { icon: Instagram,  label: '@zyana_loire',        href: 'https://instagram.com/zyana_loire',                     color: '#E1306C' },
  { icon: Music2,     label: 'TikTok',              href: 'https://www.tiktok.com/@zyanasystemsco',               color: '#ffffff' },
  { icon: Linkedin,   label: 'LinkedIn',            href: 'https://www.linkedin.com/company/zyana-systems-co',    color: '#0A66C2' },
  { icon: Facebook,   label: 'Facebook',            href: 'https://www.facebook.com/profile.php?id=61578526426615', color: '#1877F2' },
  { icon: Globe,      label: 'zyanacosystems.com',  href: 'https://zyanacosystems.com',                           color: '#87A878' },
]

// Individual draggable device — each has its own drag state
function DraggableDevice({ children, initialX, initialY, zBase, label, accentColor }) {
  const [isDragging, setIsDragging] = useState(false)
  const [lifted, setLifted] = useState(false)
  const constraintsRef = useRef(null)

  return (
    <motion.div
      drag
      dragMomentum={true}
      dragElastic={0.12}
      dragTransition={{ bounceStiffness: 180, bounceDamping: 20 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      whileDrag={{
        scale: 1.08,
        zIndex: 60,
        filter: `drop-shadow(0 30px 60px ${accentColor}55)`,
        rotate: 2,
      }}
      whileHover={{ scale: 1.04, zIndex: 50 }}
      onHoverStart={() => setLifted(true)}
      onHoverEnd={() => setLifted(false)}
      className="absolute device-drag select-none"
      style={{ left: initialX, top: initialY, zIndex: zBase }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: lifted || isDragging ? 1 : 0, y: lifted || isDragging ? 0 : 6 }}
        transition={{ duration: 0.2 }}
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span
          className="text-[10px] font-dm font-semibold px-2.5 py-1 rounded-full shadow-lg"
          style={{ background: accentColor, color: '#fff' }}
        >
          {isDragging ? 'Dropping…' : label}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const sceneRef = useRef(null)

  return (
    <section id="hero" className="relative min-h-screen bg-midnight flex flex-col overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-coral/25 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-48 w-[400px] h-[400px] bg-sage/20 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-gold/18 rounded-full blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-coral to-gold flex items-center justify-center shadow-lg shadow-coral/30">
            <Zap size={14} className="text-white" />
          </div>
          <span className="font-syne font-bold text-white text-sm tracking-wide">ZYANA SYSTEMS</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-5">
          {['Series', 'Services', 'Products', 'Portfolio'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs font-dm text-white/55 hover:text-white transition-colors tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Social icons row */}
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 border border-white/10 flex items-center justify-center transition-all hover:scale-110"
              style={{ '--hover-color': color }}
            >
              <Icon size={13} className="text-white/60 hover:text-white transition-colors" />
            </a>
          ))}
          <a
            href="https://instagram.com/zyana_loire"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 flex items-center gap-1.5 bg-coral hover:bg-coral-dark text-white text-xs font-dm font-semibold px-4 py-2 rounded-full transition-all hover:shadow-[0_0_20px_rgba(255,107,107,0.5)]"
          >
            <Instagram size={11} />
            Follow
          </a>
        </div>
      </nav>

      {/* Hero body */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center gap-10 px-8 py-12 max-w-7xl mx-auto w-full">

        {/* Left — copy */}
        <div className="flex-1 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-coral/15 border border-coral/35 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-coral text-xs font-dm font-semibold tracking-wide">Toronto-based · UGC + AI Content Studio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-syne font-extrabold text-white text-5xl lg:text-[3.6rem] leading-[1.04] mb-5"
          >
            AI Founder.
            <br />
            <span className="text-gradient-coral">Content Creator.</span>
            <br />
            Your Next
            <br />
            <span style={{ color: '#87A878' }}>Brand Partner.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="font-dm text-white/60 text-lg leading-relaxed mb-8"
          >
            I'm Naqiyah — UGC creator & AI content studio founder based in Toronto.
            Authentic short-form video for brands with a mission. Filmed on real devices, delivered in 48 hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <a
              href="#portfolio"
              className="bg-coral hover:bg-coral-dark text-white font-syne font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:shadow-[0_0_30px_rgba(255,68,68,0.45)]"
            >
              See My Work →
            </a>
            <a
              href="mailto:naqiyahlk@gmail.com"
              className="border border-white/20 hover:border-coral/50 text-white/80 hover:text-white font-dm text-sm px-7 py-3.5 rounded-full transition-colors"
            >
              Work With Me
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-8"
          >
            {[
              { value: '5+',  label: 'Brand Niches' },
              { value: '48h', label: 'Delivery Time' },
              { value: '2x',  label: 'Free Revisions' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-syne font-extrabold text-white text-3xl leading-none">{value}</p>
                <p className="font-dm text-white/35 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Social proof row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            {SOCIALS.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-white/6 hover:bg-white/12 border border-white/8 rounded-full px-3 py-1.5 transition-all group"
              >
                <Icon size={11} className="text-white/50 group-hover:text-white transition-colors" />
                <span className="font-dm text-[10px] text-white/50 group-hover:text-white/80 transition-colors">{label}</span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right — draggable Apple device playground */}
        <motion.div
          ref={sceneRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 relative"
          style={{ height: '480px', minWidth: '380px', maxWidth: '480px' }}
        >
          {/* Instruction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute top-0 left-1/2 -translate-x-1/2 text-white/25 text-[10px] font-dm tracking-widest uppercase whitespace-nowrap z-10"
          >
            ✦ Drag the devices ✦
          </motion.p>

          {/* Orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-64 h-64 rounded-full border border-dashed border-white/6 animate-spin" style={{ animationDuration: '25s' }} />
            <div className="absolute w-80 h-80 rounded-full border border-dashed border-white/[0.04]" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
            <div className="absolute w-40 h-40 rounded-full border border-coral/10" />
          </div>

          {/* ── MacBook ── */}
          <DraggableDevice initialX={20} initialY={60} zBase={10} label="MacBook Pro M3" accentColor="#87A878">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="w-52 h-36 rounded-xl overflow-hidden shadow-2xl"
              style={{ background: 'linear-gradient(135deg, #E8E8ED, #C7C7CC)' }}
            >
              {/* Lid / screen */}
              <div className="h-[85%] bg-[#1C1C1E] flex flex-col p-2">
                {/* Traffic lights */}
                <div className="flex gap-1 mb-1.5">
                  {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
                    <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                {/* "Screen" content */}
                <div className="flex-1 rounded-md bg-[#0A0A0B] p-1.5 overflow-hidden">
                  <div className="flex gap-1 mb-1">
                    <div className="w-10 h-1.5 rounded bg-coral/70" />
                    <div className="w-6 h-1.5 rounded bg-white/10" />
                  </div>
                  {[70,50,60,40].map((w,i) => (
                    <div key={i} className="h-1 rounded mb-0.5 opacity-60" style={{ width: `${w}%`, background: i % 2 === 0 ? '#87A878' : '#C9A84C' }} />
                  ))}
                  <div className="mt-1.5 flex gap-1">
                    <div className="w-5 h-3 rounded bg-coral/30" />
                    <div className="w-8 h-3 rounded bg-sage/20" />
                  </div>
                </div>
              </div>
              {/* Base */}
              <div className="h-[15%] bg-[#D1D1D6] rounded-b-xl flex items-center justify-center">
                <div className="w-12 h-1 bg-[#B8B8BC] rounded-full" />
              </div>
            </motion.div>
          </DraggableDevice>

          {/* ── iPhone ── */}
          <DraggableDevice initialX={200} initialY={40} zBase={20} label="iPhone 15 Pro" accentColor="#FF6B6B">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-[170px] rounded-[28px] overflow-hidden shadow-2xl"
              style={{
                background: '#2C2C2E',
                boxShadow: '0 0 0 2px #3A3A3C, 0 0 0 4px #1C1C1E, 0 20px 60px rgba(255,107,107,0.3)',
              }}
            >
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-10 flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1A1A1A] border border-[#333]" />
              </div>
              {/* Screen */}
              <div className="absolute inset-0 bg-gradient-to-b from-coral/40 via-[#2C2C2E] to-[#1C1C1E] flex flex-col items-center justify-center pt-6 pb-4 px-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center mb-2">
                  <Zap size={14} className="text-coral" />
                </div>
                <p className="font-syne font-bold text-white text-[9px] text-center leading-tight">Zyana</p>
                <p className="font-dm text-white/40 text-[7px] text-center">Content Agent</p>
                {/* Mini lock screen widgets */}
                <div className="absolute bottom-4 left-3 right-3 flex gap-1">
                  {['#FF6B6B40','#87A87840','#C9A84C40'].map((bg, i) => (
                    <div key={i} className="flex-1 h-5 rounded-lg opacity-60" style={{ background: bg }} />
                  ))}
                </div>
              </div>
              {/* Side button */}
              <div className="absolute right-0 top-14 w-1 h-8 bg-[#3A3A3C] rounded-l-sm" />
              <div className="absolute left-0 top-10 w-1 h-5 bg-[#3A3A3C] rounded-r-sm" />
              <div className="absolute left-0 top-18 w-1 h-5 bg-[#3A3A3C] rounded-r-sm" />
            </motion.div>
          </DraggableDevice>

          {/* ── iPad ── */}
          <DraggableDevice initialX={120} initialY={160} zBase={5} label="iPad Pro M4" accentColor="#C9A84C">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-28 h-36 rounded-[18px] overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #D1D1D6, #AEAEB2)',
                boxShadow: '0 0 0 2px #AEAEB2, 0 20px 50px rgba(201,168,76,0.25)',
              }}
            >
              <div className="absolute inset-[3px] rounded-[15px] overflow-hidden bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E]">
                {/* Home screen */}
                <div className="absolute top-2 left-2 right-2 bottom-2 grid grid-cols-3 gap-1 content-start">
                  {[
                    { bg: '#FF6B6B', icon: '✦' },
                    { bg: '#87A878', icon: '◆' },
                    { bg: '#C9A84C', icon: '●' },
                    { bg: '#5E5CE6', icon: '▲' },
                    { bg: '#30D158', icon: '■' },
                    { bg: '#FF9F0A', icon: '✿' },
                  ].map((app, i) => (
                    <div key={i} className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: app.bg + '90' }}>
                      <span className="text-[8px] text-white">{app.icon}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Home bar */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/20 rounded-full" />
            </motion.div>
          </DraggableDevice>

          {/* ── AirPods ── */}
          <DraggableDevice initialX={30} initialY={260} zBase={15} label="AirPods Pro 2" accentColor="#F5ECD7">
            <motion.div
              animate={{ rotate: [0, 4, 0, -4, 0] }}
              transition={{ duration: 8, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-16 rounded-2xl shadow-xl flex flex-col items-center justify-evenly py-2"
              style={{ background: 'linear-gradient(135deg, #F5F5F7, #E8E8ED)', boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
            >
              {/* Two AirPod shapes */}
              {[0,1].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-4 h-5 rounded-full bg-white shadow-inner border border-[#D1D1D6]" />
                  <div className="w-1.5 h-3 bg-white rounded-full border border-[#D1D1D6] -mt-0.5" />
                </div>
              ))}
            </motion.div>
          </DraggableDevice>

          {/* ── Apple Watch ── */}
          <DraggableDevice initialX={290} initialY={220} zBase={15} label="Apple Watch Ultra 2" accentColor="#FF6B6B">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Band top */}
              <div className="w-10 h-4 bg-[#2C2C2E] rounded-t-lg mx-auto" />
              {/* Watch case */}
              <div
                className="w-14 h-16 rounded-[14px] overflow-hidden shadow-xl"
                style={{ background: 'linear-gradient(135deg, #1C1C1E, #3A3A3C)', boxShadow: '0 0 0 1.5px #48484A, 0 10px 40px rgba(255,107,107,0.2)' }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-1">
                  <p className="font-syne font-bold text-white text-[9px] leading-none">10:10</p>
                  <p className="font-dm text-white/40 text-[7px]">Day 10</p>
                  {/* Activity rings */}
                  <div className="relative w-8 h-8">
                    <svg viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="13" stroke="#FF6B6B22" strokeWidth="3" />
                      <circle cx="16" cy="16" r="13" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="65 17" strokeLinecap="round" transform="rotate(-90 16 16)" />
                      <circle cx="16" cy="16" r="9"  stroke="#87A87822" strokeWidth="3" />
                      <circle cx="16" cy="16" r="9"  stroke="#87A878" strokeWidth="3" strokeDasharray="45 11" strokeLinecap="round" transform="rotate(-90 16 16)" />
                      <circle cx="16" cy="16" r="5"  stroke="#C9A84C22" strokeWidth="3" />
                      <circle cx="16" cy="16" r="5"  stroke="#C9A84C" strokeWidth="3" strokeDasharray="25 6"  strokeLinecap="round" transform="rotate(-90 16 16)" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Band bottom */}
              <div className="w-10 h-4 bg-[#2C2C2E] rounded-b-lg mx-auto" />
              {/* Crown */}
              <div className="absolute right-0 top-5 w-1.5 h-4 bg-[#3A3A3C] rounded-r-sm" />
            </motion.div>
          </DraggableDevice>

          {/* ── Floating colour accent orbs ── */}
          {[
            { x: 160, y: 20, size: 8, color: '#FF6B6B', dur: 3 },
            { x: 350, y: 120, size: 6, color: '#87A878', dur: 4 },
            { x: 50,  y: 380, size: 5, color: '#C9A84C', dur: 5 },
            { x: 310, y: 360, size: 7, color: '#FF6B6B', dur: 3.5 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size, background: orb.color }}
              animate={{ y: [0, -12, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: orb.dur, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/25"
        >
          <p className="text-[10px] font-dm tracking-widest uppercase">Scroll</p>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
