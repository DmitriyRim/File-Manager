import { createReadStream, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const calculateHash = async (pathToFile) => {
    try {
        if(!existsSync(pathToFile)){
            throw Error('Operation failed');
        }

        const hash = createHash('sha256');
        const input = createReadStream(pathToFile);
    
        input.on('readable', () => {
            const data = input.read();
            if(data){
                hash.update(data);
            } else {
                console.log(`${hash.digest('hex')}`);
            }
        })
    } catch  {
        console.log('Operation failed');
    }
};

export {
    calculateHash
}