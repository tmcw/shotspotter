var fs = require('fs'),
    Incr = require('incr-object'),
    dsv = require('dsv');

var rows = dsv(',').parse(fs.readFileSync('incidents.csv', 'utf8'));

var incr = new Incr();

rows.forEach(function(r) {
    var d = new Date(r['Date Time']);
    var mins = d.getMinutes() + (d.getHours() * 60);
    incr.incr(mins);
});

fs.writeFileSync('minutes.json', JSON.stringify(incr.entries().map(function(d) {
    return [
        +d.key / (1440) * Math.PI * 2, d.value
    ];
})));
