import { writeFile, readFile } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function createRepository (name) {
    const path = resolve(__dirname, `../../data/${name}.json`);

    return {
        read: () => new Promise((resolve, reject) => {
            readFile(path, (error, data) => {
                if(error) {
                    reject(error);
                    return;
                }

                resolve(JSON.parse(data));
            })
        }),
        write: (data) => new Promise((resolve, reject) => {
            writeFile(path, JSON.stringify(data), (error) => {
                if(error) {
                    reject(error);
                    return;
                }

                resolve();
            });            
        })
    }
}

export default createRepository;