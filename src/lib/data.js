import fs from 'fs';
import path from 'path';

const DATA = path.join(process.cwd(), 'data');

export const CAT = {
  tips:       { label: 'AI Tips & Efficiency',     color: '#22C55E', bg: 'rgba(34,197,94,0.08)',    border: 'rgba(34,197,94,0.18)'    },
  updates:    { label: 'AI Product Updates',        color: '#60A5FA', bg: 'rgba(96,165,250,0.08)',   border: 'rgba(96,165,250,0.18)'   },
  stories:    { label: 'AI Success Stories',        color: '#A78BFA', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.18)'  },
  lowlights:  { label: 'AI Lowlights',             color: '#FB923C', bg: 'rgba(251,146,60,0.08)',   border: 'rgba(251,146,60,0.18)'   },
  governance: { label: 'AI Governance & Security', color: '#FBBF24', bg: 'rgba(251,191,36,0.08)',   border: 'rgba(251,191,36,0.18)'   },
};

export const ORDER = ['tips', 'updates', 'stories', 'lowlights', 'governance'];

function read(file, fallback = null) {
  try { return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback; }
  catch { return fallback; }
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

export const getIndex         = () => read(path.join(DATA, 'index.json'), { days: [], lastUpdated: null });
export const getAvailableDays = () => getIndex().days;
export const getDayBriefing   = (d) => read(path.join(DATA, `${d}.json`));
export const getLatestBriefing = () => {
  for (const d of getIndex().days) { const b = getDayBriefing(d); if (b) return b; }
  return null;
};

export function approveBriefing(date) {
  const file = path.join(DATA, `${date}.json`);
  const data = read(file);
  if (!data) return false;
  data.status = 'approved';
  data.approvedAt = new Date().toISOString();
  write(file, data);
  return true;
}

export function updateCard(date, cardId, patch) {
  const file = path.join(DATA, `${date}.json`);
  const data = read(file);
  if (!data) return false;
  const idx = data.items.findIndex(i => i.id === cardId);
  if (idx === -1) return false;
  const allowed = ['levelshiftAngle', 'summary', 'headline'];
  const safe = Object.fromEntries(Object.entries(patch).filter(([k]) => allowed.includes(k)));
  data.items[idx] = { ...data.items[idx], ...safe, editedAt: new Date().toISOString() };
  write(file, data);
  return true;
}

export function markSent(date, teams) {
  const file = path.join(DATA, `${date}.json`);
  const data = read(file);
  if (!data) return false;
  data.status = 'sent';
  data.sentAt = new Date().toISOString();
  data.sentTo = teams;
  write(file, data);
  return true;
}
