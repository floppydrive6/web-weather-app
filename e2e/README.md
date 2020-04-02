# Web Weather App Automation

E2E tests for Web Weather App

## Installation & Usage

### Running locally

`nvm use`

`npm i`

`./node_modules/.bin/codeceptjs run --steps --grep '@test_tag'`

### Running with docker

CodeceptJS [help](https://codecept.io/docker.html)

Clone repository and run:

`docker pull codeception/codeceptjs`

Run in the main repository directory:

`docker run --net=host -v $PWD:/tests codeception/codeceptjs codeceptjs run --grep "@test_tag"`

### Configuration file

`.e2erc`

CodeceptJS possible commands are [here](https://codecept.io/commands/)
