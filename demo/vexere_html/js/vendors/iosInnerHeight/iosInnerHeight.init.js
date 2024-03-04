if (iOS()) {
  document.addEventListener('scroll', function () {
    if (iosInnerHeight() == window.innerHeight) {
      document.querySelector('body').classList.add('ios-nav-hide');
    } else {
      document.querySelector('body').classList.remove('ios-nav-hide');

    }
  })
}
