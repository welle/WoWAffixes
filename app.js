const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000;

var affixes = require('./affixes');
var moment = require('moment');
var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { affixes: affixes.getAffixes(), moment: moment }));


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))