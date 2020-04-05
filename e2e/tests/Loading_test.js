Feature('Test loading app @apprender');
const {I, openPage} = inject();
const rc = require('rc')('e2e', {});

Before(async () => {
  await openPage.openPageAndWaitTillLoaded(rc.host, 'circle radius in kilometers:');
});

Scenario('Test app rendering', async () => {
  await I.seeInTitle('AirCheck');
  await I.seeElement({css: 'div.navRight'})
});

Scenario('Test geo data display', async () => {
  await I.waitForText('geo data', 10);
  await I.see('latitude');
  await I.see('longitude');
});

Scenario('Test weather data display', async () => {
  await I.waitForText('weather', 10);
  await I.see('temperature');
  await I.see('apparent temperature');
  await I.see('pressure');
  await I.see('humidity');
  await I.see('cloud cover');
  await I.see('wind speed');
  await I.see('wind gust');
});

Scenario('Test summary data display', async () => {
  await I.waitForText('summary', 10);
  const summaryDl = locate('dl').withChild(locate('dt').withText('summary'));
  const icon = locate('canvas').inside(summaryDl);
  await I.seeElement(icon);
});
