import fs from "fs";
import path from "path";
import https from "https";
import express from "express";
import { fileURLToPath } from "url";
import helmet from "helmet";

const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());

app.use(express.static("public"));

app.get("/secret", (req, res) => {
  return res.send("Your secret goes here");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
