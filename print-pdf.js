const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const axios = require("axios");
const app = express();
const port = 5000;

const getDataFromApi = async () => {
  const apiUrl = "http://localhost:8000";
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${apiUrl}/api/product/getOrder`,
  };
  try {
    const response = await axios(config);

    return response.data.data;
  } catch (err) {
    console.log(err);
  }
};
// getDataFromApi();
// app.get("/generate-pdf", (req, res) => {
//   const doc = new PDFDocument();
//   const lorem =
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

//   // Stream the PDF to the response
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

//   doc.pipe(res);
//   doc.text(`${lorem}`, {
//     width: 410,
//     align: "center",
//   });

//   doc.moveDown();
//   doc.text(`${lorem}`, {
//     width: 600,
//     align: "center",
//   });
//   // Add some content to the PDF
//   //   doc.fontSize(25).text("Hello, this is a test PDF!", 100, 100);

//   // Finalize the PDF and end the stream
//   doc.end();
// });

async function createPDF() {
  // เรียกข้อมูลจาก API
  const data = await getDataFromApi();
  console.log(data);
  // สร้าง PDF document ใหม่

  const doc = new PDFDocument({ size: "A4" });
  doc.font("src/fonts/static/NotoSansThai-Regular.ttf");
  doc.pipe(fs.createWriteStream("output.pdf"));

  // doc.fontSize(30).text(`ตั๋วรับจำนำ`, {
  //   align: "center",
  // });
  // doc.fontSize(25).text(`สถานธนานุบาลถนนเสือป่า`, {
  //   align: "center",
  // });
  // doc
  //   .fontSize(16)
  //   .text(
  //     `ใบอนุญาติตั้งโรงรับจำนำเล่มที่ 19 เลขที่ ..... เลขที่ 1 ถนนเสือป่า แขวงป้อมปราบ เขตป้อมปราบศัตรูพ่าย กรุงเทพมหานคร โทร. 0 2225 8117,0 2221 9115`,
  //     {
  //       align: "center",
  //     }
  //   );
  doc.fontSize(75).text("อิอิ", {
    align: "justify",
  });
  // ปิดและบันทึก PDF
  doc.end();
}

app.get("/generate-pdf", async (req, res) => {
  await createPDF();
  try {
    const filePath = __dirname + "/output.pdf";
    res.sendFile(filePath);
  } catch (err) {}
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
