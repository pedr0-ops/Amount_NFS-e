// const { text } = require("stream/consumers");
const { FilePdf } = require("./src/controllers/filePdf.js");

const file = new FilePdf("./temp/exemplo.pdf");
file.getMonetaryText();

const file2 = new FilePdf("./temp/exemplo2.pdf");
file2.getMonetaryText();