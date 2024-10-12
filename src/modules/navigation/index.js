import { chdir, cwd } from 'node:process';
import { sep, join } from 'node:path';

export function setUpperWorkDir () {
    const currentWorkDir = cwd().split(sep);
    const path = currentWorkDir.slice(0, currentWorkDir.length - 1);

    chdir(path.length === 1 ? join(...path, sep) : join(...path)); 
}