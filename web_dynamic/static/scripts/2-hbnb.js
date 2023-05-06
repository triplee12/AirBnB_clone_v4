const $ = window.$;
window.addEventListener('DOMContentLoaded', (event) => {
  const amenityDict = {};
  $('input[type=checkbox]').change(function () {
    if (this.checked) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });
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
