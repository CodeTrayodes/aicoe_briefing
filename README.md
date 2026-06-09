# LevelShift Intelligence

Daily AI news briefing platform for the LevelShift team. Five curated AI stories every weekday morning, contextualised for LevelShift's services, clients, and tools. Reviewed and approved by an editor, then sent manually to the relevant teams.

---

## How it works

```
Claude Code Routine (9am IST, weekdays)
  Anthropic cloud spins up a fresh Claude Code session
  Reads CLAUDE.md → loads skills → reads levelshift-context.md
  Searches the web for 5 verified AI news stories
  Writes data/YYYY-MM-DD.json
  Commits and pushes to GitHub
  Vercel detects the push → redeploys the admin platform

Editor opens the admin platform (Vercel URL)
  Reviews 5 news cards
  Edits any LevelShift angle inline
  Clicks Approve
  Copies the briefing and sends via Outlook or Teams
  Marks as sent, records which teams received it
```

---

## Setup (one time, ~20 minutes)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
gh repo create your-org/levelshift-intelligence --private --source=. --push
```

### 2. Create the Claude Code Routine

Go to **claude.ai/code/routines** → New Routine → Remote.

Fill in:

| Field | Value |
|---|---|
| Name | LevelShift Daily News Briefing |
| Repository | Connect your GitHub repo. Enable "Allow unrestricted branch pushes". |
| Trigger | Scheduled — `30 3 * * 1-5` (3:30 UTC = 9am IST, weekdays) |
| Connectors | None required |

**Prompt** — paste the exact contents of `routine-prompt.md` from this repo.

Click **Run now** to test immediately. Watch the session at claude.ai in real time.

### 3. Deploy to Vercel

Go to **vercel.com** → New Project → Import from GitHub → select this repo → Deploy.

Vercel auto-deploys every time the Routine commits new data. No config needed.

Share the Vercel URL with whoever runs the daily review.

---

## Files that matter

| File | What it is | Who edits it |
|---|---|---|
| `context/levelshift-context.md` | **The brain.** 350 lines of LevelShift knowledge. Every news angle comes from here. | AI team, quarterly |
| `CLAUDE.md` | Lean project context. Always loaded by Claude Code. | Rarely |
| `.claude/skills/levelshift-context/SKILL.md` | Tells Claude when and how to use the context file. | Rarely |
| `.claude/skills/news-pipeline/SKILL.md` | Step-by-step pipeline logic. Categories, data format, dedup rules. | If categories change |
| `routine-prompt.md` | Exact text pasted into the Routine UI. Self-contained and explicit. | If routine behaviour changes |
| `data/` | Written by the Routine. Read by Next.js. Committed to the repo. | Never manually |

---

## Daily operation

**The Routine runs automatically.** Nothing to do until you open the admin panel.

**If a story is weak:** Open Claude Code in this folder and say:
```
Replace the governance story
```
Claude Code will find a better story, write it to the data file, commit, and push.

**If the Routine fails:** Open Claude Code in this folder. The session will run the pipeline automatically on startup.

---

## How the context gets into the routine

This is the key architectural decision. The context is not hardcoded in any script.

```
Routine fires → fresh Claude Code session starts in cloud
  Clones this repo
  Reads CLAUDE.md (lean — project overview and rules only)
  Loads .claude/skills/news-pipeline/SKILL.md (triggered by the pipeline task)
  Which instructs: "Step 0 — read context/levelshift-context.md in full"
  Claude reads the full 350-line context document
  Writes levelshiftAngles that reference real LevelShift assets by name
```

To improve the quality of the LevelShift angle in any card:
1. Edit `context/levelshift-context.md`
2. Commit and push
3. Next Routine run uses the updated context automatically
4. No code changes needed

---

## Data format

`data/YYYY-MM-DD.json`:

```json
{
  "date": "2026-06-08",
  "generatedAt": "2026-06-08T03:31:00.000Z",
  "status": "pending",
  "count": 5,
  "items": [
    {
      "id": "a1b2c3d4e5f60001",
      "category": "tips",
      "categoryLabel": "AI Tips & Efficiency",
      "color": "#22C55E",
      "headline": "...",
      "source": "Microsoft Blog",
      "publishedDate": "8 Jun 2026",
      "url": "https://...",
      "summary": "2-3 sentences.",
      "levelshiftAngle": "Specific to LevelShift. Names a real asset. Ends with action.",
      "relevanceScore": 9,
      "tools": ["M365 Copilot"],
      "approved": false,
      "fetchedAt": "2026-06-08T03:31:00.000Z"
    }
  ]
}
```

Status values: `pending` → `approved` → `sent`

---

## API endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/news` | GET | Latest briefing |
| `/api/news?date=2026-06-08` | GET | Specific day |
| `/api/news?days=5` | GET | Last N days |
| `/api/news?category=tips` | GET | Single category from latest |
| `/api/approve` | POST | Approve a briefing |
| `/api/edit` | POST | Edit a card's angle |
| `/api/status` | GET | Pipeline status for today |

---

## Routine limits

Claude Code Routines have a daily run cap per account (5–25 depending on plan tier during research preview). One run per weekday = 5 runs per week. Well within any tier.

Minimum schedule interval is 1 hour. The 9am IST daily schedule is supported.
