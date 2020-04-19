Feature('Test search box @searchbox');
const {I, openPage} = inject();
const rc = require('rc')('e2e', {});

Before(async () => {
  await openPage.openPageAndWaitTillLoaded(rc.host, 'circle radius in kilometers:');
});

Scenario('Test search box', async () => {
  // locate Poznan
  await I.searchLocation('Poznan');
  await I.waitForText('52.4082663', 10, '.test-weather');
  await I.see('16.9335199', '.test-weather');

  // locate Tokio
  await I.searchLocation('Tokio');
  await I.waitForText('35.6828387', 10, '.test-weather');
  await I.see('139.7594549', '.test-weather');

  // locate New York
  await I.searchLocation('New York');
  await I.waitForText('40.7127281', 10, '.test-weather');
  await I.see('-74.0060152', '.test-weather');
});

Scenario('Test clear button', async () => {
  // locate Warsaw
  await I.searchLocation('Warsaw');
  await I.waitForText('52.2319581', 10, '.test-weather');
  await I.see('21.0067249', '.test-weather');
  await I.seeElementInDOM('.leaflet-marker-icon');
  await I.click('.reset');
  await I.waitForDetached('.leaflet-marker-icon', 10);
});
