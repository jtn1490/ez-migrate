const fs = require('fs');
const { createFolder } = require('./files');
/**
 * This method initializes a configuration file that allows users 
 * to configure where their migration files will be stored relative to the root directory.
 * This method will also reset the "store" that contains a record of migrations that have been run.
 */

const { initializeStore } = require('./store');

const init = async () => {
   createConfig();
   initializeStore();
}

const createConfig = async () => {
    const config = {
        migrationsFolderLocation: '/migrations'
    };
    await createFolder('migrations');
    fs.appendFileSync(`migrations/migrations.config.json`, JSON.stringify(config, null, 2));
    console.log('===> Migration settings successfully initialized')
}

module.exports = {
    init
}