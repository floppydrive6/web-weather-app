Feature('Test circle radius change @circleradius');
const {I, openPage} = inject();
const assert = require('assert');
const fs = require('fs');
const looksSame = require('looks-same');
const rc = require('rc')('e2e', {});

const locateByName = async name => {
  const searchBox = locate('input').withAttr({placeholder: 'Enter address'});
  await I.fillField(searchBox, name);
  await I.waitForElement('.results.active', 10);
  await I.click(locate('div').inside(locate('.results.active')).first());
};


Before(async () => {
  await openPage.openPageAndWaitTillLoaded(rc.host, 'circle radius in kilometers:');
});

Scenario('Test circle radius button', async () => {
  const WAIT_INTERVAL = 2;
  // locate Warsaw
  await locateByName('Warsaw');
  await I.waitForText('52.2319581', 10, '.test-weather');
  await I.see('21.0067249', '.test-weather');
  await I.seeElementInDOM('.leaflet-marker-icon');

  const images = ['circleBefore.png', 'circleAfter.png'];
  const [circleBefore, circleAfter] = images;

  // delete on init
  for (let scrn of images) {
    if (fs.existsSync(`${rc.outputdir}/${scrn}`)) {
      fs.unlinkSync(`${rc.outputdir}/${scrn}`);
    }
  }

  const inputCircle = locate('input').inside('.input-group').as('circle value');
  const initInputValue = await I.grabValueFrom(inputCircle);

  for (let i = 0; i < 5; i++) {
    await I.click(locate('button').withText('+').inside('.input-group').as('circle bigger'));
    await I.wait(WAIT_INTERVAL);
  }
  await I.saveScreenshot(circleBefore);
  const valueAfterIncrease = await I.grabValueFrom(inputCircle);

  if (initInputValue === valueAfterIncrease) assert.fail('Circle value not changed after increase');

  for (let i = 0; i < 2; i++) {
    await I.click(locate('button').withText('-').inside('.input-group').as('circle smaller'));
    await I.wait(WAIT_INTERVAL);
  }
  await I.saveScreenshot(circleAfter);
  const valueAfterDecrease = await I.grabValueFrom(inputCircle);
  if (valueAfterIncrease === valueAfterDecrease) assert.fail('Circle value not changed after decrease');

  // compare visual results
  const looksSameAsyncLocation = new Promise((resolve, reject) => {
    looksSame(`${rc.outputdir}/${circleBefore}`, `${rc.outputdir}/${circleAfter}`, (error, {equal}) => {
      if (equal) reject(new Error('Map still looks the same after changing radius size'));
      resolve('Passed')
    });
  });
  await looksSameAsyncLocation;

});

Scenario('Test circle radius button', async () => {
  // locate Warsaw
  await locateByName('Warsaw');
  await I.waitForText('52.2319581', 10, '.test-weather');
  await I.see('21.0067249', '.test-weather');
  await I.seeElementInDOM('.leaflet-marker-icon');

  const inputCircle = locate('input').inside('.input-group').as('circle value');
  const initInputValue = await I.grabValueFrom(inputCircle);
  await I.fillField(inputCircle, '100');
  const circleAfterFill = await I.grabValueFrom(inputCircle);
  if (initInputValue === circleAfterFill) assert.fail('Circle value not changed after fill up');
});
