javascript:
var selector = "#content_value td:first table:last a",
    hossz = $(selector).length,
    array = [];

function info_ally() {
    $(selector).on("click", function (e) {
        var id = e.target.href.split("id=")[1];
        add_friend(id);
        fade($(this));
        return false;
    })
}

function add_friend(id) {
    $.ajax({
        url: `${game_data.link_base_pure}info_player&id=${id}&action=add_friend&h=${game_data.csrf}`,
        type: 'GET',
        async: true,
        success: function(xml) {},
        error: function(xhr, statusText, error) {}
    })
}

$('<iframe>').attr({
    src: `https://${document.domain}/game.php?village=${game_data.village.id}&screen=map`,
    id: "frameId",
    height: "0",
    width: "0",
    onload: "getObj()"
}).insertBefore("body");

function getObj() {
    obj = frames[0].TWMap.friends;
    $("iframe#frameId").remove();

    for (const property in obj) {
        array.push(property);
    }

    for (var i = 0; i < hossz; i++) {
        friends = $(selector).eq(i).attr("href").split("id=")[1];
        for (var j = 0; j < array.length; j++) {
            if (friends == array[j]) {
                fade($(selector).eq(i));
            }
        }
    }
}

function fade(val) {
    val.fadeTo(0, 0.5);
}

function handleClick(e) {
    var pos = this.coordByEvent(e);
    var x = pos[0];
    var y = pos[1];
    var a = x * 1000 + y;
    var village = TWMap.villages[a];

    if (typeof village != 'undefined') {
        console.log(village.owner);
        var id = village.owner;
        add_friend(id);
        $('img#map_village_' + village.id).fadeTo(0, 0.5);
    }
    return false;
}

function run() {
    if (game_data.screen == "map") {
        TWMap.map._handleClick = handleClick;
    } else {
        info_ally();
    }
}
run();
void(0);
