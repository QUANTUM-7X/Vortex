// =======================================================================
//  QUANTUM VORTEX – GEMINI ROUTE CONTROLLER (MAX UPGRADED)
//  - Zero CORS issues
//  - Zero JSON errors
//  - Zero random crashes
//  - 100% Vercel serverless compatible
// =======================================================================

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { executeWithRetry } from "./_lib/retryEngine";

// Vercel Serverless Timeout Limit
export const maxDuration = 60;

// =======================================================================
//  MAIN HANDLER
// =======================================================================
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ----------------------------------------------------------
  // CORS — Fully open for frontend / mobile / extensions
  // ----------------------------------------------------------
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    // ----------------------------------------------------------
    // BODY VALIDATION
    // ----------------------------------------------------------
    const { prompt, image } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing or invalid prompt" });
    }

    // Optional image must be base64 string
    if (image && typeof image !== "string") {
      return res.status(400).json({ error: "Image must be a base64 string" });
    }

    // ----------------------------------------------------------
    // EXECUTE AI PIPELINE
    // ----------------------------------------------------------
    const result = await executeWithRetry(prompt, image);

    // ----------------------------------------------------------
    // FORCE CONSISTENT STRUCTURE
    // ----------------------------------------------------------
    return res.status(200).json({
      success: true,
      engine: "Quantum-Vortex",
      timestamp: Date.now(),
      output: result,
    });

  } catch (err: any) {
    console.error("Quantum Engine Critical Error:", err);

    // ==========================================================
    // SAFE ERROR RESPONSE (never exposes internal stack)
    // ==========================================================
    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        "Quantum Engine is calibrating. Please retry in a moment.",
    });
  }
      }
