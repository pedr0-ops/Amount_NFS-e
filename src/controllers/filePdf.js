const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CLIENT_RENEG_LIMIT } = require("tls");
class FilePdf {
  #pathFile;

  constructor(pathFile) {
    this.#pathFile = pathFile;
  }

  readTextPdf() {
    pdfParse(this.pathFile)
      .then((pdfText) => {
        this.#showMonetaryValues(pdfText);
      })
      .catch(() => {
        console.log("Arquivo Não Existe!");
      });
  }

  #filterMonetaryValues(pdfText) {
    const monetaryValues = pdfText.text.match(
      /R\s?\$\s?(\d{1,3}.)?(\d{3}.)*(\d{1,3})(,\d{2})?/gm
    );
    return monetaryValues;
  }

  #showMonetaryValues(monetaryValues) {
    console.log(this.#pathFile);
    console.table(this.#filterMonetaryValues(monetaryValues));
  }

  get pathFile() {
    return this.#pathFile;
  }

  set pathFile(newPathFile) {
    this.#pathFile = newPathFile;
  }
}

module.exports = { FilePdf };
