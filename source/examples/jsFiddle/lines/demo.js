// Url to retrieve lines available on the coverage
var linesUrl = 'https://api.sncf.com/v1/coverage/sandbox-sncf/lines';

// Call SNCF API
$.ajax({
  type: 'GET',
  url: linesUrl,
  dataType: 'json',
  headers: {
    Authorization: 'Basic ' + btoa('sandbox-token')
  },
  success: displayLines,
  error: function(xhr, textStatus, errorThrown) {
    alert('Error: ' + textStatus + ' ' + errorThrown);
  }
});

/**
 * Displays lines with their colors and names.
 *
 * @param {Object} result
 */
function displayLines(result) {
  $('pre').html(linesUrl);

  var $ul = $('ul#lines');

  $.each(result.lines, function (i, line) {
  	var $li = $('<li>');

    $li.html('('+line.network.name+' '+line.commercial_mode.name+') '+line.name);

    $ul.append($li);
  });
}
