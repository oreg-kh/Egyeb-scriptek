javascript:
      var units = game_data.units.length,
          villageData = {"troops": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};

            $(".unit-item").each(function (key, val) {
                  if (key < units) {
                        villageData.troops[key] += parseInt($(val).text());
                  } else {
                        villageData.troops[key % units] += parseInt($(val).text());
                  }
            });
      $(".row_marker").find("tr").hide();
      $("#units_table > tbody:last").append("<td class='customEmoji'></td>");
      $("#units_table > tbody:last").append("<td class='customEmoji'>Összesen:</td>");

      for (var i = 0; i < units; i++) {
            $("#units_table > tbody:last").append("<td class='customEmoji'>"+villageData.troops[i]+"</td>");
      }
void(0);
