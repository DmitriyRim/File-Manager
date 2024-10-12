import { stdin, stdout, chdir, cwd } from 'node:process';
import { homedir, EOL } from 'node:os';
import { setUpperWorkDir } from './modules/navigation/index.js';

// Метод process.chdir() изменяет текущий рабочий каталог процесса Node.js или выдает исключение, 
// если выполнить это не удается (например, если указанный directory не существует).
// Метод process.cwd() возвращает текущий рабочий каталог процесса Node.js .

const userName = getUserName();
const textWelcome = `Welcome to the File Manager, ${userName}!\n`;
const textExit = `Thank you for using File Manager, ${userName}, goodbye!`;
const pathToWorkingDirector = homedir();

chdir(pathToWorkingDirector);
stdout.write(`${textWelcome}${getCurrentPath()}`);
stdin.on('data', (data) => {
    const cliArgs = data.toString().slice(0, -2).split(' ');

    switch (cliArgs[0]) {
        case 'up':
            setUpperWorkDir();
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