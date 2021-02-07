# my-book-shelve

1. Install **node v11.12.0** or higher.
2. Install **yarn 1.15.2** or higher
3. From inside repo run `yarn install`, to bring in all node packages

4. install json-server and concurrently globlly
    - my-book-shelve> `npm install -g json-server`
    - my-book-shelve> `npm install -g concurrently`

packages.json commands

1. Starting the build:

    - my-book-shelve> `concurrently "yarn start-db" "yarn start-web"`

2. Compiling source code:

    - my-book-shelve> `yarn compile`

3. Running tests:

    - my-book-shelve>`yarn test or yarn test-with-coverage`

4. Code formatting

    - my-book-shelve>`yarn lint`

5. Precommit hooks
   "pre-commit": [],
    - eg.
      "pre-commit": [
      "compile",
      "lint",
      "test"
      ]
