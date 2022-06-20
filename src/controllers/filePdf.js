const pdfParse = require("pdf-parse");
const fs = require("fs");
const { CLIENT_RENEG_LIMIT } = require("tls");
class FilePdf {
  #pathFile;

  constructor(pathFile) {
    this.#pathFile = pathFile;
  }

  getMonetaryText() {
    pdfParse(this.pathFile)
      .then((monetaryValues) => {
        this.#showMonetaryValues(monetaryValues);
      })
      .catch(() => {
        console.log("Arquivo Não Existe!");
      });
  }

  #filterMonetaryValues(monetaryValues) {
    const values = monetaryValues.text.match(
      /R\s?\$\s?(\d{1,3}.)?(\d{3}.)*(\d{1,3})(,\d{2})?/gm
    );
    return values;
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