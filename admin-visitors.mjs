import { getStore } from "@netlify/blobs";
import { authorized, json } from "./_auth.mjs";

export default async (event) => {
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });
  if (!authorized(event)) return json(401, { error: "Unauthorized" });
  try {
    const store = getStore("consented-device-info");
    const listed = await store.list({ prefix: "visitor-" });
    const items = [];
    for (const entry of listed.blobs || []) {
      const value = await store.get(entry.key, { type: "json" });
      if (value) items.push(value);
    }
    items.sort((a,b) => String(b.receivedAt).localeCompare(String(a.receivedAt)));
    return json(200, { items });
  } catch {
    return json(500, { error: "Could not load records" });
  }
};
