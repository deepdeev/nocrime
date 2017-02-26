var map;

function initMap()
{
    if(document.getElementById('map')!=null)
    {
        var locations = [
            ['Pozo1', 4.604534, -74.069729, 4],
            ['Pozo2', 4.605410, -74.075206, 5],
            ['Pozo3', 4.605656, -74.075657, 3],
            ['Pozo4', 4.604576, -74.075206, 2],
            ['Pozo5', 4.606437, -74.073404, 1]
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: new google.maps.LatLng(4.604534, -74.069729)

            // ,mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }
}
// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: { lat: 20, lng: -160 },
//         zoom: 20,
//         styles: mapStyle
//     });
//
//     map.data.setStyle(styleFeature);
//
//     // Get the earthquake data (JSONP format)
//     // This feed is a copy from the USGS feed, you can find the originals here:
//     //   http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
//     var script = document.createElement('script');
//     script.setAttribute('src',
//         'https://storage.googleapis.com/maps-devrel/quakes.geo.json');
//     document.getElementsByTagName('head')[0].appendChild(script);
// }
//
// // Defines the callback function referenced in the jsonp file.
// function eqfeed_callback(data) {
//     map.data.addGeoJson(data);
// }
//
// function styleFeature(feature) {
//     var low = [151, 83, 34];   // color of mag 1.0
//     var high = [5, 69, 54];  // color of mag 6.0 and above
//     var minMag = 1.0;
//     var maxMag = 6.0;
//
//     // fraction represents where the value sits between the min and max
//     var fraction = (Math.min(feature.getProperty('mag'), maxMag) - minMag) /
//         (maxMag - minMag);
//
//     var color = interpolateHsl(low, high, fraction);
//
//     return {
//         icon: {
//             path: google.maps.SymbolPath.CIRCLE,
//             strokeWeight: 0.5,
//             strokeColor: '#fff',
//             fillColor: color,
//             fillOpacity: 2 / feature.getProperty('mag'),
//             // while an exponent would technically be correct, quadratic looks nicer
//             scale: Math.pow(feature.getProperty('mag'), 2)
//         },
//         zIndex: Math.floor(feature.getProperty('mag'))
//     };
// }
//
// function interpolateHsl(lowHsl, highHsl, fraction) {
//     var color = [];
//     for (var i = 0; i < 3; i++) {
//         // Calculate color based on the fraction.
//         color[i] = (highHsl[i] - lowHsl[i]) * fraction + lowHsl[i];
//     }
//
//     return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
// }
//
// var mapStyle = [{
//     'featureType': 'all',
//     'elementType': 'all',
//     'stylers': [{'visibility': 'on'}]
// }, {
//     'featureType': 'landscape',
//     'elementType': 'geometry',
//     'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
// }, {
//     'featureType': 'water',
//     'elementType': 'labels',
//     'stylers': [{'visibility': 'on'}]
// }, {
//     'featureType': 'water',
//     'elementType': 'geometry',
//     'stylers': [{'visibility': 'on'}, {'hue': '#5f94ff'}, {'lightness': 60}]
// }];
