const {I} = inject();

module.exports = {
  async openPageAndWaitTillLoaded(url, locator, timeout = 10) {
    await I.amOnPage(url);
    await I.waitForText(locator, timeout);
  },
};
