import fs from "fs";
import path from "path";

const STORE_FILE = path.join(process.cwd(), "data", "push-subs.json");

function redis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redisCmd(client, command, key, value) {
  const endpoint = `${client.url}/${command}/${encodeURIComponent(key)}${value ? `/${encodeURIComponent(value)}` : ""}`;
  const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${client.token}` } });
  return res.json();
}

function readFileStore() {
  try {
    return JSON.parse(fs.readFileSync(STORE_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function writeFileStore(list) {
  fs.writeFileSync(STORE_FILE, JSON.stringify(list, null, 2));
}

export async function addSubscription(sub) {
  const client = redis();
  if (client) {
    await redisCmd(client, "SADD", "push-subscriptions", JSON.stringify(sub));
    return;
  }
  const list = readFileStore();
  if (!list.some((s) => JSON.stringify(s) === JSON.stringify(sub))) {
    list.push(sub);
    writeFileStore(list);
  }
}

export async function getSubscriptions() {
  const client = redis();
  if (client) {
    const data = await redisCmd(client, "SMEMBERS", "push-subscriptions");
    const members = Array.isArray(data) ? data : (data && data.result) || [];
    return members.map((m) => { try { return JSON.parse(m); } catch { return null; } }).filter(Boolean);
  }
  return readFileStore();
}

export async function removeSubscription(sub) {
  const client = redis();
  if (client) {
    await redisCmd(client, "SREM", "push-subscriptions", JSON.stringify(sub));
    return;
  }
  const list = readFileStore().filter((s) => JSON.stringify(s) !== JSON.stringify(sub));
  writeFileStore(list);
}
