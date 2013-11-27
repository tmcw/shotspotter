var fs = require('fs'),
    Incr = require('incr-object'),
    dsv = require('dsv');

var rows = dsv(',').parse(fs.readFileSync('incidents.csv', 'utf8'));

var incr = new Incr();
var exclude = true;

rows.forEach(function(r) {
    var d = new Date(r['Date Time']);
    var mins = d.getMinutes() + (d.getHours() * 60);
    if (exclude &&
        ((d.getDate() === 4 && d.getMonth() === 6) ||
        (d.getDate() === 1 && d.getMonth() === 0) ||
        (d.getDate() === 11 && d.getMonth() === 31))
       ) return;
    incr.incr(mins);
});

fs.writeFileSync(exclude ? 'exclude.json' : 'minutes.json', JSON.stringify(incr.entries().map(function(d) {
    return [
        +d.key / (1440) * Math.PI * 2, d.value
    ];
})));
