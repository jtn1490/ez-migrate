# EZ Migrate

THIS PACKAGE IS STILL IN DEVELOPMENT SO USE AT YOUR OWN RISK!

This is a database-agnostic data migration orchestration CLI tool.

## Installation

``` bash
$ npm i ez-generate
```

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