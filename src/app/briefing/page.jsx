import { getLatestBriefing, getAvailableDays, CAT, ORDER } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Sparkles, Calendar } from 'lucide-react';
export const dynamic = 'force-dynamic';

export default function BriefingPage() {
  const b    = getLatestBriefing();
  const days = getAvailableDays();

  if (!b) return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4" style={{ background:'var(--bg)', color:'var(--tx)', fontFamily:'var(--font-sans)' }}>
      <div className="text-2xl" style={{ fontFamily:'var(--font-serif)' }}>No briefing available</div>
      <Link href="/admin" className="text-sm" style={{ color:'var(--c-ac)' }}>Go to admin →</Link>
    </div>
  );

  const items = [...b.items].sort((a,z) => ORDER.indexOf(a.category)-ORDER.indexOf(z.category));

  return (
    <div className="min-h-screen" style={{ background:'var(--bg)', color:'var(--tx)', fontFamily:'var(--font-sans)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b" style={{ borderColor:'var(--border)' }}>
          <Link href="/admin" className="inline-flex items-center gap-2 text-xs mb-6 px-3 py-1.5 rounded-lg border transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
            <ArrowLeft size={12} />
            Back to Admin
          </Link>
          <h1 className="text-4xl mb-3" style={{ fontFamily:'var(--font-serif)', color:'var(--tx)' }}>LevelShift Intelligence</h1>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em]" style={{ fontFamily:'var(--font-mono)', color:'var(--mu)' }}>
            <Calendar size={12} />
            {new Date(b.date+'T12:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {items.map(item => {
            const c = CAT[item.category];
            return (
              <div key={item.id} className="rounded-2xl border overflow-hidden" style={{ background:'var(--surface)', borderColor:'var(--border)' }}>
                <div className="h-1" style={{ background:c.color }} />
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.06em]" style={{ fontFamily:'var(--font-mono)', background:c.bg, color:c.color, border:`1px solid ${c.border}` }}>
                      {c.label}
                    </span>
                    <span className="text-xs" style={{ color:'var(--mu)' }}>{item.source} · {item.publishedDate}</span>
                  </div>

                  <h2 className="text-2xl mb-3 leading-tight" style={{ fontFamily:'var(--font-serif)', color:'var(--tx)' }}>{item.headline}</h2>
                  <p className="text-sm leading-relaxed mb-4" style={{ color:'var(--mu)' }}>{item.summary}</p>

                  <div className="mb-4 p-4 rounded-xl border" style={{ background:c.bg, borderColor:c.border }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={12} style={{ color:c.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ fontFamily:'var(--font-mono)', color:c.color }}>For LevelShift</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--tx)' }}>{item.levelshiftAngle}</p>
                  </div>

                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                    <ExternalLink size={14} />
                    Read full article
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Archive */}
        {days.length > 1 && (
          <div className="mt-12 pt-8 border-t" style={{ borderColor:'var(--border)' }}>
            <h3 className="text-sm mb-4 uppercase tracking-[0.08em] font-bold" style={{ fontFamily:'var(--font-mono)', color:'var(--mu)' }}>Past Briefings</h3>
            <div className="flex flex-wrap gap-2">
              {days.slice(1).map(d => (
                <Link key={d} href={`/briefing/${d}`} className="px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 hover:border-[var(--c-ac)] hover:text-[var(--c-ac)]" style={{ borderColor:'var(--border)', color:'var(--mu)' }}>
                  {new Date(d+'T12:00:00').toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
