// Create a map object.
var mymap = L.map('map', {
    center: [47.7511, -120.7401],
    zoom: 7,
    maxZoom: 10,
    minZoom: 3,
    detectRetina: true});

// Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);



// build up a set of colors from colorbrewer's dark2 category
var colors = chroma.scale('Dark2').mode('lch').colors(2);
var marker = null;

// dynamically append style classes to this page. This style classes will be used for colorize the markers.
for (i = 0; i < 2; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

// Get GeoJSON and put on it on the map when it loads
airports= L.geoJson.ajax("assets/airports.geojson", {
    // The content of the popup window shows airports name, city, and state
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.AIRPT_NAME + ",  " + feature.properties.CITY + ",  " + feature.properties.STATE);
    },
    pointToLayer: function (feature, latlng) {
        var id = 0;
        console.log(latlng.lat)
        if (feature.properties.CNTL_TWR == "Y") { id = 0; }
              else { id = 1;} // "N"
              marker = L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
              marker.on('click', function(){


              })
        return marker;
    },
    attribution: 'airports in the U.S | Washington country &copy; Washington Data & Research | Base Map &copy; CartoDB | Made By Yunze Zhao'
}).addTo(mymap);


// Set function for color ramp
colors = chroma.scale('YlOrRd').colors(5);

function setColor(density) {
    var id = 0;
    if (density > 60) { id = 4; }
    else if (density > 40 && density <= 60) { id = 3; }
    else if (density > 20 && density <= 40) { id = 2; }
    else if (density > 11 && density <= 20) { id = 1; }
    else { id = 0; }
    return colors[id];
}


// Set style function that sets fill color.md property equal to cell tower density
function style(feature) {
    return {
        fillColor: setColor(feature.properties.count),
        fillOpacity: 0.4,
        weight: 2,
        opacity: 1,
        color: '#b4b4b4',
        dashArray: '4'
    };
}

// Add states polygons
// create country variable, and assign null to it.
var country = null;
country = L.geoJson.ajax("assets/us-states.geojson", {
   onEachFeature: function (feature, layer) {
      layer.bindPopup(feature.properties.name + ',  Airport number:'+ feature.properties.count);
   },
    style: style
}).addTo(mymap);




// Create Leaflet Control Object for Legend
var legend = L.control({position: 'topright', disableVisibilityControls: 'true'});

// Function that runs when legend is added to map
legend.onAdd = function () {

    // Create Div Element and Populate it with HTML
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b>airports numbers in each state</b><br />';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p> 61+ </p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p> 41-60 </p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p> 21-40 </p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 11-20 </p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p> 0-10 </p>';
    div.innerHTML += '<hr><b>Airport type<b><br />';
    div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> Airport with air traffic control tower</p>';
    div.innerHTML += '<i class="fa fa-plane marker-color-2"></i><p> Airport</p>';
    // Return the Legend div containing the HTML content
    return div;
};

// 11. Add a legend to map
legend.addTo(mymap);

// 12. Add a scale bar to map
L.control.scale({position: 'bottomleft'}).addTo(mymap);
