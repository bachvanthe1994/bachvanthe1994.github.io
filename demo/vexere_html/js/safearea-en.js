var checkSafeArea = function() {
  var url_string = window.location.href; 
  var url = new URL(url_string);
  var safeAreaTop = url.searchParams.get("safeAreaTop");
  console.log(safeAreaTop);
  console.log("document.getElementById('main-header-id')", document.getElementById('main-header-id'))
  document.getElementById('main-header-id').style.marginTop = `${safeAreaTop}px`;
}
// window.addEventListener('load', function() {
  checkSafeArea();


const searchInput = $('#searchInput');
const faqGroup = $('#faqGroup');
const DATA_JSON_URL = './data.json';
let enData = [];


function initializeAccordion() {
  $('[data-content]').on('change', function () {
  $(this).closest('[data-accordion]').trigger('resize');
  });

  $('[data-accordion]').accordion({
  "transitionSpeed": 200
  });

  $('[data-accordion]').trigger('resize');
  $('.sticky-menu [data-accordion]').on('accordion.close', function () {
  setTimeout(function () {
    $(window).trigger('resize');
  }, 10);
  });

  $('[data-accordion]').removeClass('open-init');

  $('.sticky-menu [data-accordion]').on('accordion.open', function () {
  setTimeout(function () {
    $(window).trigger('resize');
  }, 10);
  });

  $('.accordion-snap [data-accordion]').on('accordion.close', function () {
  var el = $(this).find('[data-control]').get(0).getBoundingClientRect().y;
  if (el < 0) {
    $('html,body').animate({
    scrollTop: $(this).offset().top - 0
    }, 200);
  }
  });
}

function fetchDataAndInitializeAccordion() {
fetch(DATA_JSON_URL)
  .then(response => response.json())
  .then(data => {
    enData = data.map(item => item.en);

    // Initially, load only the first 6 items
    const initialData = enData.slice(0, 6);
    populateFAQSection(initialData);
    initializeAccordion();
  });
}


function populateFAQSection(filteredData) {
  let items = '';

  filteredData.forEach(item => {
    items += `
      <div class="box-accordion faq-accordion" data-accordion="data-accordion">
        <div class="box__header fz-h2" data-control>
          ${item.title}
        </div>
        <div class="box-accordion__body" data-content="data-content">
          <div>
            ${item.content}
          </div>
        </div>
      </div>
    `;
  });

  faqGroup.html(items);
}

searchInput.on('keyup', function () {
const searchTerm = searchInput.val().toLowerCase(); 

const filteredData = enData.filter(item => {
  const title = item.title.toLowerCase(); 
  const content = item.content.toLowerCase(); 

  return title.includes(searchTerm) || content.includes(searchTerm);
});

// Render all results if there's a search term; otherwise, limit to 6
if (searchTerm.trim() === '') {
  const initialData = filteredData.slice(0, 6);
  populateFAQSection(initialData);
} else {
  populateFAQSection(filteredData);
}

initializeAccordion();
});



fetchDataAndInitializeAccordion();

// });