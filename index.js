const { FilePdf } = require("./filePdf.js");

const file = new FilePdf("./temp/jurandir.pdf");// PDF não pesquisável
const file1 = new FilePdf("./temp/pedro.pdf");//PDF pesquisável
const file2 = new FilePdf("./temp/bia.pdf");//PDF pesquisável
const file3 = new FilePdf("./temp/abrao.pdf");// PDF não pesquisável

async function consoleAsync(file) {
  console.log(await file.getMonetaryValuesFromPdf());
}

consoleAsync(file3);

