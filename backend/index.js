const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
  }),
  bodyParser.json()
);

app.post("/getimage", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send("Missing Prompt!");
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://huggingface.co/runwayml/stable-diffusion-v1-5");
  await page.type("form > div > input", text);
  await page.click("button[type=submit]");

  try {
    await page.waitForSelector("img.max-w-sm");
  } catch (error) {
    return res.status(500).send(error.name);
  }
  const elementHandle = await page.$("img.max-w-sm");
  const screenshot = await elementHandle.screenshot();

  await browser.close();

  const base64Image = screenshot.toString("base64");
  res.status(200).json({ imageBase64: base64Image });

//   res.writeHead(200, {
//     "Content-Type": "image/png",
//     "Content-Length": screenshot.length,
//   });
//   res.end(screenshot);
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
