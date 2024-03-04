//====================BOOTSTRAP INIT=================//

// fix modal
$.fn.modal.Constructor.prototype._enforceFocus = function() {};
// end fix modal

var scrollTargetModal = '.modal.show .modal-body';

$(document).on('show.bs.modal', '.modal', function (event) {
  var zIndex = 1040 + (10 * $('.modal:visible').length);
  $(this).css('z-index', zIndex);
  setTimeout(function () {
    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
  }, 0);
});
$(document).ready(function () {
  $('[data-tooltip]').tooltip({
    container: 'body',
    boundary: 'window',
    html: true
  });
  $('[data-toast=toast]').on('click', function () {
    var id = $(this).attr('toast-target');
    $(id).toast('show')
  })
  $('.toast').toast({
    delay: 3000
  })
  $('.modal').on('shown.bs.modal', function (e) {
    if ($(window).width() < 769) {
      BNS.on();
      $('[data-tooltip]').tooltip('hide');
    }
  });
  $('.modal').on('hide.bs.modal', function (e) {
    if ($(window).width() < 769) {
      BNS.off()
    }
  });

  $(document).on('click', '.dropdown-click', function (e) {
    e.stopPropagation();
  });
  $('[data-toggle=dropdown]').dropdown({
    popperConfig: {
      modifiers: {
        preventOverflow: {
          boundariesElement: 'viewport',
          escapeWithReference: true
        }
      },
    }
  })
});
(function () {
  // hold onto the drop down menu                                             
  var dropdownMenu;

  // and when you show it, move it to the body                                     
  $(window).on('show.bs.dropdown', function (e) {

    // grab the menu        
    dropdownMenu = $(e.target).find('.dropdown-menu');

    // detach it and append it to the body
    $('body').append(dropdownMenu.detach());

    // grab the new offset position
    var eOffset = $(e.target).offset();

    // make sure to place it where it would normally go (this could be improved)
    dropdownMenu.css({
      'display': 'block',
      'top': eOffset.top + $(e.target).outerHeight(),
      'left': eOffset.left
    });
  });

  // and when you hide it, reattach the drop down, and hide it normally                                                   
  $(window).on('hide.bs.dropdown', function (e) {
    $(e.target).append(dropdownMenu.detach());
    dropdownMenu.hide();
  });
})();
//====================END BOOTSTRAP INIT=================//