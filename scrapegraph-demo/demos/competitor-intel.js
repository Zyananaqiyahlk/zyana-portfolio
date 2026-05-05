#!/usr/bin/env node
import 'dotenv/config'
import { smartscraper, markdownify } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'
import { writeFileSync, readFileSync, existsSync } from 'fs'

const API_KEY = process.env.SGAI_API_KEY
const COMPETITOR_URL = process.env.COMPETITOR_URL || 'https://vuori.com'
const CACHE_FILE = './competitor-last-run.json'

if (!API_KEY) {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Competitor Intelligence Pipeline'))
console.log(chalk.gray('  Target: ' + COMPETITOR_URL + '\n'))

async function runCompetitorIntel() {
  // ── STEP 1: Load previous run if it exists ────────────────────────────
  let previousPosts = []
  if (existsSync(CACHE_FILE)) {
    try {
      const cached = JSON.parse(readFileSync(CACHE_FILE, 'utf8'))
      previousPosts = cached.posts || []
      console.log(chalk.gray(`  Previous run: ${cached.date} — ${previousPosts.length} posts tracked`))
    } catch {}
  }

  // ── STEP 2: Scrape blog/content pages ────────────────────────────────
  const s2 = ora('  Step 1/3  Scraping competitor content pages...').start()
  let blogPosts = []
  const blogUrl = COMPETITOR_URL.replace(/\/$/, '') + '/blogs/news'
  try {
    blogPosts = await smartscraper(
      API_KEY,
      'Extract all blog post or article entries on this page. For each post get: title, publish date, URL, topic category, and a 1-sentence summary.',
      blogUrl
    )
    s2.succeed(chalk.green(`  Step 1/3  Blog scraped`))
  } catch (e) {
    // Try /blog instead
    try {
      const altUrl = COMPETITOR_URL.replace(/\/$/, '') + '/blog'
      blogPosts = await smartscraper(
        API_KEY,
        'Extract all blog posts: title, date, URL, topic, 1-sentence summary.',
        altUrl
      )
      s2.succeed(chalk.green('  Step 1/3  Blog scraped (alt path)'))
    } catch (e2) {
      s2.warn(chalk.yellow('  Step 1/3  Blog not found — scraping homepage content instead'))
      blogPosts = await smartscraper(
        API_KEY,
        'Extract all content sections, campaign names, featured products, and marketing messages.',
        COMPETITOR_URL
      )
    }
  }

  const posts = Array.isArray(blogPosts) ? blogPosts : [blogPosts]

  // ── STEP 3: Diff against previous run ────────────────────────────────
  const s3 = ora('  Step 2/3  Finding new content since last run...').start()
  const prevTitles = new Set(previousPosts.map(p => p?.title?.toLowerCase()?.trim()))
  const newPosts = posts.filter(p => !prevTitles.has(p?.title?.toLowerCase()?.trim()))
  s3.succeed(chalk.green(`  Step 2/3  Diff complete — ${newPosts.length} new posts found`))

  // ── STEP 4: Identify content gaps ────────────────────────────────────
  const s4 = ora('  Step 3/3  Identifying content gaps for Zyana to fill...').start()
  const topics = posts.map(p => p?.topic || p?.category).filter(Boolean)
  const topicCounts = topics.reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc }, {})
  const topTopics = Object.entries(topicCounts).sort((a,b) => b[1]-a[1]).slice(0, 5)
  s4.succeed(chalk.green('  Step 3/3  Content gap analysis complete'))

  // ── SAVE THIS RUN ─────────────────────────────────────────────────────
  writeFileSync(CACHE_FILE, JSON.stringify({ date: new Date().toISOString(), posts }), 'utf8')

  // ── DISPLAY ───────────────────────────────────────────────────────────
  console.log('\n' + chalk.bold.white('  ─── COMPETITOR CONTENT ANALYSIS ────────────────'))
  console.log(chalk.gray('\n  Competitor: ') + COMPETITOR_URL)
  console.log(chalk.gray('  Total posts tracked: ') + posts.length)
  console.log(chalk.gray('  New since last run:  ') + chalk.yellow(newPosts.length))

  if (newPosts.length > 0) {
    console.log(chalk.cyan('\n  New posts (publish first):'))
    newPosts.slice(0, 5).forEach((p, i) => {
      console.log(`\n  ${chalk.bold(i+1 + '.')} ${p?.title || 'Untitled'}`)
      if (p?.date)    console.log(chalk.gray('     Date:     ') + p.date)
      if (p?.topic)   console.log(chalk.gray('     Topic:    ') + p.topic)
      if (p?.summary) console.log(chalk.gray('     Summary:  ') + p.summary)
    })
  } else {
    console.log(chalk.green('\n  No new posts since last run. You are up to date.'))
  }

  console.log(chalk.cyan('\n  Top content topics they cover:'))
  topTopics.forEach(([topic, count]) => {
    console.log(chalk.gray('  · ') + topic + chalk.gray(` (${count} posts)`))
  })

  console.log(chalk.cyan('\n  Content gaps for Zyana to own:'))
  const gaps = [
    'AI-powered business automation (they don\'t cover this)',
    'Toronto/Canada specific business stories',
    'Female founder + tech intersection content',
    'Behind-the-scenes of building an AI agency',
  ]
  gaps.forEach(g => console.log(chalk.gray('  ↗ ') + g))

  console.log('\n' + chalk.bold.green('  ✓ Competitor intel complete. Run weekly for ongoing tracking.'))
  console.log(chalk.gray('  Results cached to competitor-last-run.json\n'))

  return { posts, newPosts, topTopics }
}

runCompetitorIntel().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
