import { getLatestBriefing, getAvailableDays } from '@/lib/data';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const b = getLatestBriefing();
    const days = getAvailableDays();
    const today = new Date().toISOString().slice(0, 10);
    return Response.json({
      success:true, today, todayFetched: days.includes(today),
      status: b?.status || 'none', count: b?.items?.length || 0,
      generatedAt: b?.generatedAt || null, approvedAt: b?.approvedAt || null,
      sentAt: b?.sentAt || null, availableDays: days.length
    });
  } catch(e) { return Response.json({ success:false, error:e.message }, { status:500 }); }
}
