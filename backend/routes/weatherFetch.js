const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const rc = require('rc')('darkskykey', {});
const DARK_SKY_KEY = rc.darkSkyKey;

router.get('/', (req, res, next) => {
  const lat = req.query.lat || 0;
  const lng = req.query.lng || 0;
  console.log(`fetching weather for: ${lat}, ${lng}`);
  fetch(`https://api.darksky.net/forecast/${DARK_SKY_KEY}/${lat},${lng}?exclude=minutely,hourly,daily,alerts,flags&units=si`)
    .then(res => res.json())
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log(err);
      res.send({error: 'cannot fetch data'});
    });
});

module.exports = router;
