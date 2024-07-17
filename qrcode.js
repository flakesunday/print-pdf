const express = require("express");
const QRCode = require("qrcode");
const axios = require("axios");

const app = express();
const port = 5000;

// Endpoint เพื่อรับข้อมูลจาก API
app.get("/api/data", async (req, res) => {
  const mockData = {
    id: 1,
    name: "Example",
    info: "This is mock data for testing.",
  };
  res.json(mockData);
});

// Endpoint เพื่อสร้าง QR code
app.get("/generate-qrcode", (req, res) => {
  const apiUrl = `http://localhost:${port}/api/data`;

  QRCode.toDataURL(apiUrl, (err, url) => {
    if (err) {
      res.status(500).send("Error generating QR Code");
    } else {
      res.send(`<img src="${url}">`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
