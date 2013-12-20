var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([0, height]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat(function(d) {
        return Math.floor(d / 60) + ':00';
    })
    .orient("left");

var areaDawn = d3.svg.area()
    .x(areaX)
    .y0(0)
    .y1(function(d) {
        return y((d.sun.dawn.getHours() * 60) + d.sun.dawn.getMinutes());
    });

var areaDusk = d3.svg.area()
    .x(areaX)
    .y0(height)
    .y1(function(d) {
        return y((d.sun.dusk.getHours() * 60) + d.sun.dusk.getMinutes());
    });

function areaX(d) { return x(d.date); }

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append('rect')
    .attr('class', 'bg')
    .attr('width', width)
    .attr('height', height);

d3.json('events.json').on('load', function(data) {
    data = data.map(function(d) {
        return new Date(d);
    });

    x.domain(d3.extent(data, function(d) { return d; }));
    y.domain([0, 1440]);

    var times = x.ticks(1000).map(function(d) {
        return {
            sun: SunCalc.getTimes(d, 38.904960424120034, -77.03025341033936),
            date: d
        };
    });

    svg.append("path")
        .datum(times)
        .attr("class", "area")
        .attr("d", areaDawn);

    svg.append("path")
        .datum(times)
        .attr("class", "area")
        .attr("d", areaDusk);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.ticks(6));

    svg.append("g")
      .selectAll('rect.shot')
      .data(data)
      .enter()
      .append('rect')
      .attr("width", 1.5)
      .attr("height", 1.5)
      .classed('shot', true)
      .attr("transform", function(d) {
          return 'translate(' + [
              ~~x(d),
              ~~y((d.getHours() * 60) + d.getMinutes())] + ')';
      });
}).get();
