import { getStore } from "@netlify/blobs";
import { json } from "./_auth.mjs";

export default async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  try {
    const data = JSON.parse(event.body || "{}");
    const allowed = ["model","platform","browser","language","screen","timezone","sharedAt"];
    const record = {};
    for (const key of allowed) {
      if (typeof data[key] === "string") record[key] = data[key].slice(0, 1200);
    }
    record.id = crypto.randomUUID();
    record.receivedAt = new Date().toISOString();
    const store = getStore("consented-device-info");
    await store.setJSON(`visitor-${record.id}`, record);
    return json(200, { ok: true });
  } catch {
    return json(400, { error: "Invalid request" });
  }
};
