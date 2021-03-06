var map = L.map('map',{maxZoom:13});

var osmUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
var osmAttrib='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>';
var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 20, attribution: osmAttrib});		
map.setView(new L.LatLng(10.3, -35),3);

map.addLayer(osm);
	

var greenIcon = L.icon({
    iconUrl: 'http://localhost/mapa_unigis/images/marker-icon.png',
    iconSize: [5, 5]
});    



var markers = L.markerClusterGroup({
	showCoverageOnHover: false,
  disableClusteringAtZoom: 14,
  iconCreateFunction: function(cluster) {
  	var markersCluster = cluster.getAllChildMarkers();
    var markerCount = markersCluster.length;
    var className = '';
    if (markerCount < 30) {
    	className = 'marker-cluster-radius30';
    }
    else if (markerCount < 60){
    	className = 'marker-cluster-radius40';
    }
    else if (markerCount < 100){
    	className = 'marker-cluster-radius50';
    }else{
    	className = 'marker-cluster-radius60';
    }

    return new L.DivIcon({
    	html: '<div class=" leaflet-marker-icon '+className+' leaflet-zoom-animated leaflet-clickable" tabindex="0"><div><span>'+markerCount+'</span></div></div>'
    });
  }
}).addTo(map);
this.markers = markers;


var request = './alumnes_unigis.geojson';

$.getJSON(request, function(json){
	var xy = new Array();
	for(var i=0; i<json.features.length;i++){
		var xCoordinate= json.features[i].geometry.coordinates[0];
		var yCoordinate= json.features[i].geometry.coordinates[1];
		xy[i] = [yCoordinate, xCoordinate];
		var geojsonFeature = {
			"type": "Feature", 
		    "geometry": {
				"type": "Point",
				"coordinates": [xCoordinate,yCoordinate]
			 }
		};
		var geoJsonLayer = L.geoJson(geojsonFeature); 
		markers.addLayer(geoJsonLayer);
	};
});



