// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Serve everything in the current directory
app.use(express.static(__dirname));

// Fallback to index.html for "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "main.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
