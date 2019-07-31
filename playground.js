let fs = require('fs');

let PDFParser = require('pdf2json');

function createFileFromPDF(pdfSourceLocation, pdfStoreDestination) {
  let pdfParser = new PDFParser(this, 1);

  pdfParser.on('pdfParser_dataError', errData =>
    console.error(errData.parserError),
  );
  pdfParser.on('pdfParser_dataReady', pdfData => {
    fs.writeFileSync(pdfStoreDestination, pdfParser.getRawTextContent());
  });

  pdfParser.loadPDF(pdfSourceLocation);
}

const file = fs.readFileSync('./content.txt', 'utf-8');
const regexToFindTOC = new RegExp(/table(\s)*of(\s)*contents|contents(.)*/i);

const regexToFindTOCLine = new RegExp(/\d+(\.\d+)\s+.*\.*\d/gi);
const matchedString = file.match(regexToFindTOC);
const matchedStringIndex = file.search(regexToFindTOC);

const stringAfterToc = file.substring(
  matchedStringIndex + matchedString[0].length,
);
const tocAsString = stringAfterToc.match(regexToFindTOCLine);
const formattedTOC = tocAsString.map(line => {
  const matchTopic = line.match(/\d+(\.\d+)\s+/);
  const pageNumber = line.match(/\d+$/);
  const topic = line.match(/\s+.*/);
  // Unable to find topic
  return {
    chapter: matchTopic[0],
    topic: topic,
    page: pageNumber[0],
  };
});
console.log(formattedTOC);
