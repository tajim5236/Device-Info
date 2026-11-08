export function authorized(event) {
  const expectedUser = process.env.ADMIN_USER || "";
  const expectedPass = process.env.ADMIN_PASS || "";
  const header = event.headers.authorization || event.headers.Authorization || "";
  if (!header.startsWith("Basic ") || !expectedUser || !expectedPass) return false;
  let decoded = "";
  try { decoded = Buffer.from(header.slice(6), "base64").toString("utf8"); } catch { return false; }
  const split = decoded.indexOf(":");
  if (split < 0) return false;
  const user = decoded.slice(0, split);
  const pass = decoded.slice(split + 1);
  return user === expectedUser && pass === expectedPass;
}
export const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body)
});
