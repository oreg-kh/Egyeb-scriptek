javascript:
var fakeScriptCoords;
while (fakeScriptCoords == null) fakeScriptCoords = prompt("Illeszd be a fake script koordinátáit:");

var coords = fakeScriptCoords.replace(/,/g,"|").split(" ");
var deletedItems = [];
var newList = "";

function fade() {
    $("body").append('<div id="fader">');
    $("#fader").css({"position":"fixed","height":"100%","width":"100%","background-color":"black","top":"0px","left":"0px","opacity":"0.6","z-index":"12000"});
}

function openLoader() {
    $('body').append('<div id="loader"><img src="graphic/throbber.gif" height="24" width="24"></img></div>');
    $("#loader").css({"position":"fixed","top":"50%","left":"50%","z-index":"13000"});
}

$(".lit-item a").click(function(event) {
    id = event.currentTarget.href.split("id=")[1];
    fade();
    openLoader();
    $.ajax({
        type: "GET",
        url: `https://api.codetabs.com/v1/proxy?quest=hu.twstats.com/${game_data.world}/index.php?page=tribe&mode=export_villages&id=${id}&export=1`,
        data: "exporttype=custom&continent=&custom=%25x%7C%25y",
        async: true,
        success: function(data) {
            $("#loader").remove();
            $("#fader").remove();
            twStatsCoords = $(data).find("textarea").val().split("\n");
            for (var i = 0; i < coords.length; i++) {
                for (var j = 0; j < twStatsCoords.length; j++) {
                    if (coords[i] == twStatsCoords[j]) {
                        deletedItems.push(coords[i]);
                        coords.splice(i, 1);
                    }
                }
            }

            for (var i = 0; i < coords.length; i++) {
                newList += coords[i] + " ";
            }

            content = `
                <title>Koordináta összehasonlító - <created by öreg></title>
                <p>Új lista:</p>
                <br>
                <div id="newList">${String(newList)}</div>
                <br>
                <br>
                <p>Törölt koordináták:</p>
                <div id="deletedItems">${String(deletedItems)}</div>
            `;
            var win = window.open("about:blank", "öreg", "width=460,height=730,scrollbars=yes");
            win.onload = function() {
                $(win.document).find("body").append(content);
                $(win.document).find("body").css({"background-color":"#fbf3df","font-size":"9pt","font-family":"Verdana, Arial"});
            }
        }
    });

    return false;
});
void(0);
