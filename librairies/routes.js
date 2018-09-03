function getRootUrl(req, res) {
  var affixesLib = require('./affixes');
  var moment = require('moment');

  var currentAffixes = affixesLib.getAffixes();
  res.render('pages/index', { affixes: currentAffixes, affixesInfos: affixesLib.getAllAffixes(), moment: moment })
}

function get404Url(req, res) {
  var affixesLib = require('./affixes');
  var moment = require('moment');

  res.render('pages/index', { affixes: affixesLib.getAffixes(), moment: moment })
}

exports.getRoutes = function (req, res, i18n) {
  var result;
  if (req.baseUrl === '') {
    result = getRootUrl(req, res);
  } else {
    // 404
    result = get404Url(req, res);
  }

  return result;
}