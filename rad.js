function circadian() {
    var width = 960,
        height = 500,
        xValue = function(d) { return d[0]; },
        yValue = function(d) { return d[1]; },
        margin = {top: 20, right: 20, bottom: 20, left: 20},
        y = d3.scale.linear().range([0, height]);

     var area = d3.svg.area.radial()
        .innerRadius(0)
        .outerRadius(function(d) { return y(yValue(d)); })
        .angle(function(d, i) { return xValue(d); });

    function chart(selection) {
        selection.each(function(data) {
            var svg = d3.select(this).selectAll('svg')
                .data([data]);
            var gEnter = svg.enter().append('svg')
                .style('height', height + 'px')
                .style('width', width + 'px')
                .append('g');
            gEnter.append('path').attr('class', 'area');
            y.domain(d3.extent(data, yValue));

            var g = svg.select('g')
                .attr('transform', 'translate(' + (margin.left + width/2) + ',' +
                      (margin.top + height/2) + ')');

            var hr = g.selectAll('g.hour')
                .data(d3.range(0, 24))
                .enter()
                .append('g')
                .attr('class', 'hour');

            hr.append('path')
                .datum(function(d) {
                    return [[0, 0],
                        [Math.cos(d / 24 * Math.PI * 2) * height / 2,
                        Math.sin(d / 24 * Math.PI * 2) * height / 2]];
                })
                .attr('d', d3.svg.line());

            hr.append('g')
                .attr('transform', function(d) {
                    return 'translate(' + [5 + Math.cos((d - 6) / 24 * Math.PI * 2) * height / 4,
                        Math.sin((d - 6) / 24 * Math.PI * 2) * height / 4] + ')';
                })
                .append('text')
                .attr('text-anchor', 'middle')
                .text(function(d) {
                    return d === 0 ?
                        '12pm' : (d > 12 ? (d - 12) + 'pm' : d + 'am');
                });

            g.select('.area')
                .attr('d', area);
        });
    }

    chart.x = function(_) {
        if (!arguments.length) return xValue;
        xValue = _;
        return chart;
    };

    chart.y = function(_) {
        if (!arguments.length) return yValue;
        yValue = _;
        return chart;
    };

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        y.range([0, height / 2]);
        return chart;
    };

    return chart;
}

