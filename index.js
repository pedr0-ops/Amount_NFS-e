const { FilePdf } = require("./src/models/filePdf.js");
const file = new FilePdf("./temp/exemplo.pdf");
const file2 = new FilePdf("./temp/exemplo2.pdf");

async function consoleAsync(file) {
  console.log(await file.getFilteredPdf());
}
consoleAsync(file);
