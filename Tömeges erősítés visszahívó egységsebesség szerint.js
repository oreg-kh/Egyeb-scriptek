javascript:
function run() {
    $("img").on("click", function(event) {
        if (event.currentTarget.id == "OK") {
            event.currentTarget.style.border = "";
            event.currentTarget.id = "";
            var array = [];
            for (var i = 0; i < game_data.units.length; i++) {
                if ($("#units_table").find("img").eq(i).attr("id") == "OK") {
                    array.push("OK");
                } else {
                    array.push("NOK");
                }
            }
        } else {
            event.currentTarget.style.border = "2px solid #000000";
            event.currentTarget.id = "OK";
            var array = [];
            for (var i = 0; i < game_data.units.length; i++) {
                if ($("#units_table").find("img").eq(i).attr("id") == "OK") {
                    array.push("OK");
                } else {
                    array.push("NOK");
                }
            }
        }
        console.log(array);
        removeButtons();
        createButtons();
    })
}

function createButtons() {
    $('*[id*=label_text_]').each(function(key, val) {
        var unit_id = $(val).find("input").attr("value");
        var form = "";
        for (var i = 0; i < game_data.units.length; i++) {
            if ($("#units_table").find("img").eq(i).attr("id") == "OK") {
                form += game_data.units[i] + "=" + $('*[id*=label_text_]').parent().parent().eq(key).find("td").eq(i+2).text() + "&";
            } else {
                form += game_data.units[i] + "=&";
            }
        }
        form = form + "h=" + csrf_token;
        village_id = val.id.match(/\d+/)[0];
        console.log(village_id, unit_id, form);
        $('*[id*=label_text_]').parent().parent().eq(key).find("td").last().append('<button type="button" class="but" onclick="withdraw(' + village_id + ',' + unit_id + ',\'' + form +'\')">Visszahív</button>');
    });
}

function removeButtons() {
    for (var i = 0; i < $(".but").length; i++) {
        $(".but").remove();
    }
}

function reloadUnits() {
    $.ajax({
        type: "GET",
        url: document.URL,
        success: function(data) {
            items = $(".unit-item");
            for (var i = 0; i < items.length; i++) {
                var x = $(data).find(".unit-item").eq(i).text();
                $(".unit-item").eq(i).text(x);
            }
        }
    });
}

function withdraw(village_id,unit_id,form) {
    $.ajax({
        type: "POST",
        url: `https://${document.domain}/game.php?village=${village_id}&screen=place&action=back&unit_id=${unit_id}&mode=units`,
        data: /*$("form").serialize()*/form,
        success: function(response) {
            $('#DisplayDiv').html(response);
            reloadUnits();
        }
    });
}
run();
void(0);
