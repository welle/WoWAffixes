var expect = require('chai').expect;
var getWeekNumber = require('../librairies/affixes.js');

describe('getWeekNumber()', function () {
  it('should get week number', function () {
    
    var date = new Date(Date.UTC(2018, 10, 22)); 
    var weekNumber = getWeekNumber(date);

    expect(date).to.be.equal(43);

  });
});