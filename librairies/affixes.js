
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
    15, // Relentless
    16 // Infested
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
    //d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
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
    var roundLevel2 = weekNumber % (affixesTurnLevel2.length);
    var roundLevel4 = weekNumber % (affixesTurnLevel4.length);
    var roundLevel7 = weekNumber % (affixesTurnLevel7.length);
    var roundLevel10 = weekNumber % (affixesTurnLevel10.length);

    var affixLevel2 = affixesTurnLevel2[roundLevel2];
    var affixLevel4 = affixesTurnLevel4[roundLevel4];
    var affixLevel7 = affixesTurnLevel7[roundLevel7];
    var affixLevel10 = affixesTurnLevel10[roundLevel10];

    return new Affix(affixLevel2, affixLevel4, affixLevel7, affixLevel10);
}

exports.getAffixes = function () {
    var closestWednesday = getClosestWednesday();
    var result = getWeekNumber(closestWednesday);

    var functionResult = [];
    for (i = 0; i < 6; i++) {
        var affixDate = new Date(closestWednesday);
        affixDate.setDate(affixDate.getDate() + (i * 7));
        var currentAffixes = getAffixByWeek((result + (i * 7)));
        var affix = new Affixes(affixDate, currentAffixes, affixWeekTitleTurn[i]);
        functionResult.push(affix);
    }

    return functionResult;
};
