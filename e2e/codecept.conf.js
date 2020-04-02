const {setHeadlessWhen} = require('@codeceptjs/configure');
const rc = require('rc')('e2e', {});

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: 'tests/**/*_test.js',
  output: rc.outputdir,
  helpers: {
    Puppeteer: {
      url: rc.host,
      show: false,
      windowSize: '1200x900',
      "chrome": {
        "args": ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", '--window-size=1200,900']
      },
    }
  },
  include: {
    I: './steps_file.js',
    openPage: './fragments/OpenPage.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'e2e',
  plugins: {
    retryFailedStep: {
      enabled: false
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true
    },
  }
};
