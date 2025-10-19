export async function GET() {
  return Response.json({
    ok: true,
    env: process.env.VERCEL_ENV ?? "local",
    time: new Date().toISOString(),
  });
}
