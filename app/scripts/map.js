var app = app || {};

app.Map = new Model({
  /**
   * Initialize
   */
  init: function() {
    var $el = $('.map');

    L.mapbox.accessToken = 'pk.eyJ1Ijoicm9rYSIsImEiOiJvR29QUEp3In0.' +
      'xeb909L0DGJcmmprwfIwKA ';
    this.mapCanvas = L.mapbox.map($el[0], 'roka.kpghj01n', {
      scrollWheelZoom: false,
      minZoom: 11,
      center: [53.57, 9.93],
      zoom: 12
    });

    this.initMarker();
  },

  /**
   * Initialize the marker
   */
  initMarker: function() {
    this.markers = {};

    this.markers.wedding = L.marker([53.589882, 9.9851075], {
      alt: 'wedding',
      title: 'Standesamtliche Trauung',
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      })
    })
    .addTo(this.mapCanvas)
    .on('click', this.onMarkerClick);

    this.markers.party = L.marker([53.576456438929, 9.82718735933304], {
      alt: 'party',
      title: 'Feier',
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      })
    })
    .addTo(this.mapCanvas)
    .on('click', this.onMarkerClick);

    this.markers.morning = L.marker([53.560874, 10.03004], {
      alt: 'morning',
      title: 'Der Morgen danach…',
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      })
    })
    .addTo(this.mapCanvas)
    .on('click', this.onMarkerClick);
  },

  /**
   * On a marker click
   * @param  {Event} event The click event
   */
  onMarkerClick: function(event) {
    this.trigger('location', event.target.options.alt);
    this.mapCanvas.setView(event.latlng, 15);
  },

  /**
   * Go to the passed in marker
   * @param  {String} marker The marker name
   */
  goToMarker: function(marker) {
    this.mapCanvas.setView(this.markers[marker]._latlng, 15);
  }
});
