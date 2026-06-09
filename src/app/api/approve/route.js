import { approveBriefing, markSent } from '@/lib/data';
export async function POST(req) {
  try {
    const { date, teams, markSent: ms } = await req.json();
    if (!date) return Response.json({ success:false, error:'date required' }, { status:400 });
    if (ms && teams) { markSent(date, teams); return Response.json({ success:true }); }
    const ok = approveBriefing(date);
    if (!ok) return Response.json({ success:false, error:'Not found' }, { status:404 });
    return Response.json({ success:true, approvedAt: new Date().toISOString() });
  } catch(e) { return Response.json({ success:false, error:e.message }, { status:500 }); }
}
