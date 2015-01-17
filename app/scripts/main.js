var app = app || {};

app.Main = new Model({
  /**
   * Initialize
   */
  init: function() {
    this.map = new app.Map();

    this.map.on('location', this.scrollToLocation);

    this.initWaypoints();
  },

  /**
   * Initialize the waypoints
   */
  initWaypoints: function() {
    $.each(['wedding', 'party', 'morning'], $.proxy(function(index, name) {
      $('.location--' + name).waypoint({
        handler: function(direction) {
          if (direction !== 'down') {
            return;
          }

          this.map.goToMarker(name);
        }.bind(this),
        offset: '40%'
      });

      $('.location--' + name).waypoint({
        handler: function(direction) {
          if (direction !== 'up') {
            return;
          }

          this.map.goToMarker(name);
        }.bind(this),
        offset: '-60%'
      });
    }, this));
  },

  /**
   * Scroll to a location element
   * @param  {String} name The location name
   */
  scrollToLocation: function(name) {
    $('html, body').animate({
      scrollTop: $('.location--' + name).offset().top
    }, 400);
  }
});

new app.Main;
