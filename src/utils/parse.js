var det = require("./neighborhoods.js");

var obj2 = det.features.map((feature) => {
    var obj = {};
    var prop = feature.properties;

    ['id', 'name', 'slug'].forEach((key) => {
        obj[key] = prop[key];
    });

    Object.keys(prop.scores.all).forEach((key) => {
        obj['all_' + key] = prop.scores.all[key] * (key == 'total_properties' ? 1 : prop.scores.all['total_properties']);
    });
    Object.keys(prop.scores.public).forEach((key) => {
        obj['public_' + key] = prop.scores.public[key] * (key == 'total_properties' ? 1 :  prop.scores.public['total_properties']);
    });
    Object.keys(prop.scores.private).forEach((key) => {
        obj['private_' + key] = prop.scores.private[key] * (key == 'total_properties' ? 1 :  prop.scores.private['total_properties']);
    });
    
    return obj;
});

require('fs').writeFile('taco.json', JSON.stringify(obj2));
