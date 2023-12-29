const fs = require('fs');
const path = require('path');
const util = require('util');
const dir = 'I:\\My Drive\\Website\\critterworld\\critters';

const traverse = function(dir, result = []) {
    
    // list files in directory and loop through
    fs.readdirSync(dir).forEach((file) => {
        
        // builds full path of file
        const fPath = path.resolve(dir, file);
        
        // prepare stats obj
        const fileStats = {path: fPath };

        const targetExtension = ".js";

        // is the file a directory ? 
        // if yes, traverse it also, if no just add it to the result
        if (fs.statSync(fPath).isDirectory()) {

            fileStats.type = 'dir';
            fileStats.files = [];
            result.push(fileStats);
            return traverse(fPath, fileStats.files)
        }

        result.push(fileStats);


    });
    return result;
};

console.log(util.inspect(traverse(dir), false, null));