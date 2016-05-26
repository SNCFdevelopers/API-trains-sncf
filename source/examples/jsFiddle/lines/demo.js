// Url to retrieve lines available on the coverage
var linesUrl = 'http://vip-jormsim-ws.mutu.prod.canaltp.fr/v1/coverage/sandbox-sncf/lines';

// Call SNCF API
$.ajax({
  type: 'GET',
  url: linesUrl,
  dataType: 'json',
  headers: {
    Authorization: 'Basic ' + btoa('90b19b7f-83c4-46b6-b973-07035afba83e')
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
