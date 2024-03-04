//====================CLEAVE INIT=================//
$(document).ready(function () {
  //Cleave
  if (('.cleave-birthday').length) {
    $('.cleave-birthday').toArray().forEach(function (field) {
      new Cleave(field, {
        date: true,
        datePattern: ['d', 'm', 'Y']
      });
    })
    $('.cleave-number').toArray().forEach(function (field) {
      new Cleave(field, {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand'
      });
    });
    $('.cleave-time').toArray().forEach(function (field) {
      new Cleave(field, {
        time: true,
        timePattern: ['h', 'm']
      });
    })
  }
});
//====================END CLEAVE INIT=================//