// -------------------------------------------------------------
//  ULTRA-ADVANCED MARKET CONTEXT ENGINE (UPGRADED)
//  - Fully safe on Vercel (no crash, no SSR errors)
//  - Auto-timeout protection
//  - Rich contextual fusion of all APIs
//  - Institutional-grade formatting
// -------------------------------------------------------------

export async function fetchMarketContext(pair: string): Promise<string> {
  const alphaVantageKey = process.env.ALPHAVANTAGE_API_KEY;
  const finnhubKey = process.env.FINNHUB_API_KEY;
  const taapiKey = process.env.TAAPI_API_KEY;
  const newsApiKey = process.env.NEWSAPI_API_KEY;
  const twelvedataKey = process.env.TWELVEDATA_API_KEY;

  const cleanPair = pair.replace('/', '').replace('-', '');

  let context =
    `===========================
 REAL-TIME MARKET CONTEXT FUSION
 Pair: ${pair}
============================\n`;

  // ---------- SAFETY FUNCTION: prevents fetch from hanging ----------
  const safeFetch = async (url: string) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { "Cache-Control": "no-store" },
      });

      clearTimeout(timer);

      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      return null;
    }
  };

  // ---------- PROMISE COLLECTOR ----------
  const tasks: Promise<string>[] = [];

  // ---------------------------------------
  // FINNHUB
  // ---------------------------------------
  if (finnhubKey) {
    tasks.push(
      safeFetch(`https://finnhub.io/api/v1/quote?symbol=${cleanPair}&token=${finnhubKey}`)
        .then((data) =>
          data
            ? `Finnhub → Price: ${data.c} | High: ${data.h} | Low: ${data.l}`
            : "Finnhub: No data"
        )
    );
  }

  // ---------------------------------------
  // TWELVEDATA PRICE
  // ---------------------------------------
  if (twelvedataKey) {
    tasks.push(
      safeFetch(`https://api.twelvedata.com/price?symbol=${pair}&apikey=${twelvedataKey}`)
        .then((data) =>
          data?.price
            ? `TwelveData → Price: ${data.price}`
            : "TwelveData: No data"
        )
    );
  }

  // ---------------------------------------
  // ALPHA VANTAGE EXCHANGE RATE
  // ---------------------------------------
  if (alphaVantageKey) {
    const base = pair.substring(0, 3);
    const quote = pair.substring(3, 6);

    tasks.push(
      safeFetch(
        `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${base}&to_currency=${quote}&apikey=${alphaVantageKey}`
      ).then((data) => {
        const rate = data?.["Realtime Currency Exchange Rate"];
        return rate
          ? `AlphaVantage → Rate: ${rate["5. Exchange Rate"]} | Bid: ${rate["8. Bid Price"]} | Ask: ${rate["9. Ask Price"]}`
          : "AlphaVantage: No data";
      })
    );
  }

  // ---------------------------------------
  // NEWS API (Sentiment + Headlines)
  // ---------------------------------------
  if (newsApiKey) {
    tasks.push(
      safeFetch(
        `https://newsapi.org/v2/everything?q=${pair.substring(0, 3)} OR ${pair.substring(3, 6)}&sortBy=publishedAt&apiKey=${newsApiKey}`
      ).then((data) => {
        const titles = data?.articles
          ?.slice(0, 3)
          .map((a: any) => `• ${a.title}`)
          .join("\n");

        return titles
          ? `NewsAPI Latest Headlines:\n${titles}`
          : "NewsAPI: No recent articles";
      })
    );
  }

  // ---------------------------------------
  // TAAPI RSI
  // ---------------------------------------
  if (taapiKey) {
    tasks.push(
      safeFetch(
        `https://api.taapi.io/rsi?secret=${taapiKey}&exchange=binance&symbol=${cleanPair}&interval=1m`
      ).then((data) =>
        data?.value ? `TAAPI → RSI(1m): ${data.value}` : "TAAPI: No data"
      )
    );
  }

  // ---------------------------------------
  // EXECUTE AND JOIN RESULTS
  // ---------------------------------------
  const results = await Promise.allSettled(tasks);

  results.forEach((r) => {
    if (r.status === "fulfilled") context += r.value + "\n";
  });

  if (tasks.length === 0) {
    context +=
      "⚠️ No external market APIs detected. Running in pure vision-analysis mode.\n";
  }

  context += "============================================\n";

  return context;
}
