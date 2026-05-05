#!/usr/bin/env node
import chalk from 'chalk'
import { execSync } from 'child_process'

console.log(chalk.bold.white('\n  ════════════════════════════════════════════════'))
console.log(chalk.bold.white('  ZYANA SYSTEMS × SCRAPEGRAPH — Full Pipeline Demo'))
console.log(chalk.bold.white('  ════════════════════════════════════════════════\n'))

const demos = [
  { name: 'Brand Research', file: 'brand-research.js', color: 'cyan' },
  { name: 'Lead Generation', file: 'lead-gen.js', color: 'yellow' },
  { name: 'Competitor Intel', file: 'competitor-intel.js', color: 'magenta' },
]

for (const demo of demos) {
  console.log(chalk.bold[demo.color](`\n  ── Running: ${demo.name} ──`))
  try {
    execSync(`node demos/${demo.file}`, { stdio: 'inherit' })
  } catch (e) {
    console.error(chalk.red(`  Failed: ${demo.name}`))
  }
  console.log(chalk.gray('  ─────────────────────────────────────────────\n'))
}

console.log(chalk.bold.green('\n  ✓ All three pipelines complete.'))
console.log(chalk.gray('  Check leads-output.csv and competitor-last-run.json for outputs.\n'))
