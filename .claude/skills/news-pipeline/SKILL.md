---
name: news-pipeline
description: >
  Load this skill when running the daily news pipeline — fetching stories,
  writing data files, deduplicating, or re-fetching a single category.
  Also activates when asked to "run the pipeline", "fetch today's news",
  or "replace the [category] story".
---

# News pipeline — how to fetch and write daily briefing cards

## Step 0 — Load context first

Before fetching anything, load the levelshift-context skill and read
`context/levelshift-context.md` in full. Every levelshiftAngle you write
must reference something specific from that document.

## Step 1 — Check if today already exists

```
today = current date as YYYY-MM-DD
check if data/{today}.json exists
```

If it exists and status is "approved" — stop. Do not overwrite an approved briefing.
If it exists and status is "pending" or "partial" — check which categories are missing
and only fetch those. Do not re-fetch categories that already have cards.

## Step 2 — Check deduplication registry

Read `data/seen-hashes.json`. This is a dictionary of:
```json
{
  "a1b2c3d4e5f60001": { "date": "2026-06-07", "headline": "..." }
}
```

When you find a story, compute its hash as:
```
sha256(lowercase(source + "::" + headline)).slice(0, 16)
```

If that hash already exists in seen-hashes.json — skip this story and find another.

## Step 3 — Fetch one story per category

Search the web for each category below. Use real web search — do not rely on training data.
Prioritise sources published within the last 14 days for Tips and Governance,
30 days for Stories and Lowlights, 7 days for Updates.

### Category 1 — AI Tips & Efficiency (id: "tips")
Find one practical tip for using tools in the LevelShift stack more effectively.
Tools: Microsoft 365 Copilot, GitHub Copilot, Claude, Salesforce, Boomi, Azure, Teams.
Must be immediately actionable. Not generic. Applicable to non-technical teams.
Credible sources: official Microsoft/GitHub/Anthropic/Salesforce blogs, HBR, MIT Sloan, Wired.

### Category 2 — AI Product Updates (id: "updates")
Find one significant update, feature launch, or model release from the last 7 days.
From: Salesforce, Microsoft, Anthropic, Google DeepMind, Boomi, or other major AI vendors.
Must have clear business implications. Not just a research paper.
Credible sources: vendor official blogs, TechCrunch, The Verge, VentureBeat, ZDNet.

### Category 3 — AI Success Stories (id: "stories")
Find one verified AI adoption success story with a named organisation and real numbers.
Target verticals: Manufacturing, Financial Services, Healthcare, Technology, Retail, Energy.
Must have: cited results (%, £/$, time saved, headcount equivalent).
Credible sources: McKinsey, Gartner, MIT Tech Review, FT, Reuters, HBR, official press releases.

### Category 4 — AI Lowlights (id: "lowlights")
Find one real AI failure, incident, or cautionary tale. Must be verified, not opinion.
Enterprise-relevant: chatbot liability, hallucination causing loss, failed rollout, data breach.
Credible sources: The Register, 404 Media, The Guardian, BBC, Reuters, FT, AI Incident Database.

### Category 5 — AI Governance & Security (id: "governance")
Find one regulation, policy, or security development relevant to enterprise AI.
Topics: EU AI Act, UK AI Safety Institute, NIST, GDPR/HIPAA enforcement, AI security.
Must be relevant to Financial Services, Healthcare, or critical infrastructure.
Credible sources: NIST, EU official, UK Gov, Future of Life Institute, major legal outlets.

## Step 4 — Write each card

Each card must match this exact JSON shape:

```json
{
  "id": "first 16 chars of sha256(source::headline, lowercase)",
  "category": "tips",
  "categoryLabel": "AI Tips & Efficiency",
  "color": "#22C55E",
  "headline": "The actual article headline",
  "source": "Publication name only",
  "publishedDate": "8 Jun 2026",
  "url": "https://actual-article-url-or-topic-page",
  "summary": "2-3 sentences. Factual. What happened, who, what impact.",
  "levelshiftAngle": "2-3 sentences. Names a specific LevelShift asset. Ends with action.",
  "relevanceScore": 8,
  "tools": ["M365 Copilot"],
  "approved": false,
  "fetchedAt": "2026-06-08T09:00:00.000Z"
}
```

Category colors:
- tips: #22C55E
- updates: #3B82F6
- stories: #A78BFA
- lowlights: #F97316
- governance: #FBBF24

## Step 5 — Write the daily file

Write to `data/YYYY-MM-DD.json`:

```json
{
  "date": "2026-06-08",
  "generatedAt": "<ISO timestamp>",
  "status": "pending",
  "count": 5,
  "items": [ ...cards sorted by: tips, updates, stories, lowlights, governance ]
}
```

Status rules:
- "pending"  — all 5 categories fetched, awaiting editor review
- "partial"  — 1-4 categories fetched (report which are missing)
- "failed"   — 0 categories fetched

## Step 6 — Update index and dedup registry

Update `data/index.json`:
```json
{
  "days": ["2026-06-08", "2026-06-07", ...],
  "lastUpdated": "<ISO timestamp>"
}
```
Today's date goes at the top. Keep only the last 7 days.

Update `data/seen-hashes.json` — add each new card's hash:
```json
{
  "a1b2c3d4e5f60001": { "date": "2026-06-08", "headline": "..." }
}
```
Purge entries older than 14 days.

## Step 7 — Commit and push

```bash
git add data/
git commit -m "Daily briefing: YYYY-MM-DD"
git push
```

Vercel will detect the push and redeploy the admin platform automatically.
The editor opens the admin panel, reviews, approves, and sends.

## Single category re-fetch

When asked to replace one story (e.g. "replace the governance card"):
1. Delete only that card from today's data file
2. Fetch a new story for that category only
3. Ensure it does not match any hash in seen-hashes.json
4. Write the new card into the existing data file
5. Commit and push

Do not re-run the full pipeline. Do not touch other cards.
