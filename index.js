const { FilePdf } = require("./src/controllers/filePdf.js");
const file = new FilePdf("./temp/exemplo.pdf");
const file2 = new FilePdf("./temp/exemplo2.pdf");

 function consoleAsync(){
   ( async() =>{
        console.log(await file2.readTextPdf())

    })();
 }
 consoleAsync();
