#!/usr/bin/env node
import 'dotenv/config'
import { searchScraper } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'
import { writeFileSync } from 'fs'

const API_KEY = process.env.SGAI_API_KEY
const QUERY   = process.env.LEAD_SEARCH || 'Toronto restaurants with online booking contact email phone number'

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Lead Generation Pipeline'))
console.log(chalk.gray('  Query: ' + QUERY + '\n'))

async function runLeadGen() {

  // ── STEP 1: Search ────────────────────────────────────────────────────────
  const s1 = ora('  Step 1/2  Searching the web for matching businesses...').start()
  let results = []
  try {
    const raw = await searchScraper(
      API_KEY,
      `Find businesses matching this description. For each extract: business_name, website, phone, email, address, booking_system. ${QUERY}`,
      10
    )
    results = Array.isArray(raw) ? raw : [raw]
    s1.succeed(chalk.green(`  Step 1/2  Found ${results.length} results`))
  } catch (e) {
    s1.fail(chalk.red('  Step 1/2  Failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 2: Export CSV ────────────────────────────────────────────────────
  const s2 = ora('  Step 2/2  Exporting CSV...').start()
  const csvRows = [
    'Business Name,Website,Phone,Email,Address,Booking System,Notes',
    ...results.map(l => [
      `"${l?.business_name || l?.name || ''}"`,
      `"${l?.website || l?.url || ''}"`,
      `"${l?.phone || l?.phone_number || ''}"`,
      `"${l?.email || l?.email_address || ''}"`,
      `"${l?.address || ''}"`,
      `"${l?.booking_system || ''}"`,
      `"Zyana AI automation prospect"`
    ].join(','))
  ]
  writeFileSync('./leads-output.csv', csvRows.join('\n'), 'utf8')
  s2.succeed(chalk.green('  Step 2/2  Exported → leads-output.csv'))

  // ── DISPLAY ───────────────────────────────────────────────────────────────
  console.log('\n' + chalk.bold.white('  ─── LEADS FOUND ────────────────────────────────────────'))
  results.slice(0, 8).forEach((l, i) => {
    console.log(`\n  ${chalk.bold.cyan(i + 1 + '.')} ${l?.business_name || l?.name || 'Unknown'}`)
    if (l?.website || l?.url)         console.log(chalk.gray('     Website:  ') + (l?.website || l?.url))
    if (l?.phone || l?.phone_number)  console.log(chalk.gray('     Phone:    ') + (l?.phone || l?.phone_number))
    if (l?.email || l?.email_address) console.log(chalk.gray('     Email:    ') + (l?.email || l?.email_address))
    if (l?.booking_system)            console.log(chalk.gray('     System:   ') + l.booking_system)
  })
  if (results.length > 8) console.log(chalk.gray(`\n  ... and ${results.length - 8} more in leads-output.csv`))

  console.log('\n' + chalk.bold.green('  ✓ Lead gen complete.'))
  console.log(chalk.gray('  Import leads-output.csv into n8n for outreach.\n'))

  return results
}

runLeadGen().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
