const pdfParse = require("pdf-parse");
const fs = require("fs");
const tesseract = require("tesseract.js");
const pdf2img = require("pdf-img-convert");

class FilePdf {
  #pathFile;

  constructor(pathFile) {
    this.#pathFile = pathFile;
  }

  async getMonetaryValuesFromPdf() {
    try {
      const databuffer = this.#readFile();
      const pdfInfo = await this.#getInfoFromPdf(databuffer);
      const filteredValuesPdf = this.#filterMonetaryValues(pdfInfo.text);
      if (filteredValuesPdf === null) {
        console.log("PDF identificado como digitalizado");
        this.#convertPdfToImage();
        const textFromImage = await this.#getTextFromImage();
        const filteredValuesImage = this.#filterMonetaryValues(textFromImage);
        return filteredValuesImage[0];
      } else {
        return filteredValuesPdf[0];
      }
    } catch (error) {
      if (error.code == "ENOENT") {
        return "Erro no caminho do arquivo";
      } else {
        console.log(error);
      }
    }
  }

  async #convertPdfToImage() {
    var config = { width: 1024, height: 768, page_numbers: [1] };
    var pdfArray = await pdf2img.convert(this.#pathFile, config);
    console.log("Transformando em imagem");
    for (i = 0; i < pdfArray.length; i++) {
      fs.writeFile("output" + i + ".png", pdfArray[i], function (error) {
        if (error) {
          console.error("Error: " + error);
        }
      });
    }
  }

  async #getTextFromImage() {
    let {
      data: { text },
    } = await tesseract.recognize("./output0.png", "por");
    return text;
  }

  #readFile() {
    return fs.readFileSync(this.#pathFile);
  }

  async #getInfoFromPdf(databuffer) {
    return pdfParse(databuffer);
  }

  #filterMonetaryValues(text) {
    const monetaryValues = text.match(
      /(\(?\s?R\s?\$\s?\)?\s?\:?\s?)(\d{1,2}.)(\d{3})(,\d{2})?/g
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
