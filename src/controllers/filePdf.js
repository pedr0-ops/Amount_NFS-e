const pdfParse = require("pdf-parse");
const fs = require("fs");

class FilePdf {
  #pathFile;

  constructor(pathFile) {
    this.#pathFile = pathFile;
  }

  async getMonetaryText() {
    pdfParse(this.pathFile)
      .then((monetaryValues) => {
        console.log(
          monetaryValues.text.match(
            /R\s?\$\s?(\d{1,3}.)?(\d{3}.)*(\d{1,3})(,\d{2})?/gm
          )
        );
      })
      .catch((error) => {
        console.log("Arquivo Não Existe!");
      });
  }

  get pathFile() {
    return this.#pathFile;
  }

  set pathFile(newPathFile) {
    this.#pathFile = newPathFile;
  }
}

module.exports = { FilePdf };
