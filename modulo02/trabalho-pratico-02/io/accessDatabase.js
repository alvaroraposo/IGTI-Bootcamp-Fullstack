const { writeFile, readFile } = require('fs');

const accessDatabase = function(path) {
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

module.exports = accessDatabase;