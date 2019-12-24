# my-book-shelve

1. Install node v11.12.0 or higher.
2. Install yarn 1.15.2 or higher
3. From inside repo run yarn install, to bring in all node packages

4. install json-server and concurrently globlly
   npm install -g json-server  
   npm install -g concurrently

packages.json commands

1. Starting the build:
   concurrently "yarn start-db" "yarn start-web"

2. Compiling source code:
   yarn compile

3. Running tests:
   yarn test or yarn test-with-coverage

4. Precommit hooks
   "pre-commit": [],
