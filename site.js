d3.json('exclude.json')
    .on('load', function(exclude) {
        d3.json('minutes.json')
            .on('load', function(data) {
                var form = d3.select('body')
                    .append('form');

                var exc = form
                    .append('input')
                    .attr('type', 'checkbox')
                    .attr('id', 'include');

                form
                    .append('label')
                    .attr('for', 'include')
                    .text('include NYE, New Years, and July 4th');

                var div = d3.select('body').append('div')
                    .datum(exclude)
                    .call(circadian()
                        .width(window.innerWidth)
                        .height(window.innerWidth));

                exc.on('click', function() {
                    div.datum(this.checked ? data: exclude)
                        .call(circadian()
                            .width(window.innerWidth)
                            .height(window.innerWidth));
                });
            })
        .get();
    })
    .get();
