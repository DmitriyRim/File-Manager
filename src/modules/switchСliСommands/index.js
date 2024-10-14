import { stdin } from 'node:process';
import { setUpperWorkDir, setWorkDirectory } from '../switchDirectories/index.js';
import { copyFile, createFile, deleteFile, moveFile, readFile, renameFiles } from '../fileOperation/index.js';
import { getSystemInfo } from '../system/index.js';
import { calculateHash } from '../hash/index.js';
import { compress, decompress } from '../zip/index.js';
import { showFolderContents } from '../ls/index.js';

async function switchComand(cliArgs){
    switch (cliArgs[0]) {
        case 'up':
            setUpperWorkDir();
            break;
        case 'cd':
            setWorkDirectory(cliArgs[1]);
            break;
        case 'ls': 
            showFolderContents();
            break;
        case 'cat': 
            readFile(cliArgs[1]);
            break;
        case 'add':
            createFile(cliArgs[1]);
            break;
        case 'rn':
            renameFiles(cliArgs[1], cliArgs[2]);
            break;
        case 'cp':
            copyFile(cliArgs[1], cliArgs[2]);
            break;
        case 'mv':
            moveFile(cliArgs[1], cliArgs[2]);
            break;
        case 'rm':
            deleteFile(cliArgs[1]);
            break;
        case 'os':
            getSystemInfo(cliArgs[1]);
            break;
        case 'hash':
            calculateHash(cliArgs[1]);
            break;
        case 'compress':
            compress(cliArgs[1], cliArgs[2]);
            break;
        case 'decompress':
            decompress(cliArgs[1], cliArgs[2]);
            break;
        case '.exit':
            stdin.pause();
            return;
        default:
            console.log('Invalid input');
            break;
    }
}

export {
    switchComand
}