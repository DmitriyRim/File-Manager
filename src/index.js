import { stdin, stdout, chdir } from 'node:process';
import { homedir } from 'node:os';
import { getUserName, getCurrentPath } from './utils/index.js';
import { switchComand } from './modules/switchСliСommands/index.js';

const userName = getUserName();
const textWelcome = `Welcome to the File Manager, ${userName}!\n`;
const textExit = `Thank you for using File Manager, ${userName}, goodbye!`;
const pathToWorkingDirector = homedir();

chdir(pathToWorkingDirector);
stdout.write(`${textWelcome}${getCurrentPath()}`);
stdin.on('data', (data) => {
    const cliArgs = data.toString().slice(0, -2).split(' ');

    switchComand(cliArgs);
    stdout.write(getCurrentPath());
})

process.on('SIGINT', () => {
    stdin.pause();
})
stdin.on('pause', () => {
    console.log(textExit);
})