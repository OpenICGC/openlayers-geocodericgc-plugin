# OpenLayers Geocoder ICGC

Extensió de geocodificació per [OpenLayers](http://openlayers.org/). **Requeriments** OpenLayers **v3.11.0** o superior.
Utilitza el plugin [OpenLayers Control Geocoder](https://github.com/jonataswalker/ol-geocoder) i es crea una extensió per utilitzar el geocodificador ICGC.

## Demo
Podeu accedir a [la demo](https://openicgc.github.io/openlayers-geocodericgc-plugin/) .

## Com utilitzar-lo?

##### CSS i Javascript en local
Load CSS and Javascript:
```HTML
<link href="css/ol-geocodericgc.css" rel="stylesheet">
 <script src="https://cdn.jsdelivr.net/npm/ol-geocoder"></script>
<script src="js/ol-geocodericgc.js"></script>
```

##### Instanciació del control
```javascript

var providerICGC = ICGCSearch({
      url: 'https://eines.icgc.cat/geocodificador/autocompletar'
});
  
var geocoder = new Geocoder('nominatim', {
      // Especificar provider ICGC
      provider: providerICGC,
      autoComplete: true,
      autoCompleteMinLength: 3,
      targetType: 'text-input',
      lang: 'en',
      keepOpen: false,
      preventDefault: true
    });
map.addControl(geocoder);
```

##### Capturar el que retorna el geocodificador
```javascript
 geocoder.on('addresschosen', function(evt) {
      if (evt.bbox) {
        map.getView().fit(evt.bbox, {duration: 500});
      } else {
        map.getView().animate({zoom: 14, center: evt.coordinate});
      }
});
```
