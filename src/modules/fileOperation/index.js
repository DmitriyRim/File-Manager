import { existsSync, createReadStream } from 'node:fs';
import { stdout } from 'node:process';

async function readFile(path) {
    try {
        if (!existsSync(path)){
            throw Error('Operation failed')
        }
    
        const readStream = createReadStream(path, { encoding: 'utf8'});
        readStream.pipe(stdout);
    } catch(err) {
        console.log(err.message)
    }
}

export {
    readFile
}