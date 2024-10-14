import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream, existsSync } from 'node:fs';
import { join, parse } from 'node:path';

const compress = async (pathToFile, pathToDestination) => {

    console.log(pathToFile, pathToDestination)
    try {
        if (!existsSync(pathToFile) || !existsSync(pathToDestination)){
            throw Error('Operation failed');
        }
        const fileName = parse(pathToFile).base;

        await pipeline(
            createReadStream(pathToFile),
            createBrotliCompress(),
            createWriteStream(join(pathToDestination, `${fileName}.gz`)),
        )
    } catch {
        console.log('Operation failed');
    }
};

const decompress = async (pathToFile, pathToDestination) => {
    try {
        if (!existsSync(pathToFile) || !existsSync(pathToDestination)){
            throw Error('Operation failed');
        }

        const fileName = parse(pathToFile).base.slice( 0, -3);
        await pipeline(
            createReadStream(pathToFile),
            createBrotliDecompress(),
            createWriteStream(join(pathToDestination, fileName)),
        )
    } catch {
        console.log('Operation failed');
    }
};

export {
    compress,
    decompress
}