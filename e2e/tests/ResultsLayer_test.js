Feature('Test results layer switch @resultslayer');
const {I, openPage} = inject();
const fs = require('fs');
const looksSame = require('looks-same');
const rc = require('rc')('e2e', {});

Before(async () => {
  await openPage.openPageAndWaitTillLoaded(rc.host, 'circle radius in kilometers:');
});

Scenario('Test switching layer', async () => {
  // locate Warsaw
  await I.searchLocation('Warsaw');
  await I.waitForText('52.2319581', 10, '.test-weather');
  await I.see('21.0067249', '.test-weather');
  await I.seeElementInDOM('.leaflet-marker-icon');

  const images = ['pm25.png', 'pm10.png'];
  const [pm25Image, pm10Image] = images;

  // delete on init
  for (let scrn of images) {
    if (fs.existsSync(`${rc.outputdir}/${scrn}`)) {
      fs.unlinkSync(`${rc.outputdir}/${scrn}`);
    }
  }

  await I.click(locate('label').withText('PM 2.5'));
  await I.wait(2);
  await I.saveScreenshot(pm25Image);
  await I.click(locate('label').withText('PM 10'));
  await I.wait(2);
  await I.saveScreenshot(pm10Image);

  // compare results
  const looksSameAsyncLocation = new Promise((resolve, reject) => {
    looksSame(`${rc.outputdir}/${pm25Image}`, `${rc.outputdir}/${pm10Image}`, (error, {equal}) => {
      if (equal) reject(new Error('Map still looks the same after switching layer'));
      resolve('Passed')
    });
  });
  await looksSameAsyncLocation;

});
