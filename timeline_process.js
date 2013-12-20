var fs = require('fs'),
    dsv = require('dsv');

var rows = dsv(',').parse(fs.readFileSync('incidents.csv', 'utf8'));
var out = [];

rows.forEach(function(r) {
    var d = +(new Date(r['Date Time']));
    out.push(d);
});

fs.writeFileSync('timeline/events.json', JSON.stringify(out));
