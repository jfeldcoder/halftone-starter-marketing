import { NextResponse } from "next/server";

/**
 * Quote form endpoint.
 * - With RESEND_API_KEY + QUOTE_TO_EMAIL set (Vercel env), sends an email via Resend.
 * - Otherwise logs the payload (visible in Vercel function logs) and returns ok, so the
 *   form still works in the pitch build.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field.
  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Name and a valid email are required." }, { status: 400 });
  }

  const lines = Object.entries(body)
    .filter(([k]) => k !== "company")
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v ?? "")}`)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  if (apiKey && to) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.QUOTE_FROM_EMAIL || "EventPro Website <quotes@eventproseating.com>",
        to: [to],
        reply_to: email,
        subject: `Quote request from ${name}`,
        text: lines,
      }),
    });
    if (!res.ok) {
      console.error("Resend error", await res.text());
      return NextResponse.json({ ok: false, error: "Email failed" }, { status: 502 });
    }
  } else {
    console.log("[quote request]\n" + lines);
  }

  return NextResponse.json({ ok: true });
}
