import { cwd } from 'node:process';
import { readdir } from 'node:fs/promises';

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
    showFolderContents
}