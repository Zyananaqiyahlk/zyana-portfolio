#!/usr/bin/env node
import 'dotenv/config'
import { smartScraper } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'
import { writeFileSync, readFileSync, existsSync } from 'fs'

const API_KEY        = process.env.SGAI_API_KEY
const COMPETITOR_URL = process.env.COMPETITOR_URL || 'https://vuori.com'
const CACHE_FILE     = './competitor-last-run.json'

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Competitor Intelligence Pipeline'))
console.log(chalk.gray('  Target: ' + COMPETITOR_URL + '\n'))

async function runCompetitorIntel() {

  // ── STEP 1: Load previous run ─────────────────────────────────────────────
  let previousPosts = []
  if (existsSync(CACHE_FILE)) {
    try {
      const cached = JSON.parse(readFileSync(CACHE_FILE, 'utf8'))
      previousPosts = cached.posts || []
      console.log(chalk.gray(`  Previous run: ${cached.date} — ${previousPosts.length} posts tracked`))
    } catch {}
  }

  // ── STEP 2: Scrape blog ───────────────────────────────────────────────────
  const s2 = ora('  Step 1/3  Scraping competitor content...').start()
  let posts = []
  const tryUrls = [
    COMPETITOR_URL.replace(/\/$/, '') + '/blogs/news',
    COMPETITOR_URL.replace(/\/$/, '') + '/blog',
    COMPETITOR_URL,
  ]
  for (const url of tryUrls) {
    try {
      const raw = await smartScraper(
        API_KEY,
        'Extract all blog posts or articles as a JSON array. For each: title, publish_date, url, topic, summary (1 sentence).',
        url
      )
      posts = Array.isArray(raw) ? raw : [raw]
      s2.succeed(chalk.green(`  Step 1/3  ${posts.length} posts found at ${url}`))
      break
    } catch (e) {
      if (url === tryUrls[tryUrls.length - 1])
        s2.warn(chalk.yellow('  Step 1/3  All paths failed — ' + e.message.slice(0, 60)))
    }
  }

  // ── STEP 3: Diff ──────────────────────────────────────────────────────────
  const s3 = ora('  Step 2/3  Finding new posts since last run...').start()
  const prevTitles = new Set(previousPosts.map(p => (p?.title || '').toLowerCase().trim()))
  const newPosts   = posts.filter(p => !prevTitles.has((p?.title || '').toLowerCase().trim()))
  s3.succeed(chalk.green(`  Step 2/3  ${newPosts.length} new posts`))

  // ── STEP 4: Topic analysis ────────────────────────────────────────────────
  const s4 = ora('  Step 3/3  Topic analysis...').start()
  const topics      = posts.map(p => p?.topic || p?.category).filter(Boolean)
  const topicCounts = topics.reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc }, {})
  const topTopics   = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]).slice(0, 5)
  s4.succeed(chalk.green('  Step 3/3  Done'))

  writeFileSync(CACHE_FILE, JSON.stringify({ date: new Date().toISOString(), posts }), 'utf8')

  // ── DISPLAY ───────────────────────────────────────────────────────────────
  console.log('\n' + chalk.bold.white('  ─── COMPETITOR ANALYSIS ────────────────────────────────'))
  console.log(chalk.gray('\n  Competitor:  ') + COMPETITOR_URL)
  console.log(chalk.gray('  Total posts: ') + posts.length)
  console.log(chalk.gray('  New posts:   ') + chalk.yellow(newPosts.length))

  if (newPosts.length > 0) {
    console.log(chalk.cyan('\n  New posts:'))
    newPosts.slice(0, 5).forEach((p, i) => {
      console.log(`\n  ${chalk.bold(i + 1 + '.')} ${p?.title || 'Untitled'}`)
      if (p?.publish_date || p?.date) console.log(chalk.gray('     Date:    ') + (p.publish_date || p.date))
      if (p?.topic)   console.log(chalk.gray('     Topic:   ') + p.topic)
      if (p?.summary) console.log(chalk.gray('     Summary: ') + p.summary)
    })
  } else {
    console.log(chalk.green('\n  No new posts since last run.'))
  }

  if (topTopics.length) {
    console.log(chalk.cyan('\n  Their top topics:'))
    topTopics.forEach(([t, n]) => console.log(chalk.gray('  · ') + t + chalk.gray(` (${n})`)))
  }

  console.log(chalk.cyan('\n  Content gaps for Zyana:'))
  [
    'AI-powered business automation',
    'Toronto / Canada business stories',
    'Female founder + tech content',
    'Behind-the-scenes AI studio content',
  ].forEach(g => console.log(chalk.gray('  ↗ ') + g))

  console.log('\n' + chalk.bold.green('  ✓ Competitor intel complete.'))
  console.log(chalk.gray('  Cached to competitor-last-run.json\n'))

  return { posts, newPosts, topTopics }
}

runCompetitorIntel().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
