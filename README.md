# OpenLayers Geocoder ICGC

Extensió de geocodificació per [OpenLayers](http://openlayers.org/). **Requeriments** OpenLayers **v3.11.0** o superior.

## Demo
Podeu accedir a [la demo](https://openicgc.github.io/openlayers-geocodericgc-plugin/) .

## Com utilitzar-lo?

##### CSS i Javascript en local
Load CSS and Javascript:
```HTML
<link href="css/ol-geocodericgc.css" rel="stylesheet">
<script src="js/ol-geocodericgc.js"></script>
```

##### Instanciació del control
```javascript
var geocodericgc = new GeocoderICGC('icgc', {  
  placeholder: 'Search for ...',
  targetType: 'text-input',
  limit: 5
});
map.addControl(geocodericgc);
```

##### Capturar el que retorna el geocodificador
```javascript
geocodericgc.on('addresschosen', function(evt){
  var feature = evt.feature,
      coord = evt.coordinate,
      address = evt.address;
  // some popup solution
  content.innerHTML = '<p>'+ address.formatted +'</p>';
  overlay.setPosition(coord);
});
```
