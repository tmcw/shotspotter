d3.json('exclude.json')
    .on('load', function(exclude) {
        d3.json('minutes.json')
            .on('load', function(data) {
                var excluded = true;

                var exc = d3.select('body').append('button')
                    .text('excluding NYE, New Years, and July 4th');

                var div = d3.select('body').append('div')
                    .datum(exclude)
                    .call(circadian()
                        .width(window.innerWidth)
                        .height(window.innerWidth));

                exc.on('click', function() {

                    excluded = !excluded;

                    exc.text(excluded ?
                        'excluding NYE, New Years, and July 4th' :
                        'including NYE, New Years, and July 4th');

                    div
                        .datum(excluded ? exclude : data)
                        .call(circadian()
                            .width(window.innerWidth)
                            .height(window.innerWidth));
                });
            })
        .get();
    })
    .get();
