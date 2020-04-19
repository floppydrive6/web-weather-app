const {Helper} = codeceptjs;
const recorder = require('codeceptjs').recorder;

class CustomHelper extends Helper {


  async flushRetries() {
    await new Promise(r => setTimeout(r, 100));
    while (recorder.retries.length) recorder.retries.pop();
  }

  async searchLocation(location) {
    const searchBox = locate('input').withAttr({placeholder: 'Enter address'});
    await this.helpers['Puppeteer'].fillField(searchBox, location);
    await this.helpers['Puppeteer'].waitForElement('.results.active', 10);
    await this.helpers['Puppeteer'].click(locate('div').inside(locate('.results.active')).first());
  }

}

module.exports = CustomHelper;
