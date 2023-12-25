javascript:
      var names = "",
          bb_code = "";
      $("td#content_value .vis").find('tr').not(':first').each(function (key, val) {
            if ($(val).find('td').not(':first').find('img').attr("title") == "új") {
                  names += $(val).find('td:first').find('a').not(':first').text() + ";";
                  bb_code += '[player]' + $(val).find('td:first').find('a').not(':first').text() + '[/player]' + "\n";
            }
      });
      $("h2").first().after('<textarea id="scriptused_text" cols="90" rows="15"></textarea>');
      $('textarea#scriptused_text').val(names + "\n\n" + bb_code);
      $("#scriptused_text").width($("#content_value").find("h2").width());
void(0);
