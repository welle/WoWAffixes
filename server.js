const path = require('path');
const PORT = process.env.PORT || 5000;

var cookieSession = require('cookie-session'),
  express = require('express'),
  i18n = require("i18n-express"),
  favicon = require('serve-favicon'),
  Keygrip = require('keygrip'),
  faviconLib = require('./librairies/favicon'),
  routesLib = require('./librairies/routes');

var expiryDate = new Date(Date.now() + 365 * 60 * 60 * 1000); // 365 days
var randomFavicon = faviconLib.getFavicon();
var app = express()
  .set('trust proxy', 1)
  .use(cookieSession({
    name: 'session',
    keys: new Keygrip(['key1', 'key2'], 'SHA384', 'base64'),
    cookie: {
      secure: true,
      httpOnly: true,
      expires: expiryDate
    }
  }))
  .use(i18n({
    translationsPath: path.join(__dirname, 'locales'), // <--- use here. Specify translations files path.
    siteLangs: ["en", "fr"],
    textsVarName: 'translation'
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(favicon(path.join(__dirname, 'public', 'images/affixes/' + randomFavicon)))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => routesLib.getRoutes(req, res, i18n));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));