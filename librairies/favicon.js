var favicons = [
    'bolstering.jpg',
    'bursting.jpg',
    'explosive.jpg',
    'fortified.jpg',
    'grievous.jpg',
    'infested.jpg',
    'necrotic.jpg',
    'overflowing.jpg',
    'quaking.jpg',
    'raging.jpg',
    'relentless.jpg',
    'sanguine.jpg',
    'skittish.jpg',
    'teeming.jpg',
    'tyrannical.jpg',
    'volcanic.jpg'
];

function random(low, high) {
    return Math.random() * (high - low) + low
}

exports.getFavicon = function () {
    var index = Math.round(random(0,15));

    return favicons[index];
};