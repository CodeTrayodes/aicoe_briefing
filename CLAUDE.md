# LevelShift Intelligence

Internal AI news briefing platform for the LevelShift team.
Fetches 5 daily AI news stories, contextualised for LevelShift,
written to /data/ as JSON, served via a Next.js admin platform.

## Project structure

```
/CLAUDE.md                          <- This file (always loaded)
/.claude/skills/levelshift-context/ <- Who LevelShift is (load when needed)
/.claude/skills/news-pipeline/      <- How to fetch and write news (load when running pipeline)
/context/levelshift-context.md      <- Full 350-line LevelShift context document
/routine-prompt.md                  <- Exact prompt used in the Claude Code Routine
/data/YYYY-MM-DD.json               <- Daily briefing output (written by routine)
/data/index.json                    <- Index of available days
/data/seen-hashes.json              <- Deduplication registry (14 days)
/src/app/admin/                     <- Admin UI (review, edit, approve, copy)
/src/app/briefing/                  <- Read-only team view + archive
/src/app/api/                       <- REST API routes
```

## Key rules (always apply)

- Never overwrite a briefing with status "approved" without asking first
- After writing to /data/, always commit and push so Vercel redeploys
- The levelshiftAngle field must reference something specific from levelshift-context.md
- "This is relevant to LevelShift's AI work" is never an acceptable angle
- When re-fetching one category, use --category flag, never re-run everything

## Tech stack

- Runtime: Node.js 20
- Frontend: Next.js 14, App Router, deployed on Vercel
- Data store: JSON files in /data/ committed to this repo
- Scheduling: Claude Code Routine (scheduled trigger, 9am IST weekdays)
- Context: /context/levelshift-context.md — edit this to improve all output
