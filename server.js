const path = require('path');
const PORT = process.env.PORT || 5000;

var cookieSession = require('cookie-session');
var express = require('express');
var favicon = require('serve-favicon');

var faviconLib = require('./librairies/favicon');
var routesLib = require('./librairies/routes');

var expiryDate = new Date(Date.now() + 365 * 60 * 60 * 1000); // 365 days
var randomFavicon = faviconLib.getFavicon();
var app = express()
  .set('trust proxy', 1)
  .use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      expires: expiryDate
    }
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(favicon(path.join(__dirname, 'public', 'images/affixes/' + randomFavicon)))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => routesLib.getRoutes(req, res));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));