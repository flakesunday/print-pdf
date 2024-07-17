const express = require("express");
const PDFDocument = require("pdfkit");
const fs = require("fs");

const app = express();
const port = 3000;

app.get("/generate-pdf", (req, res) => {
  const doc = new PDFDocument();
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus.  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.";

  // Stream the PDF to the response
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=output.pdf");

  doc.pipe(res);
  doc.text(`${lorem}`, {
    width: 410,
    align: "center",
  });

  doc.moveDown();
  doc.text(`${lorem}`, {
    width: 600,
    align: "center",
  });
  // Add some content to the PDF
  //   doc.fontSize(25).text("Hello, this is a test PDF!", 100, 100);

  // Finalize the PDF and end the stream
  doc.end();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
