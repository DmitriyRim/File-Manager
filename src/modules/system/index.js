import os from 'node:os';
import { getUserName } from '../../utils/index.js';

function getSystemInfo(flag){
    switch (flag) {
        case '--EOL':
            console.log(`Default system End-Of-Line - ${JSON.stringify(os.EOL)}`)
            break;
        case '--cpus':
            console.log(`Overall amount of CPUS: ${os.cpus().length}`);
            console.table(os.cpus(), ['model', 'speed']);
            break;
        case '--homedir':
            console.log(`Home directory: ${os.homedir()}`);
            break;
        case '--username':
            console.log(`System user name: ${os.userInfo().username}`);
            console.log(`File-manager user name: ${getUserName()}`)
            break;
        case '--architecture':
            console.log(`CPU architecture: ${os.arch()}`);
            break;
        default:
            console.log('Invalid input');
            break;
    }
}

export {
    getSystemInfo
}