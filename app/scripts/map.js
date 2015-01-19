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
    var overviewDummys = [[53.560874, 10.04], [53.576456438929, 9.821]],
      weddingDummys = [[53.589882, 9.999], [53.589882, 9.984]],
      partyDummys = [[53.576456438929, 9.82], [53.576456438929, 9.83]],
      morningDummys = [[53.560874, 10.045], [53.560874, 10.027]],
      sleepingDummys = [[53.560498, 9.93], [53.560498, 9.97]],
      markers = [
        {
          name: 'wedding',
          title: 'Standesamt',
          symbol: 'circle-stroked',
          location: [53.589882, 9.9851075]
        },
        {
          name: 'party',
          title: 'Feier',
          symbol: 'circle-stroked',
          location: [53.576456438929, 9.82718735933304]
        },
        {
          name: 'morning',
          title: 'Der Morgen danach…',
          symbol: 'cafe',
          location: [53.560874, 10.03004]
        },
        {
          name: 'sleeping',
          title: 'Übernachtung',
          symbol: 'lodging',
          location: [53.560498, 9.96019]
        },
      ];

    $.each(markers, $.proxy(function(index, marker) {
      L.marker(marker.location, {
          alt: marker.name,
          title: marker.title,
          icon: L.mapbox.marker.icon({
          'marker-size': 'large',
          'marker-symbol': marker.symbol,
          'marker-color': '#E74C3C'
          })
        })
        .addTo(this.mapCanvas)
        .on('click', this.onMarkerClick)
        .on('mouseover', this.onMarkerMouseover)
        .on('mouseout', this.onMarkerMouseout);
    }, this));

    this.markerBounds = {
      overview: L.latLngBounds(overviewDummys),
      wedding: L.latLngBounds(weddingDummys),
      party: L.latLngBounds(partyDummys),
      morning: L.latLngBounds(morningDummys),
      sleeping: L.latLngBounds(sleepingDummys)
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
   * On a marker hover
   * @param  {Event} event The mouseover event
   */
  onMarkerMouseover: function(event) {
    event.target
      .bindPopup(event.target.options.title, {closeButton: false})
      .openPopup();
  },

  /**
   * On a marker unhover
   * @param  {Event} event The mouseout event
   */
  onMarkerMouseout: function(event) {
    event.target.closePopup();
  },

  /**
   * Go to the passed in marker
   * @param  {String} name The marker name
   */
  goToMarker: function(name) {
    this.mapCanvas.fitBounds(this.markerBounds[name]);
  }
});
