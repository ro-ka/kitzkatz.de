var app = app || {};

app.Map = new Model({
  /**
   * Initialize
   */
  init: function() {
    var $el = $('.map');

    L.mapbox.accessToken = 'pk.eyJ1Ijoicm9rYSIsImEiOiJvR29QUEp3In0.' +
      'xeb909L0DGJcmmprwfIwKA ';
    this.mapCanvas = L.mapbox.map($el[0], 'roka.62c84d10', {
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
      sleepingDummys = [[53.560498, 9.68], [53.560498, 9.961]],
      markers = [
        {
          name: 'wedding',
          title: 'Standesamt',
          symbol: 'circle-stroked',
          location: [53.5900085484691, 9.98429775238037]
        },
        {
          name: 'party',
          title: 'Trauung & Feier',
          symbol: 'circle-stroked',
          location: [53.5765981765732, 9.82722222805023],
          zIndexOffset: 100
        },
        {
          name: 'morning',
          title: 'Der Morgen danach…',
          symbol: 'cafe',
          location: [53.5610806576551, 10.0299221277237]
        },
        {
          name: 'sleeping',
          title: 'Nachtlager: Hotel Hamburg Altona',
          symbol: 'lodging',
          location: [53.5537802621917, 9.93338406085968]
        },
        {
          name: 'sleeping',
          title: 'Nachtlager: Superbude',
          symbol: 'lodging',
          location: [53.5606775914178, 9.96014177799225]
        },
        {
          name: 'sleeping',
          title: 'Nachtlager: Hotel Blankenese',
          symbol: 'lodging',
          location: [53.5746329178676, 9.82420742511749]
        },
      ];

    $.each(markers, $.proxy(function(index, marker) {
      L.marker(marker.location, {
          alt: marker.name,
          title: marker.title,
          riseOnHover: true,
          zIndexOffset: marker.zIndexOffset || 0,
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
