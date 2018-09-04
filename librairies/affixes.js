
function Affixes(affixDate, affixValues, affixWeekTitle) {
    this.affixDate = affixDate;
    this.affixValues = affixValues;
    this.affixWeekTitle = affixWeekTitle;
}

function Affix(level2, level4, level7, level10) {
    this.level2 = level2;
    this.level4 = level4;
    this.level7 = level7;
    this.level10 = level10;
}

var affixesTurnLevel2 = [
    9, // Tyrannical
    10 // Fortified
];

var affixesTurnLevel4 = [
    7, // Bolstering
    6, // Raging
    8, // Sanguine
    5, // Teeming
    11 // Bursting
];

var affixesTurnLevel7 = [
    //1, // Overflowing
    4, // Necrotic
    2, // Skittish
    3, // Volcanic
    13, // Explosive
    14, // Quaking
    12 // Grievous
];

var affixesTurnLevel10 = [
    //15, // Relentless
    16 // Infested
];

var affixWeekTitleTurn = [
    'CURRENT_WEEK',
    'NEXT_WEEK',
    'PLUS_2_WEEK',
    'PLUS_3_WEEK',
    'PLUS_4_WEEK',
    'PLUS_5_WEEK'
];

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // TODO: adapt with start of rotation!
    return weekNo;
}

function getClosestWednesday() {
    var date = new Date();
    date.setDate(date.getDate());
    var day = date.getDay();
    var closestWednesday;
    if (day == 3) {
        closestWednesday = new Date().setDate(date.getDate());
    }
    else {
        if (day > 3) {
            closestWednesday = new Date().setDate(date.getDate() - (day - 3));
        } else {
            closestWednesday = new Date().setDate(date.getDate() - day - 4);
        }
    }

    return new Date(closestWednesday);
}

function getAffixByWeek(weekNumber) {
    weekNumber = weekNumber % 12;

    var rotationAffixes = require("../data/rotation.json");
    var weekRotation = rotationAffixes[weekNumber];
    var affixLevel2 = weekRotation.affix1;
    var affixLevel4 = weekRotation.affix2;
    var affixLevel7 = weekRotation.affix3;
    var affixLevel10 = affixesTurnLevel10[0];

    return new Affix(affixLevel2, affixLevel4, affixLevel7, affixLevel10);
}

exports.getAffixes = function () {
    var closestWednesday = getClosestWednesday();
    var result = getWeekNumber(closestWednesday);

    var functionResult = [];
    for (i = 0; i < 6; i++) {
        var affixDate = new Date(closestWednesday);
        affixDate.setDate(affixDate.getDate() + (i * 7));
        var currentAffixes = getAffixByWeek((result + i));
        var affix = new Affixes(affixDate, currentAffixes, affixWeekTitleTurn[i]);
        functionResult.push(affix);
    }

    return functionResult;
};

exports.getAllAffixes = function () {
    var allAffixes = require("../data/affixes.json");

    return allAffixes;
}
