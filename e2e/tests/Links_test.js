Feature('Test links on page @linkstest');
const {I, openPage} = inject();
const rc = require('rc')('e2e', {});

Before(async () => {
  await openPage.openPageAndWaitTillLoaded(rc.host, 'circle radius in kilometers:');
});

Scenario('Test Leaflet link', async () => {
  const leafletLink = locate('a').withText('Leaflet');
  await I.waitForElement(leafletLink, 10);
  await I.click(leafletLink);
  await I.seeCurrentUrlEquals('https://leafletjs.com/');
});

Scenario('Test OpenStreetMap link', async () => {
  const leafletLink = locate('a').withText('OpenStreetMap');
  await I.waitForElement(leafletLink, 10);
  await I.click(leafletLink);
  await I.seeCurrentUrlEquals('https://www.openstreetmap.org/copyright');
});

Scenario('Test WAQI link', async () => {
  const leafletLink = locate('a').withText('waqi.info');
  await I.waitForElement(leafletLink, 10);
  await I.click(leafletLink);
  await I.seeCurrentUrlEquals('http://waqi.info/');
});

Scenario('Test WAQI link', async () => {
  const leafletLink = locate('a').withText('Powered by Dark Sky');
  await I.waitForElement(leafletLink, 10);
  await I.click(leafletLink);
  await I.seeCurrentUrlEquals('https://darksky.net/dev');
});
