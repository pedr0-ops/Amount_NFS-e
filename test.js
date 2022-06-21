const { assert } = require("chai");
const { FilePdf } = require("./src/models/filePdf.js");

describe("testing filePdf", () => {
  it("Obtendo valores", async () => {
    const file = new FilePdf("./temp/exemplo.pdf");
    assert.deepEqual(await file.readTextPdf(), [
      "R $1.500,00",
      "R $2.000,00",
      "R$2.500,00",
    ]);
  });
  it("Verificando mensagem de erro", async () => {
    const file3 = new FilePdf("./temp/simboloerro.png");
    assert.deepEqual(await file3.readTextPdf(), "erro desconhecido");
  });
  it("Verificando mensagem de erro", async () => {
    const file3 = new FilePdf("./aleatorio/exemplo2.pdf");
    assert.deepEqual(await file3.readTextPdf(), "Erro no caminho do arquivo");
  });
});
