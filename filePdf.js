const pdfParse = require("pdf-parse");
const fs = require("fs");
const Tesseract = require('tesseract.js');
const pdf2img = require('pdf-img-convert');

class FilePdf {
  #pathFile;

  constructor(pathFile) {
    this.#pathFile = pathFile;
  }

  async getMonetaryValuesFromPdf() {
    try {
      const databuffer = this.#readTextPdf();
      const pdf = await this.#convertToPdf(databuffer);
      const filteredValues = this.#filterMonetaryValues(pdf.text);
      if (filteredValues === null) {
        console.log("entrou no if")
        this.#convertPdfToImage();
        const TextFromImage = await this.#GetTextFromImage();
        return this.#filterMonetaryValues(TextFromImage) ;
      } else {
        return filteredValues[0];
      }

    } catch (error) {
      if (error.code == "ENOENT") {
        return "Erro no caminho do arquivo";
      } else {
       console.log(error)
        
      }
    }
  }

  async #convertPdfToImage() {
    var config = { width: 1024, height: 768, page_numbers: [1] };

    var pdfArray = await pdf2img.convert(this.#pathFile, config);
    console.log("saving image");
    for (i = 0; i < pdfArray.length; i++) {
      fs.writeFile("output" + i + ".png", pdfArray[i], function (error) {
        if (error) { console.error("Error: " + error); }
      }); //writeFile
    } // for
  }

  async #GetTextFromImage() {
    let { data: { text } } = await Tesseract.recognize(
      "./output0.png",
      'por',
    )
    return text;
  }

  #readTextPdf() {
    return fs.readFileSync(this.#pathFile);
  }

  async #convertToPdf(databuffer) {
    return await pdfParse(databuffer);
  }

  #filterMonetaryValues(pdfText) {
    const monetaryValues = pdfText.match(
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
