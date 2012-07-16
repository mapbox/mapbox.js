if (typeof mapbox === 'undefined') mapbox = {};


mapbox.util = {

    // Asynchronous map that groups results maintaining order
    asyncMap: function(values, func, callback) {
        var remaining = values.length,
            results = [];

        function next(index) {
            return function(result) {
                results[index] = result;
                remaining--;
                if (!remaining) callback(results);
            };
        }

        for (var i = 0; i < values.length; i++) {
            func(values[i], next(i));
        }
    }
};
