var app = app || {};

app.Main = new Model({
  /**
   * Initialize
   */
  init: function() {
    this.map = new app.Map();
    this.$navigation = $('.navigation');

    this.map.on('location', this.scrollToLocation);

    this.initWaypoints();

    $('.menu-button').on('click', this.openMenu);
    $('.navigation__close').on('click', this.onMenuCloseClick);
    $('.navigation__link').on('click', this.closeMenu);
  },

  /**
   * Open the menu
   */
  openMenu: function(event) {
    event.preventDefault();

    this.$navigation.addClass('navigation--visible');
  },

  /**
   * Close the menu
   */
  closeMenu: function() {
    this.$navigation.removeClass('navigation--visible');
  },

  /**
   * On click of the menu close button
   */
  onMenuCloseClick: function(event) {
    event.preventDefault();

    this.closeMenu();
  },

  /**
   * Initialize the waypoints
   */
  initWaypoints: function() {
    var locations = ['overview', 'wedding', 'party', 'morning', 'sleeping'];

    $.each(locations, $.proxy(function(index, name) {
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
