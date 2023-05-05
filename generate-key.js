const { generateApiKey } = require('generate-api-key');
const fs = require('fs');
const filename = ".env";
fs.readFile(filename, 'utf8', function(err, data)
{
    if (err) throw err;
    let lines = data.split('\n').map((line) => {
        if(line.includes('API_SECRET')) 
            return `API_SECRET=${generateApiKey()}`;
        else 
            return line; 
    }).join('\n');
    fs.writeFile(filename, lines, (err) => {
        if (err) throw err;
        console.log('SUCCESS. API_SECRET GENERATED.')
    });
});