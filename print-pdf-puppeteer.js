// const express = require("express");

// const puppeteer = require("puppeteer");
// const fs = require("fs");
// const path = require("path");
// const { exists } = require("node:fs");
// // const fetch = require("node-fetch"); // ติดตั้ง fetch เพื่อดึงข้อมูลจาก API
// const app = express();
// const port = 5000;
// async function generatePDF() {
//   return new Promise(async (resolve, reject) => {
//     const browser = await puppeteer.launch({
//       headless: true,
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       ignoreDefaultArgs: ["--disable-extensions"],
//     });
//     const page = await browser.newPage();
//     const htmlPath = path.resolve(
//       __dirname,
//       "src/htmlTemplate/htmltemplate.html"
//     );
//     const htmlContent = fs.readFileSync(htmlPath, "utf8");

//     // แทนที่ข้อมูลใน HTML template ด้วยข้อมูลจาก API
//     const updatedContent = htmlContent
//       .replace("Lorem ipsum dolor sit amet", "apninononxt")
//       .replace(
//         "<tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr>",
//         "apiData.section1Table"
//         // .map(
//         //   (row) =>
//         //     `<tr><td>${row.col1}</td><td>${row.col2}</td><td>${row.col3}</td></tr>`
//         // )
//         // .join("")
//       )
//       .replace("Some text for the second section.", "apiData.section2Text")
//       .replace(
//         "<tr><td>Data 1</td><td>Data 2</td><td>Data 3</td></tr>",
//         " apiData.section2Table"
//         // .map(
//         //   (row) =>
//         //     `<tr><td>${row.col1}</td><td>${row.col2}</td><td>${row.col3}</td></tr>`
//         // )
//         // .join("")
//       );

//     await page.setContent(updatedContent, { waitUntil: "domcontentloaded" });

//     await page.pdf({
//       path: "output.pdf",
//       format: "A4",
//       printBackground: true,
//       margin: {
//         top: "10mm",
//         bottom: "10mm",
//         left: "10mm",
//         right: "10mm",
//       },
//     });

//     await browser.close();
//     resolve();
//   });
// }

// app.get("/test-pdf", async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, "output.pdf");
//     console.log(fs.existsSync(filePath));

//     if (fs.existsSync(filePath)) {
//       await generatePDF();
//       res.sendFile(filePath);
//     } else {
//       await generatePDF();
//       res.sendFile(filePath);
//     }

//     // res.sendFile(filePath);
//   } catch (err) {
//     console.log(err);
//     res.end;
//   }
// });
// console.log(path.resolve(__dirname, "output.pdf"));
// app.listen(port, () => {
//   console.log(`test-pdf-puppetteer at port ${port}`);
// });
/////////////////////////////////////////////////////////////////////

const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;
const htmlPath = path.resolve(__dirname, "src/htmlTemplate/htmltemplate.html");
const htmlContent = fs.readFileSync(htmlPath, "utf8");

// const createPdf = async (content) => {
//   const browser = await puppeteer.launch({
//     headless: true,
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//     // ignoreDefaultArgs: ["--disable-extensions"],
//   });
//   const page = await browser.newPage();
//   await page.setContent(htmlContent); // HTML ที่จะใช้สร้าง PDF

//   const pdfBuffer = await page.pdf({ format: "A4" });

//   await browser.close();
//   return pdfBuffer;
// };
const createPdf = (content) => {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    const page = await browser.newPage();
    await page.setContent(content); // HTML ที่จะใช้สร้าง PDF

    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();
    resolve(pdfBuffer);
  });
};
app.get("/test-pdf", async (req, res) => {
  // const browser = await puppeteer.launch({
  //   headless: true,
  //   args: ["--no-sandbox", "--disable-setuid-sandbox"],
  //   // ignoreDefaultArgs: ["--disable-extensions"],
  // });
  // const page = await browser.newPage();
  // await page.setContent(htmlContent); // HTML ที่จะใช้สร้าง PDF

  // const pdfBuffer = await page.pdf({ format: "A4" });

  // await browser.close();
  const pdfBuffer = await createPdf(htmlContent);
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdfBuffer);
});

app.listen(5000);
