/**
 * This exemple display an example of journey from Paris Gare de Lyon to Cannes.
 */

var sandboxToken = 'e8581787-4ac0-492d-b21e-8dfed0db59ff';
var from = 'stop_area:SNF:SA:PARISMONT';
var to = 'stop_area:SNF:SA:NANTES';

$.ajax({
  type: 'GET',
  url: 'http://navitia2sim-ws.mutu.production.canaltp.fr/v1/coverage/sandbox/journeys?from='+from+'&to='+to,
  dataType: 'json',
  headers: {
    Authorization: 'Basic ' + btoa(sandboxToken)
  },
  success: function(result) {
    displayJourney(result.journeys[0]);
    $("#raw-result").html(pretty.json.prettyPrint(result));
  },
  error: function(xhr, textStatus, errorThrown) {
    $("#raw-result").html('Error: ' + textStatus + ' ' + errorThrown);
  }
});


function displayJourney(journey) {
  var $tbody = $('tbody');

  $.each(journey.sections, function(index, section) {
    var $tr = $('<tr>');

    $tr.append($('<td>').html(index));
    $tr.append($('<td>').html(formatHour(section.departure_date_time)));
    $tr.append($('<td>').html(formatHour(section.arrival_date_time)));
    $tr.append($('<td>').html(section.from && section.from.name));
    $tr.append($('<td>').html(section.to && section.to.name));
    $tr.append($('<td>').html(section.mode));
    $tr.append($('<td>').html(section.type));
    $tr.append($('<td>').html(section.display_informations && section.display_informations.physical_mode));
    $tr.append($('<td>').html(section.display_informations && section.display_informations.code));

    $tbody.append($tr);
  });
}

function formatHour(navitiaDate) {
  return navitiaDate.substr(9).match(/.{2}/g).join(':');
}

if (!pretty)
  var pretty = {};

pretty.json = {
  replacer: function(match, pIndent, pKey, pVal, pEnd) {
    var key = '<span class=json-key>';
    var val = '<span class=json-value>';
    var str = '<span class=json-string>';
    var r = pIndent || '';
    if (pKey)
      r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
    if (pVal)
      r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
    return r + (pEnd || '');
  },
  prettyPrint: function(obj) {
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    return JSON.stringify(obj, null, 3)
      .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(jsonLine, pretty.json.replacer);
  }
};
