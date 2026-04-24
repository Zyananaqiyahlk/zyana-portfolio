import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { Play, Smartphone, Monitor, Tablet, Headphones, Watch,
         ExternalLink, Film, X, MoveHorizontal } from 'lucide-react'

// ─── Replace videoUrl with your actual video links ───────────────────────────
// YouTube:   https://www.youtube.com/embed/VIDEO_ID
// TikTok:    use the TikTok video page URL (opens in new tab)
// Instagram: use the post URL (opens in new tab)
// ─────────────────────────────────────────────────────────────────────────────
const REELS = [
  {
    id: 1,
    device: 'iPhone 17 Pro',
    product: 'Lip Gloss That Works',
    brand: 'Beauty & Skincare',
    hook: '"Introducing my new secret weapon for cracked lips."',
    duration: '0:47',
    platform: 'Reels',
    gradient: 'from-coral/40 to-midnight',
    accent: '#FF6B6B',
    icon: Smartphone,
    videoUrl: '/videos/Lipgloss.mp4',
    embedType: 'video',
    externalUrl: 'https://instagram.com/zyana_loire',
  },
  {
    id: 2,
    device: 'MacBook Pro M3',
    product: 'AI Agency Workflow',
    brand: 'Tech — Productivity',
    hook: '"3 AI agents. 1 laptop. Zero manual work."',
    duration: '0:58',
    platform: 'TikTok',
    gradient: 'from-sage/40 to-midnight',
    accent: '#87A878',
    icon: Monitor,
    videoUrl: '/videos/MacbookPro.mp4',
    embedType: 'video',
    externalUrl: 'https://www.tiktok.com/@zyanasystemsco',
  },
  {
    id: 3,
    device: 'Luxury Unboxing',
    product: 'Brand Unboxing',
    brand: 'Lifestyle — Fashion',
    hook: '"The unbox that stopped my scroll."',
    duration: '0:42',
    platform: 'YouTube Shorts',
    gradient: 'from-gold/40 to-midnight',
    accent: '#C9A84C',
    icon: Tablet,
    videoUrl: '/videos/UnBoxingmp4.mp4',
    embedType: 'video',
    externalUrl: 'https://www.tiktok.com/@zyanasystemsco',
  },
  {
    id: 4,
    device: 'AirPods Pro',
    product: 'AirBuds Experience',
    brand: 'Lifestyle — Audio',
    hook: '"Sound so clean it feels illegal."',
    duration: '0:35',
    platform: 'Reels',
    gradient: 'from-offwhite-deep/60 to-[#D4C4A0]',
    accent: '#C9A84C',
    icon: Headphones,
    videoUrl: '/videos/AirBuds.mp4',
    embedType: 'video',
    externalUrl: 'https://instagram.com/zyana_loire',
  },
  {
    id: 5,
    device: 'Hotel Lifestyle',
    product: 'Luxury Staycation',
    brand: 'Travel & Wellness',
    hook: '"A 5-star staycation experience, visualized."',
    duration: '0:31',
    platform: 'TikTok',
    gradient: 'from-midnight to-[#2C2C2E]',
    accent: '#FF6B6B',
    icon: Watch,
    videoUrl: '/videos/Staycation.mp4',
    embedType: 'video',
    externalUrl: 'https://www.tiktok.com/@zyanasystemsco',
  },
]

const PLATFORM_COLORS = {
  Reels: 'bg-[#E1306C]/15 text-[#E1306C]',
  TikTok: 'bg-midnight/10 text-midnight',
  'YouTube Shorts': 'bg-[#FF0000]/10 text-[#FF0000]',
}

// ─── Individual draggable phone card ─────────────────────────────────────────
function PhoneCard({ reel, index, onOpen }) {
  const Icon = reel.icon

  // Staggered float: each phone bobs at a slightly different rate/offset
  const floatDuration = 2.2 + index * 0.35
  const floatDelay   = index * 0.45

  return (
    <motion.div
      className="flex flex-col items-center select-none"
      // Smooth gentle float — not too aggressive
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1],
        delay: floatDelay,
      }}
      whileHover={{ scale: 1.05, y: -14 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onOpen(reel)}
      style={{ cursor: 'pointer' }}
    >
      {/* iPhone shell */}
      <div
        className="relative w-32 sm:w-36 rounded-[32px] overflow-hidden
          shadow-[0_0_0_2px_#3A3A3C,0_0_0_4px_#1C1C1E,0_24px_60px_rgba(0,0,0,0.35)]
          hover:shadow-[0_0_0_3px_rgba(255,107,107,0.5),0_32px_80px_rgba(255,107,107,0.2)]
          transition-shadow duration-300"
        style={{ aspectRatio: '9/19.5', background: '#000' }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-4 bg-black rounded-full z-20" />

        {/* Real video thumbnail — seeks to 1s for a clean preview frame */}
        <video
          src={reel.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
          style={{ pointerEvents: 'none' }}
          onLoadedMetadata={e => { e.target.currentTime = 1 }}
        />

        {/* Subtle dark gradient at bottom so text/icons stay readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10" />

        {/* Bottom info bar */}
        <div className="absolute bottom-5 left-3 right-3 z-20">
          <p className="font-caveat text-white text-[10px] leading-snug mb-2 line-clamp-2">
            {reel.hook}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-dm text-[8px] text-white/50">{reel.duration}</span>
            {/* Play button */}
            <div className="w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-md">
              <Play size={8} fill="#1C1C1E" className="text-midnight ml-0.5" />
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-full h-[2px] bg-white/20 rounded-full mt-1.5">
            <div className="w-0 h-full rounded-full" style={{ background: reel.accent }} />
          </div>
        </div>


        {/* Physical buttons */}
        <div className="absolute right-0 top-16 w-[3px] h-8 bg-[#3A3A3C] rounded-l-sm z-10" />
        <div className="absolute left-0 top-12 w-[3px] h-5 bg-[#3A3A3C] rounded-r-sm z-10" />
        <div className="absolute left-0 top-20 w-[3px] h-5 bg-[#3A3A3C] rounded-r-sm z-10" />
      </div>

      {/* Label */}
      <div className="mt-3 text-center">
        <p className="font-syne font-bold text-midnight text-[11px]">{reel.product}</p>
        <span className={`text-[9px] font-dm font-medium px-2 py-0.5 rounded-full ${PLATFORM_COLORS[reel.platform]}`}>
          {reel.platform}
        </span>
      </div>
    </motion.div>
  )
}

// ─── Dive-in video modal ──────────────────────────────────────────────────────
function VideoModal({ reel, onClose }) {
  if (!reel) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-midnight/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Phone frame that "dives in" — scales from tiny to full */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.15, opacity: 0, y: 60 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.15, opacity: 0, y: 60 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Bouncy iPhone frame around the video */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative rounded-[40px] overflow-hidden
            shadow-[0_0_0_3px_#3A3A3C,0_0_0_6px_#1C1C1E,0_40px_120px_rgba(0,0,0,0.6)]"
          style={{
            width: 'min(340px, 85vw)',
            aspectRatio: '9/19.5',
            background: '#000',
          }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-[#1A1A1A] border border-[#2A2A2A]" />
          </div>

          {/* Video — zoom reveal */}
          <motion.div
            className="absolute inset-0 pt-14 pb-4"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          >
            {reel.embedType === 'video' ? (
              // Native local video — plays perfectly in browser
              <video
                src={reel.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
                loop
              />
            ) : reel.embedType === 'youtube' ? (
              // YouTube embed
              <iframe
                src={`${reel.videoUrl}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
                title={reel.product}
              />
            ) : (
              // Higgsfield / external: styled screen + big watch button
              <div className={`w-full h-full bg-gradient-to-b ${reel.gradient} flex flex-col items-center justify-center gap-5 px-5`}>
                {/* Cinematic "screen on" shimmer */}
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shadow-xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <reel.icon size={22} style={{ color: reel.accent }} />
                </motion.div>

                <p className="font-caveat text-white text-base text-center leading-snug font-semibold">
                  {reel.hook}
                </p>

                {/* Primary watch button */}
                <motion.a
                  href={reel.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-2 font-syne font-bold text-sm px-5 py-2.5 rounded-full text-midnight shadow-lg"
                  style={{ background: reel.accent }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Play size={13} fill="currentColor" /> Watch Video
                </motion.a>

                <p className="font-dm text-white/40 text-[9px] text-center">
                  Opens on Higgsfield ↗
                </p>
              </div>
            )}
          </motion.div>

          {/* Physical buttons */}
          <div className="absolute right-0 top-24 w-1 h-12 bg-[#3A3A3C] rounded-l-sm" />
          <div className="absolute left-0 top-20 w-1 h-8 bg-[#3A3A3C] rounded-r-sm" />
          <div className="absolute left-0 top-32 w-1 h-8 bg-[#3A3A3C] rounded-r-sm" />
        </motion.div>

        {/* Info below phone */}
        <motion.div
          className="mt-5 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-syne font-bold text-white text-base">{reel.product}</p>
          <p className="font-dm text-white/50 text-xs mt-1">{reel.brand} · {reel.duration}</p>
          <a
            href={reel.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-coral font-dm text-xs hover:underline"
          >
            <ExternalLink size={11} />
            {reel.embedType === 'higgsfield' ? 'Open on Higgsfield ↗' : `Open on ${reel.platform} ↗`}
          </a>
        </motion.div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={15} />
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function UGCPortfolio() {
  const [openReel, setOpenReel] = useState(null)
  const dragRef = useRef(null)

  return (
    <section id="portfolio" className="bg-offwhite py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-midnight/8 text-midnight/60 text-xs font-dm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Film size={11} /> UGC Portfolio
          </span>
          <h2 className="font-syne font-extrabold text-midnight text-4xl lg:text-5xl mb-4">
            Real Devices.
            <br />
            <span className="text-gradient-coral">Real Founder. Real Story.</span>
          </h2>
          <p className="font-dm text-[#6C6C70] text-lg max-w-lg mx-auto">
            Every video is filmed on my actual setup. Tap any phone to watch — or drag to explore.
          </p>
        </motion.div>

        {/* Drag hint label */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-6 text-midnight/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{ x: [-6, 6, -6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MoveHorizontal size={14} />
          </motion.div>
          <span className="font-dm text-xs tracking-wide">drag · tap to watch</span>
          <motion.div
            animate={{ x: [6, -6, 6] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <MoveHorizontal size={14} />
          </motion.div>
        </motion.div>

        {/* Draggable phone row */}
        <div className="overflow-hidden pb-4" ref={dragRef}>
          <motion.div
            drag="x"
            dragConstraints={dragRef}
            dragElastic={0.15}
            className="flex items-end gap-6 lg:gap-10 cursor-grab active:cursor-grabbing w-max mx-auto px-6"
            whileDrag={{ cursor: 'grabbing' }}
          >
            {REELS.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <PhoneCard
                  reel={reel}
                  index={i}
                  onOpen={setOpenReel}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Brand pitch CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="font-dm text-[#6C6C70] text-sm mb-4">Want content like this for your brand?</p>
          <a
            href="https://instagram.com/zyana_loire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-midnight text-white font-syne font-bold text-sm px-8 py-3.5 rounded-full hover:bg-midnight/80 transition-colors"
          >
            <ExternalLink size={14} />
            DM "COLLAB" on Instagram
          </a>
        </motion.div>
      </div>

      {/* Video dive-in modal */}
      <AnimatePresence>
        {openReel && (
          <VideoModal reel={openReel} onClose={() => setOpenReel(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
