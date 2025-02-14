import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // CORS-Header setzen, um Zugriff zu erlauben
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");

  // OPTIONS-Requests für Preflight-Anfragen von CORS korrekt behandeln
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const filePath = path.resolve("./public/chat-widget.js");

  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "chat-widget.js not found" });
    return;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");

  res.status(200).send(fileContent);
}
