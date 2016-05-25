var sandboxToken = 'sandbox-token';

// Isochron starting point
var from = [48.846905, 2.377097];

// Limit isochron duration (required, or may trigger timeout when there is more data)
var maxDuration = 3600 * 6;

// Query for this isochron
var isochronUrl = 'https://api.sncf.com/v1/coverage/sandbox-sncf/journeys?from='+from[1]+';'+from[0]+'&max_duration='+maxDuration;

// Call SNCF api
$.ajax({
    type: 'GET',
    url: isochronUrl,
    dataType: 'json',
    headers: {
        Authorization: 'Basic ' + btoa(sandboxToken)
    },
    success: drawIsochron,
    error: function(xhr, textStatus, errorThrown) {
        alert('Error when trying to process isochron: "'+textStatus+'", "'+errorThrown+'"');
    }
});

/*
 * Drawing isochron result on a map.
 *
 * Isochron result contains many points with their duration from starting point.
 * So here using Leaflet, each point will be represented with a color
 * showing its duration from starting point.
 */

var tiles = {
    url: 'http://www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png',
    attrib: 'Isochron example with SNCF open data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
};

// Create a drawable map using Leaflet
var map = L.map('map')
    .setView(from, 7)
    .addLayer(new L.TileLayer(tiles.url, {minZoom: 0, maxZoom: 16, attribution: tiles.attrib}))
;

// Add marker to show isochron starting point
L.marker(from).addTo(map);

var geojsonLayer = null;

/**
 * Display points returned by navitia isochron, and colored red/green depending on journey duration.
 *
 * @param {Object} result
 */
function drawIsochron(result) {
    var isochron = [];

    $.each(result.journeys, function (i, journey) {
        isochron.push({
            to: [
                parseFloat(journey.to.stop_point.coord.lat),
                parseFloat(journey.to.stop_point.coord.lon)
            ],
            duration: journey.duration,
            data: journey
        });
    });

    var geojson = createGeoJsonFromIsochron(isochron);

    drawGeoJson(map, geojson);
}

/**
 * Create a geoJson object contening all points and their colors.
 *
 * @param {Array} isochron
 *
 * @returns {Object} GeoJson object
 */
function createGeoJsonFromIsochron(isochron) {
    var geojson = {
        name: 'Points',
        type: 'FeatureCollection',
        features: []
    };

    $.each(isochron, function (i, point) {
        geojson.features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: point.to.reverse()
            },
            properties: {
                color: colorFromDuration(point.duration),
                journey: point.data
            }
        });
    });

    return geojson;
}

/**
 * Create a Leaflet GeoJson layer and append it to the map.
 * (Remove the last layer if there is any.)
 *
 * @param {L.Map} map
 * @param {Object} geojson
 */
function drawGeoJson(map, geojson) {
    if (null !== geojsonLayer) {
        map.removeLayer(geojsonLayer);
    }

    geojsonLayer = L.geoJson(geojson, {
        style: function(feature) {
            return {
                color: feature.properties.color
            };
        },
        pointToLayer: function(feature, latlng) {
            var raduis = 4;

            return new L.CircleMarker(latlng, {radius: raduis, fillOpacity: 0.6});
        },
        onEachFeature: function (feature, layer) {
            var journey = feature.properties.journey;
            var hours = Math.floor(journey.duration / 3600);
            var min = Math.round((journey.duration - hours * 3600) / 60);
            var duration = hours+'h'+min+'min';
            var journeyLink = journey.links[0].href.replace('://', '://'+sandboxToken+'@');

            layer.bindPopup([
                '<b>'+journey.to.name+'</b>',
                duration,
                '<a href="'+journeyLink+'" target="_blank">Journeys to this point</a>'
            ].join('<br>'));
        }
    });

    map.addLayer(geojsonLayer);
}

/**
 * Calculate a color from a duration, from green to red when duration is small/long.
 *
 * @param {Integer} duration
 *
 * @returns {String}
 */
function colorFromDuration(duration) {
    var color1 = '822566';
    var color2 = '1C9DD5';
    var ratio = duration / maxDuration;
    ratio *= ratio; // Apply ratio^2 to have more green.
    var hex = function(x) {
        x = x.toString(16);
        return (x.length === 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
    var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
    var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

    var middle = hex(r) + hex(g) + hex(b);

    return '#' + middle;
}
