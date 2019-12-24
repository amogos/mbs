# my-book-shelve
install node v11.12.0 or higher
install yarn 1.15.2 or higher
from repo run yarn install, this will bring all node packages

install json-server and concurrently globlly
npm install -g json-server  
npm install -g concurrently


packages.json commands

Starting the build:
concurrently "yarn start-db" "yarn start-web"

Compiling source code:
yarn compile

Running tests:
yarn test or yarn test-with-coverage

for precommit hooks check the entry  "pre-commit": [],

