import fs from "fs";
import path from "path";
import https from "https";
import express from "express";
import { fileURLToPath } from "url";
import helmet from "helmet";
import { error } from "console";

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in",
    });
  }
  next();
}

app.get("/auth/google", (req, res) => {});
app.get("/auth/google/redirect", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

app.use(express.static("public"));

app.get("/secret", checkLoggedIn, (req, res) => {
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
