javascript:
var text = {
    url1:"https://api.codetabs.com/v1/proxy?quest=hu.twstats.com/",
    url2:"/index.php?page=ennoblements&live=live"
};
var url = text.url1 + game_data.world + text.url2;
$("<div>").load(url+" #main", function(responseTxt,statusTxt,xhr){
    if ($(responseTxt).find("tr").hasClass("r1")) {
        table = $(responseTxt).find(".widget").first();
    } else {
        table = "Ezen a szerveren most nincs élő foglalás.";
    }
    Dialog.show("foglalasok", table, function() {UI.SuccessMessage("Jó játékot :)")}),
    $("#popup_box_foglalasok").css("width","fit-content");
    $("#popup_box_foglalasok").find(".widget").find("a").each(function(key, val) {
        var value = $(val).attr("href");
        /*village*/
        if ($(val).is('[href*="index.php?page=village&id="]')) {
            $(val).attr('href', value.replace("index.php?page=village&id=", "/game.php?village=" + game_data.village.id + "&screen=info_village&id="));
        }
        /*player*/
        if ($(val).is('[href*="index.php?page=player&id="]')) {
            $(val).attr('href', value.replace("index.php?page=player&id=", "/game.php?village=" + game_data.village.id + "&screen=info_player&id="));
        }
        /*tribe*/
        if ($(val).is('[href*="index.php?page=tribe&id="]')) {
            $(val).attr('href', value.replace("index.php?page=tribe&id=", "/game.php?village=" + game_data.village.id + "&screen=info_ally&id="));
        }
    });
});
void(0);
