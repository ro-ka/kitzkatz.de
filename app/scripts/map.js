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

    this.initMarkers();
  },

  /**
   * Initialize the marker
   */
  initMarkers: function() {
    var weddingLocation = [53.589882, 9.9851075],
      weddingDummys = [[53.589882, 9.999], [53.589882, 9.984]],
      partyLocation = [53.576456438929, 9.82718735933304],
      partyDummys = [[53.576456438929, 9.821], [53.576456438929, 9.829]],
      morningLocation = [53.560874, 10.03004],
      morningDummys = [[53.560874, 10.04], [53.560874, 10.025]];

    L.marker(weddingLocation, {
      alt: 'wedding',
      title: 'Standesamtliche Trauung',
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      })
    })
    .addTo(this.mapCanvas)
    .on('click', this.onMarkerClick);

    L.marker(partyLocation, {
      alt: 'party',
      title: 'Feier',
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      })
    })
    .addTo(this.mapCanvas)
    .on('click', this.onMarkerClick),

    L.marker(morningLocation, {
        alt: 'morning',
        title: 'Der Morgen danach…',
        icon: L.mapbox.marker.icon({
          'marker-color': '#f86767'
        })
      })
      .addTo(this.mapCanvas)
      .on('click', this.onMarkerClick);

    this.markerBounds = {
      wedding: L.latLngBounds(weddingDummys),
      party: L.latLngBounds(partyDummys),
      morning: L.latLngBounds(morningDummys)
    };
  },

  /**
   * On a marker click
   * @param  {Event} event The click event
   */
  onMarkerClick: function(event) {
    this.trigger('location', event.target.options.alt);
    this.goToMarker(event.target.options.alt);
  },

  /**
   * Go to the passed in marker
   * @param  {String} name The marker name
   */
  goToMarker: function(name) {
    this.mapCanvas.fitBounds(this.markerBounds[name]);
  }
});
