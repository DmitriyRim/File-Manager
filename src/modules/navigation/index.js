import { chdir, cwd } from 'node:process';
import { sep, join, isAbsolute, normalize } from 'node:path';
import { readdir } from 'node:fs/promises';

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

async function showFolderContents() {
    const currentWorkDir = cwd();
    const listFiles = await readdir(currentWorkDir, { withFileTypes: true });
    const files = [];
    const directories = [];
    const symbolicLinks = [];
    
    listFiles.forEach((item) => {
        if (item.isSymbolicLink()) symbolicLinks.push({name: item.name, type: 'Symbolic link'});
        if (item.isDirectory()) directories.push({name: item.name, type: 'directory'});
        if (item.isFile()) files.push({name: item.name, type: 'file'});
    });
    
    console.log('')
    console.table([
        ...directories.sort(),
        ...files.sort(),
        ...symbolicLinks.sort()
    ]);
}

export {
    setUpperWorkDir,
    setWorkDirectory,
    showFolderContents
}