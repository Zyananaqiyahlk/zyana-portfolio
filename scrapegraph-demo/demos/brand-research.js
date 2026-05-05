#!/usr/bin/env node
import 'dotenv/config'
import { smartscraper, markdownify } from 'scrapegraph-js'
import chalk from 'chalk'
import ora from 'ora'

const API_KEY = process.env.SGAI_API_KEY
const TGM_URL = process.env.TGM_URL || 'https://thegivingmovement.com'

if (!API_KEY) {
  console.error(chalk.red('\n  ERROR: SGAI_API_KEY not set in .env file'))
  console.error(chalk.gray('  Get your key at https://dashboard.scrapegraphai.com\n'))
  process.exit(1)
}

console.log(chalk.bold('\n  ZYANA × SCRAPEGRAPH — Brand Research Pipeline'))
console.log(chalk.gray('  Target: ' + TGM_URL + '\n'))

async function runBrandResearch() {
  // ── STEP 1: Convert homepage to markdown ──────────────────────────────
  const s1 = ora('  Step 1/3  Converting homepage to markdown...').start()
  let homepageMd = ''
  try {
    homepageMd = await markdownify(API_KEY, TGM_URL)
    s1.succeed(chalk.green('  Step 1/3  Homepage captured ') + chalk.gray(`(${homepageMd.length} chars)`))
  } catch (e) {
    s1.fail(chalk.red('  Step 1/3  Failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 2: Extract structured brand data ─────────────────────────────
  const s2 = ora('  Step 2/3  Extracting brand voice, values, and products...').start()
  let brandData = {}
  try {
    brandData = await smartscraper(
      API_KEY,
      'Extract: brand mission statement, core values (list), target customer description, sustainability or giving model claims, product categories (list), price range, and any creator or ambassador program details.',
      TGM_URL
    )
    s2.succeed(chalk.green('  Step 2/3  Brand data extracted'))
  } catch (e) {
    s2.fail(chalk.red('  Step 2/3  Failed: ' + e.message))
    process.exit(1)
  }

  // ── STEP 3: Extract product catalog ───────────────────────────────────
  const s3 = ora('  Step 3/3  Pulling product catalog and pricing...').start()
  let products = []
  try {
    const productUrl = TGM_URL.replace(/\/$/, '') + '/collections/all'
    products = await smartscraper(
      API_KEY,
      'Extract all product names, prices, and categories as a JSON array.',
      productUrl
    )
    s3.succeed(chalk.green('  Step 3/3  Products extracted'))
  } catch (e) {
    s3.warn(chalk.yellow('  Step 3/3  Products page not found — skipping'))
  }

  // ── OUTPUT: Format as Velora-ready concept brief ───────────────────────
  const brief = {
    generated_at: new Date().toISOString(),
    source_url: TGM_URL,
    brand: brandData,
    products,
    velora_prompt: buildVeloraPrompt(brandData),
  }

  console.log('\n' + chalk.bold.white('  ─── BRAND RESEARCH OUTPUT ──────────────────────'))
  console.log(chalk.cyan('\n  Mission:'))
  console.log('  ' + (brandData?.mission || 'Not found'))

  console.log(chalk.cyan('\n  Core values:'))
  const values = Array.isArray(brandData?.values) ? brandData.values : [brandData?.values || 'Not found']
  values.forEach(v => console.log(chalk.gray('  · ') + v))

  console.log(chalk.cyan('\n  Giving model / sustainability:'))
  console.log('  ' + (brandData?.giving_model || brandData?.sustainability || 'Not found'))

  console.log(chalk.cyan('\n  Product categories:'))
  const cats = Array.isArray(brandData?.product_categories) ? brandData.product_categories : []
  cats.forEach(c => console.log(chalk.gray('  · ') + c))

  console.log(chalk.cyan('\n  Creator / ambassador program:'))
  console.log('  ' + (brandData?.ambassador_program || brandData?.creator_program || 'Not found — check manually'))

  console.log(chalk.cyan('\n  Velora concept brief prompt ready:'))
  console.log(chalk.gray('  ' + brief.velora_prompt.slice(0, 120) + '...'))

  console.log('\n' + chalk.bold.green('  ✓ Brand research complete. Ready to generate concept brief.'))
  console.log(chalk.gray('  Feed `brief.velora_prompt` into Velora to auto-generate the TGM concept PDF.\n'))

  return brief
}

function buildVeloraPrompt(brand) {
  return `Generate a UGC concept brief for ${brand?.brand_name || 'The Giving Movement'}. Brand mission: ${brand?.mission || 'sustainable activewear with a giving model'}. Core values: ${(Array.isArray(brand?.values) ? brand.values.join(', ') : brand?.values) || 'sustainability, intentionality'}. Target audience: ${brand?.target_customer || 'conscious consumers, active women'}. Create 3 video concepts for Instagram Reels and TikTok. Each concept needs: title, 45-second storyboard in 3 acts, 3 hook variants, talking points, do's and don'ts. Tone: quiet luxury, authentic, intentional. Creator: Naqiyah Lakdawala, Toronto-based AI founder.`
}

runBrandResearch().catch(e => {
  console.error(chalk.red('\n  Unexpected error: ' + e.message))
  process.exit(1)
})
