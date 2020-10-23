const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const getCurrentDirectoryBase = () => {
    return path.basename(process.cwd());
}

const checkDirExists = (filePath) => {
    const exists = fs.existsSync(filePath);
    console.log(`${filePath}: ${exists}`);
    return fs.existsSync(filePath);
}

const createFolder = async (path) => {
    await mkdirp(path);
}

module.exports = {
    getCurrentDirectoryBase,
    checkDirExists,
    createFolder
}