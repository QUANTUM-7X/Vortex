// ==========================
//  Key Manager (Ultra-Stable)
// ==========================

export interface KeyStatus {
  key: string;
  isDisabled: boolean;
  cooldownUntil: number;
  usageCount: number;
  lastUsed: number;
}

let keys: KeyStatus[] = [];
let initialized = false;
let currentIndex = 0;

// --------------------------
// Load Keys from Environment
// --------------------------
export function initKeys() {
  if (initialized) return;

  const envKeys = Object.keys(process.env)
    .filter(k =>
      k.startsWith("GOOGLE_KEY_") ||
      k.startsWith("GEMINI_KEY_") ||
      k === "GEMINI_API_KEY"
    )
    .sort();

  const rawKeys = envKeys
    .map(k => process.env[k] || "")
    .filter(v => v && v !== "MY_GEMINI_API_KEY" && v !== "YOUR_API_KEY");

  keys = rawKeys.map(key => ({
    key,
    isDisabled: false,
    cooldownUntil: 0,
    usageCount: 0,
    lastUsed: 0,
  }));

  if (keys.length === 0) {
    console.error("[KeyManager] ❌ No API keys found in environment!");
  } else {
    console.log("[KeyManager] ✅ Loaded", keys.length, "API keys.");
  }

  initialized = true;
}

// ---------------------------------------------
// Smart Key Rotation: Balanced & Cooldown Safe
// ---------------------------------------------
export function getNextAvailableKey(): string | null {
  if (!initialized) initKeys();
  if (keys.length === 0) return null;

  const now = Date.now();
  let attempts = 0;

  while (attempts < keys.length) {
    const key = keys[currentIndex];
    currentIndex = (currentIndex + 1) % keys.length;

    // skip disabled keys
    if (key.isDisabled) {
      attempts++;
      continue;
    }

    // skip cooldown keys
    if (key.cooldownUntil > now) {
      attempts++;
      continue;
    }

    // valid key found
    key.lastUsed = now;
    key.usageCount++;

    return key.key;
  }

  return null; // no key available
}

// ------------------------------------------------------
// Handle Key Failures (Invalid, Quota, Rate Limit, Server)
// ------------------------------------------------------
export function reportKeyFailure(
  failedKey: string,
  errorType: "RATE_LIMIT" | "INVALID" | "SERVER_ERROR" | "QUOTA"
) {
  const keyObj = keys.find(k => k.key === failedKey);
  if (!keyObj) return;

  switch (errorType) {
    case "INVALID":
      keyObj.isDisabled = true;
      console.error(
        `❌ [KeyManager] Key ...${failedKey.slice(-4)} permanently DISABLED (INVALID)`
      );
      break;

    case "RATE_LIMIT":
    case "QUOTA":
      keyObj.cooldownUntil = Date.now() + 60_000;
      console.warn(
        `⚠️ [KeyManager] Key ...${failedKey.slice(-4)} cooldown 60s (${errorType})`
      );
      break;

    case "SERVER_ERROR":
      keyObj.cooldownUntil = Date.now() + 30_000;
      console.warn(
        `⚠️ [KeyManager] Key ...${failedKey.slice(-4)} cooldown 30s (Server Error)`
      );
      break;
  }
}
