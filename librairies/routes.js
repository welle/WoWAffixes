function getRootUrl(req, res) {
  var affixesLib = require('./affixes');
  var moment = require('moment');

  var lang = req.session.lang;
  res.render('pages/index', { affixes: affixesLib.getAffixes(), moment: moment })
}

function get404Url(req, res) {
  var affixesLib = require('./affixes');
  var moment = require('moment');

  var lang = req.query.l;
  console.log("404");
  res.render('pages/index', { affixes: affixesLib.getAffixes(), moment: moment })
}

exports.getRoutes = function (req, res) {
  var lang = req.query.l;
  if (lang) {
    req.session.lang = lang;
  } else {
    if (!req.session.lang) {
      // Default is english
      req.session.lang = "en";
    }
  }

  var result;
  if (req.baseUrl === '') {
    result = getRootUrl(req, res);
  } else {
    // 404
    result = get404Url(req, res);
  }

  return result;
}