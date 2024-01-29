javascript:
var api = "https://api.codetabs.com/v1/proxy?quest=hu.twstats.com/";
var twstats = "/index.php?page=ennoblements&live=live";
var url = api + game_data.world + twstats;
var indexvillage = "index.php?page=village&id=";
var indexplayer = "index.php?page=player&id=";
var indextribe = "index.php?page=tribe&id=";
var screenvillage = "&screen=info_village&id=";
var screenplayer = "&screen=info_player&id=";
var screenally = "&screen=info_ally&id=";
var game = "/game.php?village=";

    $.get(url, function(data) {
        if ($(data).find("tr").hasClass("r1")) {
            table = $(data).find(".widget").eq(1).find("tr");
        } else {
            table = "Ezen a szerveren most nincs élő foglalás.";
        }

        Dialog.show("foglalasok", function(container) {  
            $(`<table class="vis" id="table"><tbody></tbody></table>`).appendTo(container);
            $(table).appendTo("#table > tbody");
        })
        
        $("#table").find("a").each(function(key,val) {
            var value = $(val).attr("href");
            /*village*/
            if ($(val).is(`[href*="${indexvillage}"]`)) {
                $(val).attr("href", value.replace(indexvillage, game + game_data.village.id + screenvillage));
            }
            /*player*/
            if ($(val).is(`[href*="${indexplayer}"]`)) {
                $(val).attr("href", value.replace(indexplayer, game + game_data.village.id + screenplayer));
            }
            /*tribe*/
            if ($(val).is(`[href*="${indextribe}"]`)) {
                $(val).attr("href", value.replace(indextribe, game + game_data.village.id + screenally));
            }
        })
    })
void(0);
