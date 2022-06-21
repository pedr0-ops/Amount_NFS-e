const { assert } = require('chai');
const { FilePdf } = require("./src/controllers/filePdf.js");

describe('testing filePdf', () => {
    it('Obtendo valores', async () => {
        const file = new FilePdf("./temp/exemplo.pdf");
        assert.deepEqual(await file.readTextPdf(), ['R $1.500,00', 'R $2.000,00', 'R$2.500,00'])
    })
    it('Obtendo valores', async () => {
        const file2 = new FilePdf("./temp/exemplo2.pdf");
        assert.deepEqual(await file2.readTextPdf(), ['R$ 25.600', 'R $ 4.500,00', 'R$2', 'R$ 230,00'])
    })

})