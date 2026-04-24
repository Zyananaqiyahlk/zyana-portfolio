import React, { useEffect } from 'react'
import { Instagram, Linkedin, Facebook, Globe, Music2, Github } from 'lucide-react'
import Hero from './sections/Hero'
import Services from './sections/Services'
import Products from './sections/Products'
import UGCPortfolio from './sections/UGCPortfolio'
import UGCBrandPortfolio from './sections/UGCBrandPortfolio'
import MetaCTA from './sections/MetaCTA'

const FOOTER_SOCIALS = [
  { icon: Instagram, label: 'Instagram',  href: 'https://instagram.com/zyana_loire',               color: '#E1306C' },
  { icon: Music2,    label: 'TikTok',     href: 'https://www.tiktok.com/@zyanasystemsco',          color: '#ffffff' },
  { icon: Linkedin,  label: 'LinkedIn',   href: 'https://www.linkedin.com/company/zyana-systems-co', color: '#0A66C2' },
  { icon: Facebook,  label: 'Facebook',   href: 'https://www.facebook.com/profile.php?id=61578526426615', color: '#1877F2' },
  { icon: Globe,     label: 'Website',    href: 'https://zyanacosystems.com',                      color: '#87A878' },
  { icon: Github,    label: 'GitHub',     href: 'https://github.com/Zyananaqiyahlk',               color: '#ffffff' },
]

function Footer() {
  return (
    <footer className="bg-midnight border-t border-white/5 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <div>
            <p className="font-syne font-bold text-white text-sm">Naqiyah Lakdawala</p>
            <p className="font-dm text-white/30 text-xs">AI Automation Specialist · UGC Creator · Day 10 of 90</p>
          </div>
          {/* Social icon row */}
          <div className="flex items-center gap-2">
            {FOOTER_SOCIALS.map(({ icon: Icon, label, href, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-9 h-9 rounded-full bg-white/6 hover:bg-white/14 border border-white/8 flex items-center justify-center transition-all hover:scale-110 group"
              >
                <Icon size={14} className="text-white/40 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
          <p className="font-dm text-white/20 text-[10px]">© 2025 Zyana Systems</p>
        </div>
        {/* Link bar */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 border-t border-white/5 pt-5">
          {FOOTER_SOCIALS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="font-dm text-white/25 text-[11px] hover:text-white/60 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  // Scroll reveal — adds .visible class when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '-50px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Products />
      <UGCPortfolio />
      <UGCBrandPortfolio />
      <MetaCTA />
      <Footer />
    </div>
  )
}
