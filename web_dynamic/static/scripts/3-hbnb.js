const $ = window.$;
window.addEventListener('DOMContentLoaded', (event) => {
  // clear checkbox in page reload
  $('input[type="checkbox"]').each(function () {
    $(this).prop('checked', false);
  });
  const amenityDict = {};
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/')
    .done(function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    })
    .fail(function () {
      $('#api_status').removeClass('available');
    });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    error: function (e) {
      console.log(e);
    },
    success: function (response) {
      for (const place of response) {
        $('SECTION.places').append(
          '<ARTICLE>' +
          '<div class= "title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night +
          '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') +
          '</div>' +
          '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') +
          '</div>' +
          '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') +
          '</div>' +
          '</div>' +
          '<div class="user">' +
          '<div class="description">' + place.description + '</div>' +
          '</ARTICLE>'
        );
      }
    },
    dataType: 'json',
    contentType: 'application/json'
  });
});
