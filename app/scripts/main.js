var app = app || {};

app.Main = new Model({
  /**
   * The various locations
   * @type {Array}
   */
  locations: ['overview', 'warmup', 'wedding', 'party', 'morning', 'sleeping'],

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

    setTimeout(this.checkWaypoints.bind(this), 1000);
  },

  /**
   * Check which waypoint should be shown
   */
  checkWaypoints: function() {
    var initPosition = window.scrollY;

    $.each(this.locations, $.proxy(function(index, name) {
      var $location = $('.location--' + name),
        top = $location.offset().top,
        bottom = top + $location.height();

      if (
        initPosition >= top &&
        initPosition <= bottom
      ) {
        this.map.goToMarker(name);
      }
    }, this));
  },

  /**
   * Open the menu
   */
  openMenu: function(event) {
    event.preventDefault();

    this.$navigation.addClass('navigation--visible');
    this.$navigation.removeClass('navigation--hidden');
  },

  /**
   * Close the menu
   */
  closeMenu: function() {
    this.$navigation.removeClass('navigation--visible');
    this.$navigation.addClass('navigation--hidden');
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
    $.each(this.locations, $.proxy(function(index, name) {
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
    }, 400, function() {
      setTimeout(this.checkWaypoints.bind(this), 500);
    }.bind(this));
  }
});

new app.Main;
