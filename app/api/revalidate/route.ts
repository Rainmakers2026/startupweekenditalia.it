import { revalidateTag } from "next/cache";
import { REFERENTI_TAG } from "@/lib/airtable";

/** Da chiamare da un'automazione Airtable dopo una modifica manuale: POST /api/revalidate?secret=… */
export async function POST(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Non autorizzato" }, { status: 401 });
  }
  revalidateTag(REFERENTI_TAG, { expire: 0 });
  return Response.json({ ok: true });
}
