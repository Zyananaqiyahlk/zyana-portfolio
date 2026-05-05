import 'dotenv/config'
import express from 'express'
import { smartscraper, markdownify, searchscraper } from 'scrapegraph-js'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3333

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const API_KEY = process.env.SGAI_API_KEY

// ── API routes ────────────────────────────────────────────────────────────

app.post('/api/brand-research', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'url required' })
  try {
    const [markdown, brand] = await Promise.all([
      markdownify(API_KEY, url),
      smartscraper(
        API_KEY,
        'Extract: brand name, mission statement, core values (list), target customer, sustainability or giving model claims, product categories (list), price range, creator/ambassador program details.',
        url
      )
    ])
    res.json({ success: true, markdown: markdown?.slice(0, 2000), brand })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/api/lead-gen', async (req, res) => {
  const { query } = req.body
  if (!query) return res.status(400).json({ error: 'query required' })
  try {
    const results = await searchscraper(
      API_KEY,
      `Find businesses and extract: business name, website, phone, email, address, booking system. Query: ${query}`,
      10
    )
    res.json({ success: true, leads: Array.isArray(results) ? results : [results] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.post('/api/competitor', async (req, res) => {
  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'url required' })
  try {
    const blogUrl = url.replace(/\/$/, '') + '/blogs/news'
    const posts = await smartscraper(
      API_KEY,
      'Extract all blog posts: title, date, URL, topic, 1-sentence summary.',
      blogUrl
    )
    res.json({ success: true, posts: Array.isArray(posts) ? posts : [posts] })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(PORT, () => {
  console.log(`\n  Zyana × ScrapeGraph demo running at http://localhost:${PORT}`)
  console.log(`  API key: ${API_KEY ? 'set ✓' : 'MISSING — add to .env'}\n`)
})
