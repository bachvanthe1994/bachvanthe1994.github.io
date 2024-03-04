//====================ACCORDANCE INIT=================//
$(document).ready(function () {
  $('[data-content]').on('change', function () {
    $(this).closest('[data-accordion]').trigger('resize');
  })
  $('[data-accordion]').accordion({
    "transitionSpeed": 200
  });
  $('[data-accordion]').trigger('resize');
  $('.sticky-menu [data-accordion]').on('accordion.close', function () {
    setTimeout(function () {
      $(window).trigger('resize');
    }, 10)

  });
  $('[data-accordion]').removeClass('open-init')

  $('.sticky-menu [data-accordion]').on('accordion.open', function () {
    setTimeout(function () {
      $(window).trigger('resize');
    }, 10)

  });

  //snap to top
  $('.accordion-snap [data-accordion]').on('accordion.close', function () {
    var el = $(this).find('[data-control]').get(0).getBoundingClientRect().y;
    if (el < 0) {
      $('html,body').animate({
        scrollTop: $(this).offset().top - 0
      }, 200);
    };
  });
});
//====================END ACCORDANCE INIT=================//