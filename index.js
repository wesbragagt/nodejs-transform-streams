const fs = require("fs");
const stream = require("stream");
const Transform = stream.Transform;

class streamSplitter extends Transform {

    _transform(chunk, enc, done) {
        const words = chunk.toString("utf8").split(/\s+/g);
        // Process words here. In this example we'll simply attach a number to each word.
        const upperCaseWord = word => word.toUpperCase()
        const processedChunk = words.map(upperCaseWord).join(' ');
        done(null, processedChunk);
    }
}

fs.createReadStream('lowercase.txt')
    .pipe(new streamSplitter())
    .pipe(fs.createWriteStream('uppercase.txt'))