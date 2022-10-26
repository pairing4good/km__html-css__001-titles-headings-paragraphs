const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");

let server;
let browser;
let page;

beforeAll(async () => {
  server = http.createServer(function (req, res) {
    fs.readFile(__dirname + "/.." + req.url, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  });

  server.listen(process.env.PORT || 3000);
});

afterAll(() => {
  server.close();
});

beforeEach(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/index.html");
});

afterEach(async () => {
  await browser.close();
});

describe("title", () => {
  it("should exist", async () => {
    const title = await page.$("head title");
    expect(title).not.toBeNull();
  });
});

describe("heading 1", () => {
  it("should exist", async () => {
    const heading = await page.$("h1");
    expect(heading).not.toBeNull();
  });
});

describe("paragraph", () => {
  it("should exist", async () => {
    const paragraph = await page.$("p");
    expect(paragraph).not.toBeNull();
  });
});
