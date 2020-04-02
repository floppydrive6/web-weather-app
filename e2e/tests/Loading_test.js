Feature('Test loading app');
const rc = require('rc')('e2e', {});
const {I} = inject();

Scenario('Test app rendering @apprender', async () => {
  await I.amOnPage(rc.host);
  await I.waitForText('circle radius in kilometers:');
  await I.seeElement({css: 'div.navRight'})
});
