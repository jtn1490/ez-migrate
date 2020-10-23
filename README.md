# EZ Migrate

This is a database-agnostic data migration orchestration CLI tool

## Installation

``` bash
$ npm i ez-generate
```

## Available Commands

ez-generate init

ez-generate run <migration_name>

ez-generate down <migration_name>

ez-generate reset-all

ez-generate run-latest 

ez-generate executed-migrations


## Cli interface

```
  Usage: ./node_modules/ez-migrate/index.js [options]

  Options:

    init                 Initializes migrations folder
    run [migration]      Runs migration [migration]
    down [migration]     Reverts migration [migration]
    reset-all            Reverts all executed migrations
    run-latest           Executes migrations that have not been run
    executed-migrations  List of executed migrations
```