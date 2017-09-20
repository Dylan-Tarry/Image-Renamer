
class fileRenamer {

    constructor() {
        //this file path should be the folder with your pictures in
        this.filepath = './File-Path-here/';
        //requires for node modules
        this.fs = require('fs');
        this.path = require('path');
        this.crypto = require('crypto');
    }

    start() {
        this.fs.readdir(this.filepath, (err, data) => {

            if (err) {
                throw new Error(err);
                return; 
            }

            var aFileNames = [];

            for (let p = 0; p < data.length; p++) {

                let filename = data[p];

                let param1 = this.filepath + filename;
                let newFileName = this.crypto.createHash('md5').update(filename).digest("hex") + this.path.extname(this.filepath + filename);
                let param2 = this.filepath + newFileName;

                aFileNames.push(param2);

                this.hashedRename(param1, param2);
            }

            for (let p = 0; p < aFileNames.length; p++) {

                let filename = aFileNames[p];
                let param1 = filename;
                let param2 = this.filepath + '0' + p + this.path.extname(param1);

                this.rename(param1, param2);
            }

            process.exit(0);
        });
    }

    rename(param1, param2) {
        this.fs.renameSync(param1, param2);
    }

    hashedRename(param1, param2) {
        this.fs.renameSync(param1, param2);
    }
}

var oFile = new fileRenamer();
oFile.start();

