# Higgsfield TGM Video Production

This folder contains all AI video generation prompts and edit scripts for the **Morning Ritual — Toronto** UGC campaign for **The Giving Movement**.

## Structure

```
higgsfield/
├── tgm_morning_ritual.json   # Full shot list, prompts, CLI commands, edit script
└── README.md                 # This file
```

## Quick Start

### Step 1 — Generate AI shots

Run each CLI command from `tgm_morning_ritual.json > higgsfield_cli_commands`:

```bash
# Make output folder
mkdir -p shots

# Generate all 4 AI shots
higgsfield generate --prompt "Slow cinematic pan across a sunlit Toronto apartment windowsill at 6am..." --duration 6 --ratio 9:16 --style cinematic --output ./shots/S01_opener.mp4

higgsfield generate --prompt "Extreme close-up slow motion premium athletic fabric..." --duration 6 --ratio 9:16 --style cinematic --output ./shots/S02_fabric.mp4

higgsfield generate --prompt "Early morning Toronto cityscape golden hour..." --duration 8 --ratio 9:16 --style cinematic --output ./shots/S04_city.mp4

higgsfield generate --prompt "Minimal elegant end frame animation..." --duration 10 --ratio 9:16 --style cinematic --output ./shots/S07_endcard.mp4
```

### Step 2 — Film your live shots

| Shot | What to film | Duration |
|------|-------------|----------|
| S03 | Morning stretch in TGM gear, near window, natural light | 10 sec |
| S05 | Step outside / walk in TGM gear, city background | 12 sec |
| S06 | TGM tag / logo close-up, pull back to full garment | 8 sec |

**iPhone settings:** 4K 24fps · Portrait mode for S06 · Natural light only · No ring light

### Step 3 — Edit in CapCut or Premiere

Assemble in this order:

```
S01 (0:00–0:06) → S02 (0:06–0:12) → S03 (0:12–0:22) → S04 (0:22–0:30)
→ S05 (0:30–0:42) → S06 (0:42–0:50) → S07 (0:50–1:00)
```

- **Transitions:** Hard cuts only. One 0.5s fade between S06 → S07.
- **Audio:** Royalty-free ambient morning track. Epidemic Sound: search 'quiet morning'.
- **Color grade:** Warm LUT. Lift shadows to ivory, highlights to champagne.
- **Export:** 1080×1920 · MP4 · H.264 · 20 Mbps · No watermark.

### Step 4 — Create 3 hook variants

Duplicate the edit 3 times. Change opening text overlay only:

- **H1:** "This is what 6am looks like when you actually care what you wear."
- **H2:** "I used to buy fast fashion. Then I found a brand that gives back."
- **H3:** "POV: Building a company in activewear that has a better mission than most startups."

## Deliverables checklist

- [ ] S01_opener.mp4 (AI)
- [ ] S02_fabric.mp4 (AI)
- [ ] S03_stretch.mp4 (live)
- [ ] S04_city.mp4 (AI)
- [ ] S05_outside.mp4 (live)
- [ ] S06_product.mp4 (live)
- [ ] S07_endcard.mp4 (AI)
- [ ] TGM_MorningRitual_MASTER.mp4 (final edit)
- [ ] TGM_MorningRitual_H1.mp4
- [ ] TGM_MorningRitual_H2.mp4
- [ ] TGM_MorningRitual_H3.mp4
- [ ] TGM_MorningRitual_15sec_Story.mp4

---

*Produced by Naqiyah Lakdawala · Zyana Systems · naqiyahlk@gmail.com*
