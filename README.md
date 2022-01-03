# websmith.js

A minimalistic static website generator based on Node.js.

- **Website:** https://mbruno46.github.io/websmith.js/
- **Source code:** https://github.com/mbruno46/websmith.js/
- **Bug reports:** https://github.com/mbruno46/websmith.js/issues

### Authors

Copyright (C) 2021, Mattia Bruno

## Documentation

The documentation can be found [here](https://mbruno46.github.io/websmith.js/). 
Several themes, taken from the [Bootswatch project](https://bootswatch.com), are supported. 

### Local usage

It requires [Node.js](https://nodejs.org/en/) (and npm) to be installed in the system 
and it creates a static website from a single JSON input file (see documentation).

### Github action

It can be used as a GitHub action, for example

```yml
name: Build Doc

on: [push]

jobs:
  deploy:

    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Install Node.js, npm
        uses: actions/setup-node@v1
        with:
          node-version: 11

      - name: Deploy website
        uses: mbruno46/websmith.js@main
        with:
          config: './website/config.json'
          build: './website/build'
```
