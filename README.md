# websmith.js


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
