const { generateApiKey } = require('generate-api-key');
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const filename = ".env";
let status = false;
let noKey = true;

fs.readFile(filename, 'utf8', function(err, data)
{
    if (err) throw err;
    let lines = data.split('\n').map((line) => {
        if(line.includes('API_SECRET') && line.split('=')[1] === ''){
            noKey = false;
            return `API_SECRET=${generateApiKey()}`;
        }
        else if(line.includes('API_SECRET') && line.split('=')[1] !== '') {
            noKey = false;
            status = true;
            return `API_SECRET=${generateApiKey()}`;
        }
        else 
            return line;
             
    }).join('\n');

    if(noKey) {
        lines += `\nAPI_SECRET=${generateApiKey()}`;
        fs.writeFile(filename, lines, (err) => {
            if (err) throw err;
            console.log('SUCCESS. API_SECRET GENERATED.')
            process.exit();
        });
    }
    else if(status) {
        rl.question(`API_SECRET EXISTS.\nDo your want to re generete ? [y/t] `, (ans) => {
            if(ans === 'y'){
                fs.writeFile(filename, lines, (err) => {
                    if (err) throw err;
                    console.log('SUCCESS. API_SECRET GENERATED.')
                    process.exit();
                });
            }
            else {
                console.log('API_SECRET NOT CHANGED');
                process.exit()   
            }
        })
    }
    else {
        fs.writeFile(filename, lines, (err) => {
            if (err) throw err;
            console.log('SUCCESS. API_SECRET GENERATED.')
            process.exit();
        });
    }
    
});