# Zyana Systems × ScrapeGraph Demo

Live demo of the full ScrapeGraph pipeline — brand research, lead generation, and competitor intelligence — all running locally in your terminal.

## Setup (2 minutes)

```bash
# 1. Go to this folder
cd scrapegraph-demo

# 2. Install
npm install

# 3. Add your API key
cp .env.example .env
# Edit .env and paste your SGAI_API_KEY from https://dashboard.scrapegraphai.com

# 4. Run any demo
npm run demo:brand      # Brand research → concept brief
npm run demo:leads      # Lead generation → contact list  
npm run demo:competitor # Competitor crawl → content gaps
npm run demo:all        # Run all three in sequence

# Or start the web UI
npm start               # Opens http://localhost:3333
```

## What each demo does

### `demo:brand` — Brand Research
Scrapes The Giving Movement website → extracts brand values, products, pricing, and sustainability claims → formats into a Velora-ready concept brief JSON.

### `demo:leads` — Lead Generation  
Runs a search for Toronto businesses matching your criteria → extracts contact info → outputs a CSV ready for n8n outreach.

### `demo:competitor` — Competitor Intel
Crawls a competitor's blog → extracts all post titles, dates, and topics → diffs against a previous run → shows you exactly what they published and what gaps exist.

### `npm start` — Web UI
Opens a local dashboard at `http://localhost:3333` with a live interface to run all three pipelines and see results visually.

## File structure

```
scrapegraph-demo/
├── .env.example          ← Copy to .env, add your API key
├── server.js             ← Express web UI server
├── demos/
│   ├── brand-research.js  ← Pipeline 1
│   ├── lead-gen.js        ← Pipeline 2
│   ├── competitor-intel.js← Pipeline 3
│   └── run-all.js         ← Run all three
└── public/
    └── index.html         ← Web UI
```
