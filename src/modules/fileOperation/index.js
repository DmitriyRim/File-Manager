import { existsSync, createReadStream, createWriteStream } from 'node:fs';
import { rename, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { cwd, stdout } from 'node:process';

async function readFile(path) {
    try {
        if (!existsSync(path)){
            throw Error('Operation failed')
        }
    
        const readStream = createReadStream(path, { encoding: 'utf8'});
        readStream.pipe(stdout);
    } catch(error) {
        console.log(error.message)
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

async function renameFiles(pathToFile, newFileName){
    try {
        await rename(pathToFile, join(parse(pathToFile).dir, newFileName));
    } catch {
        console.log('Operation failed');
    }
}

async function copyFile(pathToFile, pathToNewDirectory){
    try {
        if (!existsSync(pathToFile) && !existsSync(pathToNewDirectory)){
            throw Error('Operation failed')
        }

        const fileName = parse(pathToFile).base;
        const input = new createReadStream(pathToFile, {encoding: 'utf-8'});
        const output = new createWriteStream(join(pathToNewDirectory, fileName));
    
        await input.pipe(output);
    } catch (error) {
        console.log(error.message)
    }
}

export {
    readFile,
    createFile,
    renameFiles,
    copyFile
}