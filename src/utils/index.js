import { EOL } from 'node:os';
import { cwd, argv } from 'node:process';

function getUserName () {
    const args = argv.slice(2).find(item => item.match(/^--username=/));
    return args.split('=')[1];
}

function getCurrentPath () {
    return `${EOL}You are currently in ${cwd()}${EOL}>`;
}

export {
    getUserName,
    getCurrentPath
}