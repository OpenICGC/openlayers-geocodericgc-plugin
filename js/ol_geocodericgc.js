/* global Geocoder */
/*eslint strict: 0*/

(function (win, doc) {
    'use strict';
  
    var olview = new ol.View({
      center: [203380, 5119615],
      zoom: 8,
      minZoom: 2,
      maxZoom: 20
    }),
      baseLayer = new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      map = new ol.Map({
        target: doc.getElementById('map'),
        view: olview,
        layers: [baseLayer]
      });
  
    /**
     * Custom provider for ICGC Geocder-
     * Factory function which returns an object with the methods getParameters
     * and handleResponse called by the Geocoder
     */
    function ICGCSearch (options) {
      var url = options.url;
      return {
        /**
         * Get the url, query string parameters and optional JSONP callback
         * name to be used to perform a search.
         * @param {object} options Options object with query, key, lang,
         * countrycodes and limit properties.
         * @return {object} Parameters for search request
         */
        getParameters: function (options) {
          return {
            url: url,
            params: {
              text: options.query,
              layers: 'topo1,topo2,address',
              size: 5
            },
            callbackName:null
          };
        },
        /**
         * Given the results of performing a search return an array of results
         * @param {object} data returned following a search request
         * @return {Array} Array of search results
         */
        handleResponse: function (results) {
          // The API returns a GeoJSON FeatureCollection
          if (results && results.features && results.features.length) {
            return results.features.map(function (feature) {
              return {
                lon: feature.geometry.coordinates[0],
                lat: feature.geometry.coordinates[1],
                address: {
                  // Simply return a name in this case, could also return road,
                  // building, house_number, city, town, village, state,
                  // country
                  name: feature.properties.label
                }
              };
            });
          } else {
            return;
          }
        }
      };
    }
  
    // Create an instance of the custom provider, passing any options that are
    // required
    var provider = ICGCSearch({
      url: 'https://eines.icgc.cat/geocodificador/autocompletar'
    });
  
    var geocoder = new Geocoder('nominatim', {
      // Specify the custom provider instance as the "provider" value
      provider: provider,
      autoComplete: true,
      autoCompleteMinLength: 3,
      targetType: 'text-input',
      lang: 'ca',
      keepOpen: false,
      preventDefault: true
    });
    map.addControl(geocoder);
  
    geocoder.on('addresschosen', function(evt) {
      if (evt.bbox) {
        map.getView().fit(evt.bbox, {duration: 500});
      } else {
        map.getView().animate({zoom: 14, center: evt.coordinate});
      }
    });
  
  })(window, document);