const { assert } = require("chai");
const { Pdf } = require("../src/controllers/Pdf.js");

describe("testing pedro.Pdf", () => {
  it("Obtendo valores", async () => {
    const file = new Pdf();
    assert.deepEqual(await file.getMonetaryValues('../uploads/pedro.pdf'),
      "R$1.500,00"
    );
  });
  it("testing jurandir.pdf", async () => {
    const file2 = new Pdf();
    assert.deepEqual(await file2.getMonetaryValues('../uploads/jurandir.pdf'),
      "R$ 1.500,00");
  });
  it("testing abra.pdf", async () => {
    const file3 = new Pdf();
    assert.deepEqual(await file3.getMonetaryValues("../uploads/abra.pdf"),
      "(R$) 1.500,00");
  });
});
