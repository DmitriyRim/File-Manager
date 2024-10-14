import { stdin, stdout, chdir, cwd } from 'node:process';
import { homedir, EOL } from 'node:os';
import { setUpperWorkDir, setWorkDirectory, showFolderContents } from './modules/navigation/index.js';
import { copyFile, createFile, readFile, renameFiles } from './modules/fileOperation/index.js';
import { existsSync } from 'node:fs';

const userName = getUserName();
const textWelcome = `Welcome to the File Manager, ${userName}!\n`;
const textExit = `Thank you for using File Manager, ${userName}, goodbye!`;
const pathToWorkingDirector = homedir();

chdir(pathToWorkingDirector);
stdout.write(`${textWelcome}${getCurrentPath()}`);
stdin.on('data', async (data) => {
    const cliArgs = data.toString().slice(0, -2).split(' ');

    switch (cliArgs[0]) {
        case 'up':
            setUpperWorkDir();
            break;
        case 'cd':
            setWorkDirectory(cliArgs[1])
            break;
        case 'ls': 
            showFolderContents()
            break;
        case 'cat': 
            readFile(cliArgs[1])
            break;
        case 'add':
            createFile(cliArgs[1])
            break;
        case 'rn':
            renameFiles(cliArgs[1], cliArgs[2])
            break;
        case 'cp':
            copyFile(cliArgs[1], cliArgs[2])
            break;
        case '.exit':
            stdin.pause();
            return;
        default:
            console.log('Invalid input')
            break;
    }
    stdout.write(getCurrentPath());
})

process.on('SIGINT', () => {
    stdin.pause();
})
stdin.on('pause', () => {
    console.log(textExit);
})


function getUserName () {
    const args = process.argv.slice(2).find(item => item.match(/^--username=/));
    return args.split('=')[1];
}

function getCurrentPath () {
    return `${EOL}You are currently in ${cwd()}${EOL}>`;
}