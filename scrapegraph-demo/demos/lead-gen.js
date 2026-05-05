#!/usr/bin/env node
import 'dotenv/config'
import { searchscraper } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'
import { writeFileSync } from 'fs'

const API_KEY = process.env.SGAI_API_KEY
const QUERY = process.env.LEAD_SEARCH || 'Toronto restaurants with online booking contact email phone number'

if (!API_KEY) {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Lead Generation Pipeline'))
console.log(chalk.gray('  Query: ' + QUERY + '\n'))

async function runLeadGen() {
  // ── STEP 1: Search for leads ───────────────────────────────────────────
  const s1 = ora('  Step 1/2  Searching the web for matching businesses...').start()
  let results = []
  try {
    results = await searchscraper(
      API_KEY,
      `Find businesses matching this description and extract: business name, website URL, phone number, email address, physical address, and type of booking or contact system they use. Query: ${QUERY}`,
      20
    )
    s1.succeed(chalk.green(`  Step 1/2  Found ${Array.isArray(results) ? results.length : 'multiple'} results`))
  } catch (e) {
    s1.fail(chalk.red('  Step 1/2  Search failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 2: Format and export CSV ─────────────────────────────────────
  const s2 = ora('  Step 2/2  Formatting leads and exporting CSV...').start()

  const leads = Array.isArray(results) ? results : [results]
  const csvRows = [
    'Business Name,Website,Phone,Email,Address,Booking System,Notes',
    ...leads.map(l => [
      `"${l?.business_name || l?.name || ''}"`,
      `"${l?.website || l?.url || ''}"`,
      `"${l?.phone || ''}"`,
      `"${l?.email || ''}"`,
      `"${l?.address || ''}"`,
      `"${l?.booking_system || l?.contact_system || ''}"`,
      `"Zyana AI automation prospect"`
    ].join(','))
  ]

  const csvPath = './leads-output.csv'
  writeFileSync(csvPath, csvRows.join('\n'), 'utf8')
  s2.succeed(chalk.green(`  Step 2/2  CSV exported → ${csvPath}`))

  // ── DISPLAY RESULTS ───────────────────────────────────────────────────
  console.log('\n' + chalk.bold.white('  ─── LEADS FOUND ────────────────────────────────'))
  leads.slice(0, 8).forEach((lead, i) => {
    console.log(`\n  ${chalk.bold.cyan((i + 1) + '.')} ${lead?.business_name || lead?.name || 'Unknown'}`)
    if (lead?.website || lead?.url) console.log(chalk.gray('     Website:  ') + (lead?.website || lead?.url))
    if (lead?.phone)   console.log(chalk.gray('     Phone:    ') + lead.phone)
    if (lead?.email)   console.log(chalk.gray('     Email:    ') + lead.email)
    if (lead?.booking_system) console.log(chalk.gray('     System:   ') + lead.booking_system)
  })

  if (leads.length > 8) {
    console.log(chalk.gray(`\n  ... and ${leads.length - 8} more in leads-output.csv`))
  }

  console.log('\n' + chalk.bold.green('  ✓ Lead gen complete.'))
  console.log(chalk.gray('  Import leads-output.csv into n8n to trigger your outreach sequence.\n'))

  return leads
}

runLeadGen().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
