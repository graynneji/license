const { Redis } = require("@upstash/redis");

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL, // Use your Upstash Redis URL
  token: process.env.UPSTASH_REDIS_REST_TOKEN, // Use your Upstash Redis token
});
// client.connect().catch(console.error);

/**
 * Set a cache key in Upstash Redis with optional TTL (default: 1 hour)
 * @param {string} key
 * @param {any} value
 * @param {number} ttl - Time to live in seconds
 */
async function setCache(key, value, ttl = 3600) {
  const serialized = JSON.stringify(value);
  await redis.set(key, serialized, { EX: ttl });
}

/**
 * Retrieve a cache key from Upstash Redis
 * @param {string} key
 * @returns {Promise<any|null>}
 */
async function getCache(key) {
  const result = await redis.get(key);
  if (!result) return null;

  if (typeof result === "object") return result;

  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}
module.exports = { setCache, getCache };
