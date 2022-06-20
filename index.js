const { FilePdf } = require("./src/controllers/filePdf.js");

const file = new FilePdf("./temp/exemplo.pdf");
const file2 = new FilePdf("./temp/exemplo2.pdf");

file.getMonetaryText();
file2.getMonetaryText();