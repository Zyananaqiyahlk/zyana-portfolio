#!/usr/bin/env node
import 'dotenv/config'
import { search } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'
import { writeFileSync } from 'fs'

const API_KEY = process.env.SGAI_API_KEY
const QUERY = process.env.LEAD_SEARCH || 'Toronto restaurants with online booking contact email phone number'

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Lead Generation Pipeline'))
console.log(chalk.gray('  Query: ' + QUERY + '\n'))

async function runLeadGen() {

  // ── STEP 1: Search for leads ───────────────────────────────────────────────
  const s1 = ora('  Step 1/2  Searching the web for matching businesses...').start()
  let results = []
  try {
    const result = await search(API_KEY, {
      query: `Find businesses matching this description. Extract for each: business name, website URL, phone number, email address, physical address, and booking or contact system used. ${QUERY}`,
      limit: 10,
    })
    if (result.error) throw new Error(result.error.message || JSON.stringify(result.error))
    const raw = result.data?.result || result.data || []
    results = Array.isArray(raw) ? raw : [raw]
    s1.succeed(chalk.green(`  Step 1/2  Found ${results.length} results`))
  } catch (e) {
    s1.fail(chalk.red('  Step 1/2  Search failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 2: Export CSV ─────────────────────────────────────────────────────
  const s2 = ora('  Step 2/2  Formatting and exporting CSV...').start()
  const csvRows = [
    'Business Name,Website,Phone,Email,Address,Booking System,Notes',
    ...results.map(l => [
      `"${l?.business_name || l?.name || ''}"`,
      `"${l?.website || l?.url || ''}"`,
      `"${l?.phone || l?.phone_number || ''}"`,
      `"${l?.email || l?.email_address || ''}"`,
      `"${l?.address || l?.physical_address || ''}"`,
      `"${l?.booking_system || l?.contact_system || ''}"`,
      `"Zyana AI automation prospect"`
    ].join(','))
  ]
  const csvPath = './leads-output.csv'
  writeFileSync(csvPath, csvRows.join('\n'), 'utf8')
  s2.succeed(chalk.green(`  Step 2/2  Exported → ${csvPath}`))

  // ── DISPLAY ────────────────────────────────────────────────────────────────
  console.log('\n' + chalk.bold.white('  ─── LEADS FOUND ────────────────────────────────────'))
  results.slice(0, 8).forEach((lead, i) => {
    console.log(`\n  ${chalk.bold.cyan((i + 1) + '.')} ${lead?.business_name || lead?.name || 'Unknown'}`)
    const website = lead?.website || lead?.url
    const phone   = lead?.phone   || lead?.phone_number
    const email   = lead?.email   || lead?.email_address
    const system  = lead?.booking_system || lead?.contact_system
    if (website) console.log(chalk.gray('     Website:  ') + website)
    if (phone)   console.log(chalk.gray('     Phone:    ') + phone)
    if (email)   console.log(chalk.gray('     Email:    ') + email)
    if (system)  console.log(chalk.gray('     System:   ') + system)
  })
  if (results.length > 8) console.log(chalk.gray(`\n  ... and ${results.length - 8} more in leads-output.csv`))

  console.log('\n' + chalk.bold.green('  ✓ Lead gen complete.'))
  console.log(chalk.gray('  Import leads-output.csv into n8n to trigger your outreach sequence.\n'))

  return results
}

runLeadGen().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
