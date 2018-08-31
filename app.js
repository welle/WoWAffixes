const path = require('path');
const PORT = process.env.PORT || 5000;

var express = require('express');
var favicon = require('serve-favicon');

var affixesLib = require('./librairies/affixes');
var faviconLib = require('./librairies/favicon');
var moment = require('moment');

var randomFavicon = faviconLib.getFavicon();
var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(favicon(path.join(__dirname, 'public', 'images/affixes/' + randomFavicon)))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { affixes: affixesLib.getAffixes(), moment: moment }));


app.listen(PORT, () => console.log(`Listening on ${PORT}`))