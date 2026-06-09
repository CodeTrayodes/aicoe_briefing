import { getLatestBriefing, getDayBriefing, getAvailableDays } from '@/lib/data';
export const dynamic = 'force-dynamic';
export async function GET(req) {
  const p = new URL(req.url).searchParams;
  try {
    if (p.get('days')) {
      const n = Math.min(parseInt(p.get('days'))||7, 7);
      const data = getAvailableDays().slice(0,n).map(d => getDayBriefing(d)).filter(Boolean);
      return Response.json({ success:true, data, count:data.length });
    }
    const b = p.get('date') ? getDayBriefing(p.get('date')) : getLatestBriefing();
    if (!b) return Response.json({ success:false, error:'No briefing found' }, { status:404 });
    if (p.get('category')) return Response.json({ success:true, data: b.items?.find(i => i.category === p.get('category')) || null });
    return Response.json({ success:true, data:b });
  } catch(e) { return Response.json({ success:false, error:e.message }, { status:500 }); }
}
