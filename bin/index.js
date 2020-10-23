#!/usr/bin/env node
const path = require('path');
const chalk = require('chalk');
const clear = require('clear');
const fs = require('fs');
const figlet = require('figlet');
const { init } = require('../lib/init');
const { 
  recordMigration, 
  clearMigrations, 
  deleteMigrationRecord, 
  getExecutedMigrations 
} = require('../lib/store');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('EZ Migrate', { horizontalLayout: 'full' })
  )
);

const argv = require('minimist')(process.argv.slice(2));
const [ action, arg1, arg2 ] = argv._;
const dirBase = process.cwd();
let executedMigrations;

switch (action) {
    case 'init':
        init();
        break;
        
    case 'run':
      const { up } = require(`${dirBase}/migrations/${arg1}`);
      up();
      recordMigration(arg1);
      console.log(`===> Successfully ran migration ${arg1}`);
      break;

    case 'revert': 
      const { down } = require(`${dirBase}/migrations/${arg1}`);
      down();
      deleteMigrationRecord(arg1);
      console.log(`===> Successfully reverted migration ${arg1}`);
      break;

    case 'revert-all':
      fs.readdirSync(`${dirBase}/migrations`).forEach(file => {
        if (file !== 'migrations.config.json') {
          const { down } = require(`${dirBase}/migrations/${file}`);
          down();
          console.log(`===> Successfully reverted migration ${file}`);
        }
      });
      clearMigrations()
      break;

    case 'run-latest':
      executedMigrations = getExecutedMigrations();
      const allMigrations = fs.readdirSync(`${dirBase}/migrations`);
      const newMigrations = allMigrations
        .filter(migration => migration !== 'migrations.config.json')
        .filter(migration => !executedMigrations.includes(migration));

      newMigrations.forEach(migration => {
        const { up } = require(`${dirBase}/migrations/${migration}`);
        up();
        recordMigration(migration);
        console.log(`===> Successfully ran migration ${migration}`);
      });

      break;

    case 'executed-migrations':
      executedMigrations = getExecutedMigrations();
      console.log('===> Executed migrations:');
      executedMigrations.forEach(migration => {
        console.log('===> ', migration);
      });
    break;
      
}