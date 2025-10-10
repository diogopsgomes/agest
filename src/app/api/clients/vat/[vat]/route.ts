import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ vat: string }> }) {
	try {
		const { vat } = await params;

		if (!vat) return new Response(JSON.stringify({ error: "NIPC obrigatório" }), { status: 400, headers: { "Content-Type": "application/json" } });

		const apiKey = process.env.VAT_LOOKUP_API_KEY ?? process.env.NEXT_PUBLIC_VAT_LOOKUP_API_KEY ?? "";
		const apiUrl = `https://www.nif.pt/?json=1&q=${encodeURIComponent(vat)}${apiKey ? `&key=${encodeURIComponent(apiKey)}` : ""}`;

		const res = await fetch(apiUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

		const text = await res.text();

		return new Response(text, {
			status: res.status,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err?.message ?? "Erro ao obter dados" }), { status: 500, headers: { "Content-Type": "application/json" } });
	}
}
