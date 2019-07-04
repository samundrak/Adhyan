const pdf_extract = require('pdf-extract');
const path = require('path');

const absolute_path_to_pdf = path.join(__dirname, 'pdf.pdf');
const options = {
  type: 'text', // perform ocr to get the text within the scanned image
};

module.exports = function(pdf) {
  const processor = pdf_extract(absolute_path_to_pdf, options, function(err) {
    if (err) {
      console.log(err);
      // return callback(err);
    }
  });

  const paragraphsMap = new Map();
  const pages = new Map();
  let paraCounter = 0;
  const topics = [];
  const ebookTree = {};

  const isLineTopic = (line, para) => {
    if (line.endsWith('.')) {
      return false;
    }

    if (line.length > 50) {
      return false;
    }
    return true;
  };
  const parseParagraph = paragraph => {
    const para = paragraph.split(/\n/);
    let topic = para[0];
    const lineLengths = para.map(item => item.length);
    const maxLine = Math.max(lineLengths);
    const isTopic = isLineTopic(topic);
    if (!isTopic) {
      topic = null;
    }
    return {
      topic,
      content: isTopic
        ? para.slice(1, para.length).join('\n')
        : para.join('\n'),
    };
  };

  processor.on('complete', function(data) {
    data.text_pages.slice(10, 11).forEach((page, pageNumber) => {
      const paragraphs = page.split(/\n\n\n?\n?\n?/);
      const paragraphIndexes = [];
      paragraphs.forEach(paragraph => {
        const parsedParagraph = parseParagraph(paragraph);
        if (parsedParagraph.topic) {
          topics.push({
            topicIndexedAt: paraCounter,
            topic: parsedParagraph.topic,
          });
        }
        paragraphsMap.set(paraCounter, parsedParagraph);
        paragraphIndexes.push(paraCounter);
        paraCounter++;
      });
      pages.set(pageNumber, paragraphIndexes);
    });

    console.log(pages);
    console.log(paragraphsMap);
    console.log(topics);
  });
};
