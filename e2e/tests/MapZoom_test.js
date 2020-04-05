Feature('Test map zoom @mapzoom');
const {I, openPage} = inject();
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

Scenario('Test map zoom', async () => {
  const WAIT_INTERVAL = 2;
  // locate Warsaw
  await locateByName('Warsaw');
  await I.waitForText('52.2319581', 10, '.test-weather');
  await I.see('21.0067249', '.test-weather');
  await I.seeElementInDOM('.leaflet-marker-icon');

  const images = ['zoomBefore.png', 'zoomAfter.png'];
  const [zoomBefore, zoomAfter] = images;

  // delete on init
  for (let scrn of images) {
    if (fs.existsSync(`${rc.outputdir}/${scrn}`)) {
      fs.unlinkSync(`${rc.outputdir}/${scrn}`);
    }
  }

  for (let i = 0; i < 2; i++) {
    await I.click(locate('a').withAttr({'title': 'Zoom in'}));
    await I.wait(WAIT_INTERVAL);
  }
  await I.saveScreenshot(zoomBefore);

  for (let i = 0; i < 3; i++) {
    await I.click(locate('a').withAttr({'title': 'Zoom out'}));
    await I.wait(WAIT_INTERVAL);
  }
  await I.saveScreenshot(zoomAfter);

  // compare results
  const looksSameAsyncLocation = new Promise((resolve, reject) => {
    looksSame(`${rc.outputdir}/${zoomBefore}`, `${rc.outputdir}/${zoomAfter}`, (error, {equal}) => {
      if (equal) reject(new Error('Map still looks the same after zoom'));
      resolve('Passed')
    });
  });
  await looksSameAsyncLocation;

});
