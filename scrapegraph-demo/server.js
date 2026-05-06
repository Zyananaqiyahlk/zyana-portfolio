import 'dotenv/config'
import express from 'express'
import { scrape, extract, search } from 'scrapegraph-js'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3333

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const API_KEY = process.env.SGAI_API_KEY

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error('\n  ERROR: SGAI_API_KEY not set in .env')
  console.error('  Get your key at https://dashboard.scrapegraphai.com\n')
}

// ── Brand research ────────────────────────────────────────────────────────────
app.post('/api/brand-research', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'url required' })
  try {
    const [mdResult, extractResult] = await Promise.all([
      scrape(API_KEY, { url, format: 'markdown' }),
      extract(API_KEY, {
        url,
        prompt: 'Extract: brand name, mission statement, core values (list), target customer, sustainability or giving model claims, product categories (list), price range, creator/ambassador program details.',
      })
    ])
    if (mdResult.error) throw new Error(mdResult.error.message || JSON.stringify(mdResult.error))
    if (extractResult.error) throw new Error(extractResult.error.message || JSON.stringify(extractResult.error))
    res.json({
      success: true,
      markdown: String(mdResult.data?.result || mdResult.data || '').slice(0, 2000),
      brand: extractResult.data?.result || extractResult.data || {}
    })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

// ── Lead gen ──────────────────────────────────────────────────────────────────
app.post('/api/lead-gen', async (req, res) => {
  const { query } = req.body
  if (!query) return res.status(400).json({ error: 'query required' })
  try {
    const result = await search(API_KEY, {
      query: `Find businesses and extract: name, website, phone, email, address, booking system. ${query}`,
      limit: 10,
    })
    if (result.error) throw new Error(result.error.message || JSON.stringify(result.error))
    const raw = result.data?.result || result.data || []
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
    const result = await extract(API_KEY, {
      url: blogUrl,
      prompt: 'Extract all blog posts: title, date, URL, topic, 1-sentence summary. Return as JSON array.',
    })
    if (result.error) throw new Error(result.error.message || JSON.stringify(result.error))
    const raw = result.data?.result || result.data || []
    res.json({ success: true, posts: Array.isArray(raw) ? raw : [raw] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`\n  Zyana × ScrapeGraph demo → http://localhost:${PORT}`)
  console.log(`  API key: ${API_KEY && API_KEY !== 'your-api-key-here' ? 'set ✓' : 'MISSING — add to .env'}\n`)
})
