const { FileManager } = require("./src/scripts/FileManager.js");
const fileManager = new FileManager();

pathFiles =
  [
    "abra.pdf",
    "bia.pdf",
    "pedro.pdf",
   "jurandir.pdf"
  ]

const brazilianCurrency = (
  /(\(?\s?R\s?\$\s?\)?\s?\:?\s?)(\d{1,2}.)(\d{3})(,\d{2})?/g
)

pathFiles.forEach(async (path) => {
  console.log(await fileManager.getSearchResult("./uploads/" + path, brazilianCurrency))
});

