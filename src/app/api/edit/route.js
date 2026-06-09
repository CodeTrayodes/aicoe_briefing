import { updateCard } from '@/lib/data';
export async function POST(req) {
  try {
    const { date, cardId, patch } = await req.json();
    if (!date || !cardId || !patch) return Response.json({ success:false, error:'date, cardId, patch required' }, { status:400 });
    const ok = updateCard(date, cardId, patch);
    if (!ok) return Response.json({ success:false, error:'Card not found' }, { status:404 });
    return Response.json({ success:true });
  } catch(e) { return Response.json({ success:false, error:e.message }, { status:500 }); }
}
