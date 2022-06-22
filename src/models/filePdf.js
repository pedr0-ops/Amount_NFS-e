const pdfParse = require("pdf-parse");
const fs = require("fs");
class FilePdf {
  #pathFile;

  constructor(pathFile) {
    this.#pathFile = pathFile;
  }

  async getMonetaryValuesFromPdf() {
    try {
      const databuffer = this.#readTextPdf();
      const pdf = await this.#convertToPdf(databuffer);
      return this.#filterMonetaryValues(pdf);
    } catch (error) {
      if (error.code == "ENOENT") {
        return "Erro no caminho do arquivo";
      } else {
        return "erro desconhecido";
      }
    }
  }

  #readTextPdf() {
    return fs.readFileSync(this.#pathFile);
  }

  async #convertToPdf(databuffer) {
    return await pdfParse(databuffer);
  }

  #filterMonetaryValues(pdfText) {
    const monetaryValues = pdfText.text.match(
      /R\s?\$\s?(\d{1,3}.)?(\d{3}.)*(\d{1,3})(,\d{2})?/gm
    );
    return monetaryValues;
  }

  get pathFile() {
    return this.#pathFile;
  }

  set pathFile(newPathFile) {
    this.#pathFile = newPathFile;
  }
}

module.exports = { FilePdf };
