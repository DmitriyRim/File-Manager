import { existsSync, createReadStream } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd, stdout } from 'node:process';

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

async function createFile(fileName){
    const currentPath = cwd();
    try {
        await writeFile(join(currentPath, fileName.trim()), '');
    } catch (error) {
        console.log('Operation failed');
    }
}

export {
    readFile,
    createFile
}