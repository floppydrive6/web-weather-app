# Web Weather App Automation

E2E tests for Web Weather App

## Installation & Usage

### Running locally

Select (or install) proper node: `nvm use`

Install all dependencies: `npm i`

Run all tests: `./node_modules/.bin/codeceptjs run --steps`

Run selected test: `./node_modules/.bin/codeceptjs run --steps --grep '@test_tag'`

#### Running tests using npm scripts:

- run all tests:
`npm run test`

- run selected test only:
`npm run test -- --grep '@test_tag'`

### Running tests using docker

CodeceptJS [help](https://codecept.io/docker.html)

Clone repository and run:

`docker pull codeception/codeceptjs`

Run in the main repository directory:

`docker run --net=host -v $PWD:/tests codeception/codeceptjs codeceptjs run --grep "@test_tag"`

### Configuration file

`.e2erc`

### Tests results

See [here](https://codecept.io/plugins/#allure) how to use allure reporter

Run: `allure serve output` to see tests results

CodeceptJS possible commands are [here](https://codecept.io/commands/)
