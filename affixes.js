function Affix(affixDate, affixValues, affixWeekTitle) {
    this.affixDate = affixDate;
    this.affixValues = affixValues;
    this.affixWeekTitle = affixWeekTitle;
}

var affixesTurn = [
    [6, 4, 9],
    [7, 2, 10],
    [5, 3, 9],
    [8, 12, 10],
    [7, 13, 9],
    [11, 14, 10],
    [6, 3, 9],
    [5, 13, 10],
    [7, 12, 9],
    [8, 4, 10],
    [11, 2, 9],
    [5, 14, 10],
];

var affixWeekTitleTurn = [
    'Current Week',
    'Next Week',
    '+2 Week',
    '+3 Week',
    '+4 Week',
    '+5 Week'
];

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

exports.getAffixes = function () {
    var currentDate = new Date();
    var result = getWeekNumber(currentDate);

    var functionResult = [];
    for (i = 0; i < 6; i++) {
        var affixDate = new Date(currentDate);
        affixDate.setDate(affixDate.getDate() + (i * 7));
        var affix = new Affix(affixDate, affixesTurn[(result + i) % (affixesTurn.length)], affixWeekTitleTurn[i]);
        functionResult.push(affix);
    }

    return functionResult;
};