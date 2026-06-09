'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Check, CheckCircle, AlertCircle, ExternalLink, Edit2, Save, X,
  Copy, FileText, Sparkles, RefreshCw, Archive, Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CAT = {
  tips:       { label:'AI Tips & Efficiency',     color:'#10B981', bg:'#D1FAE5',  border:'rgba(16,185,129,0.35)'   },
  updates:    { label:'AI Product Updates',        color:'#007DB8', bg:'rgba(0,125,184,0.07)',  border:'rgba(0,125,184,0.25)'  },
  stories:    { label:'AI Success Stories',        color:'#8B5CF6', bg:'#EDE9FE', border:'rgba(139,92,246,0.35)' },
  lowlights:  { label:'AI Lowlights',             color:'#F59E0B', bg:'#FEF3C7',  border:'rgba(245,158,11,0.35)'  },
  governance: { label:'AI Governance & Security', color:'#EF4444', bg:'#FEE2E2',  border:'rgba(239,68,68,0.35)'  },
};

const TEAMS = ['All Teams','Leadership','Sales','Delivery','Technology Practice','Salesforce Practice','Data Practice','Marketing'];
const ORDER = ['tips','updates','stories','lowlights','governance'];

function StatusBadge({ status }) {
  const map = {
    pending:  { color:'#F59E0B', bg:'#FEF3C7', label:'Pending review' },
    partial:  { color:'#F59E0B', bg:'#FEF3C7', label:'Partial' },
    approved: { color:'#10B981', bg:'#D1FAE5', label:'Approved' },
    sent:     { color:'#007DB8', bg:'rgba(0,125,184,0.07)', label:'Sent' },
    failed:   { color:'#EF4444', bg:'#FEE2E2', label:'Pipeline failed' },
    none:     { color:'#9ca3af', bg:'#f3f0ea', label:'No briefing' }
  };
  const s = map[status] || map.none;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background:s.bg, color:s.color }}>
      <Circle size={6} fill={s.color} />
      {s.label}
    </span>
  );
}

function RelevanceScore({ score, color }) {
  return (
    <span
      className="inline-flex min-w-[2.75rem] justify-center px-2 py-1 rounded-md text-xs font-bold"
      title={`Relevance ${score}/10`}
      style={{ background:'var(--c-sf2)', color, border:'1px solid var(--border)' }}>
      {score}/10
    </span>
  );
}

function Toast({ msg, type }) {
  const styles = {
    error: { bg:'#FEE2E2', color:'#EF4444', border:'rgba(239,68,68,0.35)' },
    ok:    { bg:'#D1FAE5', color:'#10B981', border:'rgba(16,185,129,0.35)' },
    info:  { bg:'rgba(0,125,184,0.07)', color:'#007DB8', border:'rgba(0,125,184,0.25)' }
  };
  const s = styles[type] || styles.info;
  return (
    <motion.div
      initial={{ opacity:0, y:20 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:10 }}
      className="fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-medium shadow-lg z-50"
      style={{ background:s.bg, color:s.color, border:`1px solid ${s.border}` }}>
      {msg}
    </motion.div>
  );
}

export default function AdminPage() {
  const [briefing,  setBriefing]  = useState(null);
  const [status,    setStatus]    = useState(null);
  const [filter,    setFilter]    = useState('all');
  const [toast,     setToast]     = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [editing,   setEditing]   = useState({});
  const [sendModal, setSendModal] = useState(false);
  const [teams,     setTeams]     = useState([]);
  const [copied,    setCopied]    = useState(null);

  const showToast = (msg, type='info', ms=3000) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), ms);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, s] = await Promise.all([fetch('/api/news'), fetch('/api/status')]);
      const bd = await b.json(); const sd = await s.json();
      if (bd.success) setBriefing(bd.data);
      if (sd.success) setStatus(sd);
    } catch { showToast('Failed to load', 'error'); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function approve() {
    const r = await fetch('/api/approve', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ date:briefing.date }) });
    const d = await r.json();
    if (d.success) { showToast('Briefing approved', 'ok'); load(); }
    else showToast(d.error, 'error');
  }

  async function saveEdit(cardId) {
    if (editing[cardId] === undefined) return;
    const r = await fetch('/api/edit', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ date:briefing.date, cardId, patch:{ levelshiftAngle:editing[cardId] } }) });
    const d = await r.json();
    if (d.success) { showToast('Saved', 'ok'); setEditing(e => { const n={...e}; delete n[cardId]; return n; }); load(); }
    else showToast(d.error, 'error');
  }

  function copy(mode) {
    if (!briefing) return;
    const items = briefing.items?.filter(i => filter==='all'||i.category===filter) || [];
    let text = '';
    if (mode === 'digest') {
      text = `LevelShift Intelligence — ${briefing.date}\n\n`;
      items.forEach((item,i) => { text += `${i+1}. [${item.categoryLabel}] ${item.headline}\n${item.url}\n\n`; });
    } else {
      const line = '─'.repeat(56);
      text = `LEVELSHIFT INTELLIGENCE\nAI News Briefing — ${new Date(briefing.date+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}\n\n`;
      items.forEach(item => {
        text += `${line}\n${item.categoryLabel.toUpperCase()} | ${item.source} | ${item.publishedDate}\n\n`;
        text += `${item.headline}\n\n`;
        text += `${item.summary}\n\n`;
        text += `For LevelShift:\n${item.levelshiftAngle}\n\n`;
        text += `Read more: ${item.url}\n\n`;
      });
    }
    navigator.clipboard.writeText(text).then(() => { setCopied(mode); showToast('Copied to clipboard', 'ok'); setTimeout(() => setCopied(null), 2000); });
  }

  function copyCard(item) {
    const text = [
      `Title: ${item.headline}`,
      '',
      `Summary: ${item.summary}`,
      '',
      `LevelShift Lens: ${item.levelshiftAngle}`,
      '',
      `Article link: ${item.url}`
    ].join('\n');

    navigator.clipboard.writeText(text).then(() => {
      setCopied(item.id);
      showToast('Story copied to clipboard', 'ok');
      setTimeout(() => setCopied(null), 2000);
    });
  }

  const today  = new Date().toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' });
  const items  = (briefing?.items || []).sort((a,b) => ORDER.indexOf(a.category)-ORDER.indexOf(b.category)).filter(i => filter==='all'||i.category===filter);
  const isDone = briefing?.status==='approved' || briefing?.status==='sent';
  const allFive = briefing?.items?.length === 5;

  return (
    <div className="min-h-screen flex" style={{ background:'var(--bg)' }}>

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r flex flex-col" style={{ background:'var(--surface)', borderColor:'var(--border)' }}>
        <div className="p-6 border-b" style={{ borderColor:'var(--border)' }}>
          <h1 className="text-2xl mb-1" style={{ fontFamily:'var(--font-serif)', color:'var(--tx)' }}>LevelShift</h1>
          <p className="text-[10px] uppercase tracking-[0.08em]" style={{ fontFamily:'var(--font-mono)', color:'var(--mu)' }}>AICOE Briefing</p>
        </div>

        <div className="flex-1 p-4">
          <span className="block px-3 pb-2 text-[10px] uppercase tracking-[0.08em] font-bold" style={{ fontFamily:'var(--font-mono)', color:'var(--mu)' }}>Filter Stories</span>
          <div className="space-y-1">
            <button
              onClick={() => setFilter('all')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200"
              style={{
                background: filter==='all' ? 'var(--c-acBg)' : 'transparent',
                color: filter==='all' ? 'var(--c-ac)' : 'var(--mu)',
                borderLeft: filter==='all' ? '3px solid var(--c-ac)' : '3px solid transparent'
              }}>
              <Circle size={6} fill={filter==='all'?'var(--c-ac)':'var(--mu)'} />
              <span className="font-medium">All stories</span>
            </button>
            {Object.entries(CAT).map(([id, c]) => (
              <button
                key={id}
                onClick={() => setFilter(id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  background: filter===id ? c.bg : 'transparent',
                  color: filter===id ? c.color : 'var(--mu)',
                  borderLeft: filter===id ? `3px solid ${c.color}` : '3px solid transparent'
                }}>
                <Circle size={6} fill={filter===id ? c.color : 'var(--mu)'} />
                <span className="font-medium">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t" style={{ borderColor:'var(--border)' }}>
          <span className="block px-3 pb-2 text-[10px] uppercase tracking-[0.08em] font-bold" style={{ fontFamily:'var(--font-mono)', color:'var(--mu)' }}>Archive</span>
          <a href="/briefing" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
            <Archive size={14} />
            Browse past briefings
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-auto">
        <header className="sticky top-0 z-40 px-6 py-4 border-b flex items-center justify-between" style={{ background:'rgba(255,255,255,0.85)', backdropFilter:'blur(16px)', borderColor:'var(--border)' }}>
          <div className="flex items-center gap-4">
            <h2 className="text-base font-medium" style={{ color:'var(--tx)' }}>{today}</h2>
            {status && <StatusBadge status={status.status} />}
            {status?.generatedAt && <span className="text-xs" style={{ color:'var(--mu)' }}>Generated {new Date(status.generatedAt).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => copy('digest')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
              <FileText size={14} />
              {copied==='digest' ? 'Copied!' : 'Headlines only'}
            </button>
            <button onClick={() => copy('full')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
              <Copy size={14} />
              {copied==='full' ? 'Copied!' : 'Copy full briefing'}
            </button>
            {/* {!isDone && allFive && (
              <button onClick={approve} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-lg" style={{ background:'linear-gradient(to top right, #007DB8, #006FA6)', color:'white' }}>
                <CheckCircle size={16} />
                Approve & ready to send
              </button>
            )}
            {isDone && (
              <button onClick={() => setSendModal(true)} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background:'var(--c-acBg)', color:'var(--c-ac)', border:`1px solid ${CAT.updates.border}` }}>
                <Sparkles size={16} />
                Mark as sent
              </button>
            )} */}
          </div>
        </header>

        <div className="flex-1 p-6 max-w-5xl w-full mx-auto">
          {status && (
            <div className="mb-6 px-4 py-3 rounded-xl border flex items-center gap-4" style={{ background:'var(--surface)', borderColor:'var(--border)' }}>
              <Circle size={8} fill={status.todayFetched?'#10B981':'#EF4444'} />
              <span className="text-sm" style={{ color:'var(--tx)' }}>
                {status.todayFetched ? `${status.count}/5 categories fetched` : 'Pipeline has not run today'}
              </span>
              {status.count < 5 && status.count > 0 && <span className="text-xs px-2 py-1 rounded-full" style={{ background:'#FEF3C7', color:'#F59E0B' }}>Missing categories</span>}
              <span className="ml-auto text-xs" style={{ color:'var(--mu)' }}>{status.availableDays} days archived</span>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <RefreshCw size={24} className="animate-spin" style={{ color:'var(--mu)' }} />
              <span className="text-sm" style={{ color:'var(--mu)' }}>Loading briefing...</span>
            </div>
          )}

          {!loading && !briefing && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="text-5xl mb-2">📭</div>
              <h3 className="text-2xl mb-2" style={{ fontFamily:'var(--font-serif)', color:'var(--tx)' }}>No briefing yet</h3>
              <p className="text-sm max-w-md leading-relaxed" style={{ color:'var(--mu)' }}>
                The Claude Code Routine runs at 9am IST. To run it now, open Claude Code in this project folder — it fetches the briefing automatically on session start.
              </p>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => {
              const c = CAT[item.category];
              const isEd = editing[item.id] !== undefined;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity:0, y:14 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.45, delay:idx*0.08, ease:[0.22,1,0.36,1] }}
                  className="mb-4 rounded-2xl border overflow-hidden transition-all duration-300"
                  style={{
                    background:'var(--surface)',
                    borderColor: isEd ? c.border : 'var(--border)',
                    boxShadow: isEd ? `0 0 0 3px ${c.bg}` : 'none'
                  }}>
                  <div className="h-1" style={{ background:c.color }} />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.06em]" style={{ fontFamily:'var(--font-mono)', background:c.bg, color:c.color, border:`1px solid ${c.border}` }}>
                        {c.label}
                      </span>
                      <span className="text-xs" style={{ color:'var(--mu)' }}>{item.source}</span>
                      <span style={{ color:'var(--dm)' }}>·</span>
                      <span className="text-xs" style={{ color:'var(--mu)' }}>{item.publishedDate}</span>
                      {item.tools?.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-full border text-[9px]" style={{ background:'var(--c-sf2)', color:'var(--mu)', borderColor:'var(--border)' }}>{t}</span>
                      ))}
                    </div>

                    <h3 className="text-xl mb-2 leading-tight" style={{ fontFamily:'var(--font-serif)', color:'var(--tx)' }}>{item.headline}</h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--mu)' }}>{item.summary}</p>

                    <div className="mb-4 p-4 rounded-xl border" style={{ background:c.bg, borderColor:c.border }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={10} style={{ color:c.color }} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ fontFamily:'var(--font-mono)', color:c.color }}>LevelShift Lens</span>
                      </div>
                      {isEd ? (
                        <textarea
                          value={editing[item.id]}
                          onChange={e => setEditing(ed=>({...ed,[item.id]:e.target.value}))}
                          rows={4}
                          autoFocus
                          className="w-full px-3 py-2 rounded-lg border text-sm leading-relaxed resize-vertical outline-none focus:border-[var(--c-ac)] focus:ring-2 focus:ring-[var(--c-acBg)] transition-all"
                          style={{ background:'var(--surface)', borderColor:'var(--border)', color:'var(--tx)' }}
                        />
                      ) : (
                        <p className="text-sm leading-relaxed" style={{ color:'var(--tx)' }}>{item.levelshiftAngle}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {!isEd ? (
                          <>
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                              <ExternalLink size={12} />
                              Read article
                            </a>
                            <button onClick={() => copyCard(item)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                              {copied===item.id ? <Check size={12} /> : <Copy size={12} />}
                              {copied===item.id ? 'Copied!' : 'Copy story'}
                            </button>
                            <button onClick={() => setEditing(ed=>({...ed,[item.id]:item.levelshiftAngle}))} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                              <Edit2 size={12} />
                              Edit lens
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={()=>saveEdit(item.id)} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold" style={{ background:'var(--c-acBg)', color:'var(--c-ac)', border:`1px solid ${CAT.updates.border}` }}>
                              <Save size={12} />
                              Save
                            </button>
                            <button onClick={()=>setEditing(ed=>{const n={...ed};delete n[item.id];return n;})} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 hover:border-[var(--c-rd)] hover:text-[var(--c-rd)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                              <X size={12} />
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.08em] font-bold" style={{ fontFamily:'var(--font-mono)', color:'var(--mu)' }}>Relevance</span>
                        <RelevanceScore score={item.relevanceScore||0} color={c.color} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </main>

      {/* Send modal */}
      <AnimatePresence>
        {sendModal && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background:'rgba(0,0,0,0.3)', backdropFilter:'blur(6px)' }}
            onClick={() => setSendModal(false)}>
            <motion.div
              initial={{ scale:0.95, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              exit={{ scale:0.95, opacity:0 }}
              className="w-full max-w-md p-6 rounded-2xl border shadow-xl"
              style={{ background:'var(--surface)', borderColor:'var(--border)' }}
              onClick={e => e.stopPropagation()}>
              <h3 className="text-xl mb-2" style={{ fontFamily:'var(--font-serif)', color:'var(--tx)' }}>Mark as sent</h3>
              <p className="text-sm mb-4" style={{ color:'var(--mu)' }}>Which teams received this briefing?</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {TEAMS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTeams(s => s.includes(t) ? s.filter(x=>x!==t) : [...s,t])}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                    style={{
                      background: teams.includes(t) ? 'var(--c-acBg)' : 'var(--c-sf2)',
                      color: teams.includes(t) ? 'var(--c-ac)' : 'var(--mu)',
                      border: teams.includes(t) ? `1px solid ${CAT.updates.border}` : '1px solid var(--border)'
                    }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setSendModal(false)} className="px-4 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                  Cancel
                </button>
                <button onClick={async () => {
                  await fetch('/api/approve', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ date:briefing.date, teams, markSent:true }) });
                  setSendModal(false);
                  showToast(`Marked as sent to ${teams.join(', ')||'team'}`, 'ok');
                  load();
                }} className="px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md" style={{ background:'linear-gradient(to top right, #007DB8, #006FA6)', color:'white' }}>
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast {...toast} />}
      </AnimatePresence>
    </div>
  );
}
