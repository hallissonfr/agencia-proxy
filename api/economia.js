import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Método não permitido");
  }

  try {
    const response = await fetch("https://agenciabrasil.ebc.com.br/rss/economia/feed.xml", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
        "Accept": "application/rss+xml, application/xml"
      }
    });

    if (!response.ok) {
      return res.status(response.status).send("Erro ao buscar o RSS: " + response.statusText);
    }

    const xml = await response.text();

    res.setHeader("Content-Type", "application/rss+xml");
    res.status(200).send(xml);
  } catch (e) {
    res.status(500).send("Erro ao buscar RSS: " + e.message);
  }
}