const pdf = require("html-pdf");
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

const port = 5000;
function generatePDFfromHTML(htmlContent, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      // pdf.create(htmlContent).toFile(outputPath, (err, res) => {
      //   if (err) return console.log(err);
      //   console.log("PDF generated successfully:", res);
      // });
      pdf.create(htmlContent).toBuffer((err, buffer) => {
        if (err) {
          res.status(500).send("Error generating PDF");
          return;
        }
        resolve(buffer);

        // ตั้งค่า Content-Type เป็น application/pdf
      });
    } catch (err) {
      console.log(err);
      reject("err");
    }
  });
}

// Usage

const htmlContent = `<html lang="en">

<head>
    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
        p {
            margin: 0
        }
    </style>
</head>

<body style="font-family: Arial, sans-serif; color: green">
    <div style="  display: grid;gap: 10px;padding: 10px">

        <div style="grid-column:1; align-items: center; ">
            <div>ใบขายฝาด</div>
            <div style="display:grid;">
                <div style="grid-column:1; ">
                    qrcode
                </div>
                <div style="grid-column:2; ">
                    <p>เขียนที่ ร้าน ทดสอบ2</p>
                    <p>เลขที่1</p>
                    <p>แขวงยานนาวา เขตสาทร กรุงเทพฯ</p>
                    <br>
                    <p>10900</p>
                    <p>เบอร์โทร 0000000</p>
                </div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in scelerisque augue. Nam gravida
                    facilisis sem eget feugiat. Cras tincidunt, tortor in venenatis euismod, libero nulla aliquam massa,
                    ac
                    mollis diam libero et neque. Curabitur sit amet malesuada mauris, eu mattis libero. Donec tincidunt
                    blandit lectus, vitae viverra neque gravida a. Quisque nec porttitor eros. Ut non nibh egestas,
                    laoreet
                    tellus vel, rhoncus enim. Ut porta, tortor non accumsan fermentum, nibh velit dictum urna, ut
                    scelerisque tortor leo nec nisi.
                </div>

            </div>

        </div>
        <div style="grid-column:2">hello</div>
    </div>
</body>

</html>`;
// const htmlContent = "<h1>Hello World</h1><p>This is custom HTML content.</p>";

app.get("/test-html", async (req, res) => {
  try {
    const htmlPath = path.resolve(
      __dirname,
      "src/htmlTemplate/htmltemplate.html"
    );
    const htmlContentTemplate = fs.readFileSync(htmlPath, "utf8");
    const filePath = __dirname + "/output.pdf";
    const buffer = await generatePDFfromHTML(htmlContent, filePath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="sample.pdf"');

    // ส่งไฟล์ PDF
    res.send(buffer);
    // res.sendFile(buffer);
    // console.log(htmlContentTemplate);
  } catch (err) {
    console.log(err);
    res.end();
  }
});
app.listen(port, (req, res) => {
  console.log(`html run at port : ${port}`);
});
