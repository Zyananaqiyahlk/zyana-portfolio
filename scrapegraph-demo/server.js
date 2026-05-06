import 'dotenv/config'
import express from 'express'
import { smartScraper, markdownify, searchScraper } from 'scrapegraph-js'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app  = express()
const PORT = 3333

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const API_KEY = process.env.SGAI_API_KEY

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.warn('\n  WARNING: SGAI_API_KEY not set — add it to .env')
  console.warn('  Get your key at https://dashboard.scrapegraphai.com\n')
}

// ── Brand research ───────────────────────────────────────────────────────────
app.post('/api/brand-research', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'url required' })
  try {
    const [md, brand] = await Promise.all([
      markdownify(API_KEY, url),
      smartScraper(
        API_KEY,
        'Extract as JSON: brand_name, mission_statement, core_values (array), target_customer, giving_model_claims, product_categories (array), price_range, ambassador_program.',
        url
      )
    ])
    res.json({
      success: true,
      markdown: String(md || '').slice(0, 2000),
      brand: brand || {}
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── Lead gen ─────────────────────────────────────────────────────────────────
app.post('/api/lead-gen', async (req, res) => {
  const { query } = req.body
  if (!query) return res.status(400).json({ error: 'query required' })
  try {
    const raw = await searchScraper(
      API_KEY,
      `Find businesses and extract: business_name, website, phone, email, address, booking_system. ${query}`,
      10
    )
    res.json({ success: true, leads: Array.isArray(raw) ? raw : [raw] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── Competitor intel ──────────────────────────────────────────────────────────
app.post('/api/competitor', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'url required' })
  try {
    const blogUrl = url.replace(/\/$/, '') + '/blogs/news'
    const raw = await smartScraper(
      API_KEY,
      'Extract all blog posts as a JSON array. For each: title, publish_date, url, topic, summary.',
      blogUrl
    )
    res.json({ success: true, posts: Array.isArray(raw) ? raw : [raw] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`\n  Zyana × ScrapeGraph → http://localhost:${PORT}`)
  console.log(`  API key: ${API_KEY && API_KEY !== 'your-api-key-here' ? 'set ✓' : 'MISSING — add to .env'}\n`)
})
