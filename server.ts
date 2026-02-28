import express from "express";
import { createServer as createViteServer } from "vite";
import geminiHandler from "./api/gemini";

async function startServer() {
  console.log("Starting custom Express server...");
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.all(["/api/gemini", "/api/gemini/"], async (req, res) => {
    console.log(`Received ${req.method} request to /api/gemini`);
    try {
      await geminiHandler(req as any, res as any);
    } catch (error) {
      console.error("Error in geminiHandler:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
