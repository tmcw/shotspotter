d3.json('minutes.json')
    .on('load', function(data) {
        var div = d3.select('body').append('div')
            .datum(data)
            .call(circadian()
                .width(window.innerWidth)
                .height(window.innerWidth));
    })
    .get();
