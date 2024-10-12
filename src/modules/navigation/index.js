import { chdir, cwd } from 'node:process';
import { sep, join, isAbsolute, normalize } from 'node:path';

function setUpperWorkDir () {
    const currentWorkDir = cwd().split(sep);
    const path = currentWorkDir.slice(0, currentWorkDir.length - 1);

    chdir(path.length === 1 ? join(...path, sep) : join(...path)); 
}

function setWorkDirectory (path) {
    try {
        if (isAbsolute(path)){
            chdir(normalize(path).startsWith(sep) ? join(cwd(), path) : path);
        } else {
            chdir(path);
        }
    } catch {
        console.log('Operation failed');
    }
}

export {
    setUpperWorkDir,
    setWorkDirectory
}