const det = require("./neighborhoods.js");
const request = require('request');

const out = {};
var remaining = det.features.length;

det.features.forEach((feature) => {
    const p = feature.properties;

    const zoning = "all";
    const shortcut = p.shortcut;
    const boundaries = "mcm2015";

    const url = `https://motorcitymapping.org/public.json?filter=${zoning}&path=${shortcut}&boundaries=${boundaries}`;

    request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        const columns = {};
        const stats = body.stats;

        columns['Neighborhood'] = p.slug;
        columns['Name'] = p.name;
        columns['Properties Surveyed'] = stats.total_properties;
        columns['Number of Parcels'] = stats.num_parcels;

        columns['Structures'] = stats.structure.yes;
        columns['Not Structures'] = stats.structure.no;

        columns['Good Condition'] = stats.condition.good;
        columns['Fair Condition'] = stats.condition.fair;
        columns['Poor Condition'] = stats.condition.poor;
        columns['Demo Condition'] = stats.condition['suggest demolition'];

        columns['Occupied'] = stats.occupancy.occupied;
        columns['Maybe Occupied'] = stats.occupancy.maybe;
        columns['Partially Occupied'] = stats.occupancy.partial;
        columns['Not Occupied'] = stats.occupancy.unoccupied;

        columns['Fire Damage'] = stats.fire.yes;
        columns['No Fire Damage'] = stats.fire.no;

        columns['Trespass Open'] = stats.trespass.open;
        columns['Trespass Secure'] = stats.trespass.secure;

        columns['Lots with Dumping'] = stats['lot-dumping'].yes;
        columns['Lots without Dumping'] = stats['lot-dumping'].no;

        columns['Structures needing Boarding'] = stats.boarding.yes;
        columns['Structures not needing Boarding'] = stats.boarding.no;

        Object.keys(columns).forEach((key) => {
            if (!columns[key]) {
                columns[key] = 0;
            }
        })

        out[p.slug] = columns;

        remaining -= 1;
        console.log(body.name, remaining);

        if (remaining === 0) {
            const final = Object.keys(out).map((key) => out[key]);
            require('fs').writeFile('perfect.json', JSON.stringify(final));
        }
    });
});