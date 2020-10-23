# EZ Migrate

THIS PACKAGE IS STILL IN DEVELOPMENT SO USE AT YOUR OWN RISK!

This is a database-agnostic data migration orchestration CLI tool.

## Installation

``` bash
$ npm install -g ez-migrate
```

## Cli interface

```
  Usage: ez-migrate [options]

  Options:

    init                 Initializes migrations folder
    run [migration]      Runs migration [migration]
    down [migration]     Reverts migration [migration]
    reset-all            Reverts all executed migrations
    run-latest           Executes migrations that have not been run
    executed-migrations  List of executed migrations

SAMPLE MIGRATION FILE:

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/test';

module.exports = {
    async up() {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        if (!client) return;

        const db = client.db('test');
        await db.collection('cars').insertOne({
            make: "audi",
            model: "R8"
        });
    },

    async down() {
        const client = await MongoClient.connect(url, { useNewUrlParser: true });
        if (!client) return;

        const db = client.db('test');
        await db.collection('cars').remove();
    }
}
```