const { checkDirExists, createFolder } = require('./files');
const fs = require('fs');

/**
 * This method creates an initial "store" that will keep track
 * of migrations that have been executed. This store will be a simple file
 * in the .git folder
 */

const initializeStore = async () => {
    console.log('--init--');
    const gitFolderExists = checkDirExists('.git');

    if (!gitFolderExists) {
        await createFolder('.git');
    }

    // create json file
    const record = {
        executedMigrations: []
    }

    fs.writeFileSync('.git/record.json', JSON.stringify(record, null, 2));
}

/**
 * This method reads and returns the record file as a JSON object
 */
const getRecord = () => {
    const record = fs.readFileSync(`.git/record.json`, 'utf8');
    return typeof record === 'string' ? JSON.parse(record) : record;
}

const updateRecord = (updatedRecord) => {
    return fs.writeFileSync('.git/record.json', JSON.stringify(updatedRecord, null, 2));
}

/**
 * This method adds the name of a migration that has been executed
 */
const recordMigration = (migrationName) => {
    const record = getRecord();
    record.executedMigrations.push(migrationName);
    updateRecord(record);
}

/**
 * This method clears the record of executed migrations
 */

const clearMigrations = () => {
    const record = getRecord();
    record.executedMigrations = [];
    updateRecord(record);
}

/**
 * This method removes a migration record
 */

const deleteMigrationRecord = (migrationName) => {
    const record = getRecord();
    record.executedMigrations = record.executedMigrations.filter(migration => migration !== migrationName);
    updateRecord(record);

}

const getExecutedMigrations = () => {
    const record = getRecord();
    return record.executedMigrations;
}

module.exports = {
    initializeStore,
    recordMigration,
    clearMigrations,
    deleteMigrationRecord,
    getExecutedMigrations
}