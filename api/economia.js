import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Método não permitido");
  }

  let browser = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

    const response = await page.goto("https://agenciabrasil.ebc.com.br/rss/economia/feed.xml", {
      waitUntil: "networkidle0",
      timeout: 15000,
    });

    const xml = await response.text();
    await browser.close();

    res.setHeader("Content-Type", "application/rss+xml");
    res.status(200).send(xml);
  } catch (e) {
    if (browser) await browser.close();
    res.status(500).send("Erro ao buscar RSS: " + e.message);
  }
}