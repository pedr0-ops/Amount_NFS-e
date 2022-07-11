const { FilePdf } = require("./filePdf.js");
const file = new FilePdf("./temp/jurandir.pdf");
//const file1 = new FilePdf("./temp/pedro.pdf");
const file2 = new FilePdf("./temp/jurandir.pdf");

//const file3 = new FilePdf("./temp/abra.pdf");

async function consoleAsync(file) {
  console.log(await file.getMonetaryValuesFromPdf());
}

consoleAsync(file);

