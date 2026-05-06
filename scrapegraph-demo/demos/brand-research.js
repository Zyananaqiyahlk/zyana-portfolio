#!/usr/bin/env node
import 'dotenv/config'
import { smartScraper, markdownify } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'

const API_KEY = process.env.SGAI_API_KEY
const TGM_URL = process.env.TGM_URL || 'https://thegivingmovement.com'

if (!API_KEY || API_KEY === 'your-api-key-here') {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env'))
  console.error(chalk.gray('  Get your key at https://dashboard.scrapegraphai.com\n'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Brand Research Pipeline'))
console.log(chalk.gray('  Target: ' + TGM_URL + '\n'))

async function runBrandResearch() {

  // ── STEP 1: Markdown snapshot ─────────────────────────────────────────────
  const s1 = ora('  Step 1/3  Converting homepage to markdown...').start()
  let homepageMd = ''
  try {
    homepageMd = await markdownify(API_KEY, TGM_URL)
    s1.succeed(chalk.green('  Step 1/3  Homepage captured ') + chalk.gray(`(${String(homepageMd).length} chars)`))
  } catch (e) {
    s1.fail(chalk.red('  Step 1/3  Failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 2: Extract structured brand data ─────────────────────────────────
  const s2 = ora('  Step 2/3  Extracting brand values, mission, and products...').start()
  let brandData = {}
  try {
    brandData = await smartScraper(
      API_KEY,
      'Extract as JSON: brand_name, mission_statement, core_values (array), target_customer, giving_model_claims, product_categories (array), price_range, ambassador_program.',
      TGM_URL
    )
    s2.succeed(chalk.green('  Step 2/3  Brand data extracted'))
  } catch (e) {
    s2.fail(chalk.red('  Step 2/3  Failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 3: Product catalog ───────────────────────────────────────────────
  const s3 = ora('  Step 3/3  Pulling product catalog...').start()
  let products = []
  try {
    const productUrl = TGM_URL.replace(/\/$/, '') + '/collections/all'
    products = await smartScraper(
      API_KEY,
      'Extract all product names, prices, and categories as a JSON array.',
      productUrl
    )
    s3.succeed(chalk.green('  Step 3/3  Products extracted'))
  } catch (e) {
    s3.warn(chalk.yellow('  Step 3/3  Skipped — ' + e.message.slice(0, 60)))
  }

  // ── OUTPUT ────────────────────────────────────────────────────────────────
  console.log('\n' + chalk.bold.white('  ─── BRAND RESEARCH OUTPUT ─────────────────────────────'))

  console.log(chalk.cyan('\n  Brand name:'))
  console.log('  ' + (brandData?.brand_name || brandData?.name || 'Not found'))

  console.log(chalk.cyan('\n  Mission:'))
  console.log('  ' + (brandData?.mission_statement || brandData?.mission || 'Not found'))

  console.log(chalk.cyan('\n  Core values:'))
  const values = Array.isArray(brandData?.core_values) ? brandData.core_values : [brandData?.core_values || 'Not found']
  values.forEach(v => console.log(chalk.gray('  · ') + v))

  console.log(chalk.cyan('\n  Giving model / sustainability:'))
  console.log('  ' + (brandData?.giving_model_claims || brandData?.giving_model || 'Not found'))

  console.log(chalk.cyan('\n  Product categories:'))
  const cats = Array.isArray(brandData?.product_categories) ? brandData.product_categories : []
  cats.length ? cats.forEach(c => console.log(chalk.gray('  · ') + c)) : console.log('  Not found')

  console.log(chalk.cyan('\n  Creator / ambassador program:'))
  console.log('  ' + (brandData?.ambassador_program || 'Not found — check manually'))

  console.log(chalk.cyan('\n  Homepage preview:'))
  console.log(chalk.gray('  ' + String(homepageMd).slice(0, 300).replace(/\n/g, '\n  ') + '...'))

  const velora = buildVeloraPrompt(brandData)
  console.log(chalk.cyan('\n  Velora prompt ready:'))
  console.log(chalk.gray('  ' + velora.slice(0, 160) + '...'))

  console.log('\n' + chalk.bold.green('  ✓ Brand research complete.'))
  console.log(chalk.gray('  Feed velora_prompt into Velora to auto-generate the TGM concept PDF.\n'))

  return { brand: brandData, products, velora_prompt: velora }
}

function buildVeloraPrompt(brand) {
  const name    = brand?.brand_name || 'The Giving Movement'
  const mission = brand?.mission_statement || brand?.mission || 'sustainable activewear with a giving model'
  const values  = Array.isArray(brand?.core_values) ? brand.core_values.join(', ') : 'sustainability, intentionality'
  const audience = brand?.target_customer || 'conscious consumers, active women'
  return `Generate a UGC concept brief for ${name}. Mission: ${mission}. Values: ${values}. Audience: ${audience}. Create 3 video concepts for Instagram Reels and TikTok — each with a title, 45-sec storyboard in 3 acts, 3 hook variants, talking points, dos and donts. Tone: quiet luxury, authentic, intentional. Creator: Naqiyah Lakdawala, Toronto-based AI founder.`
}

runBrandResearch().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
