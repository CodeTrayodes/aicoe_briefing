export async function POST(req) {
  try {
    const { category } = await req.json();
    if (!category) return Response.json({ success:false, error:'category required' }, { status:400 });
    // Re-fetch is handled by Claude Code directly.
    // Open Claude Code and say: "Replace the [category] story"
    return Response.json({
      success: false,
      error: `Re-fetch is handled by Claude Code. Open Claude Code and say: "Replace the ${category} story."`,
      instruction: 'Open Claude Code in the project folder and ask Claude to replace the story for this category.'
    }, { status:501 });
  } catch(e) { return Response.json({ success:false, error:e.message }, { status:500 }); }
}
