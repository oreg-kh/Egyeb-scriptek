javascript:
var villages = parseInt($("#villages_list > thead > tr > th:nth-child(1)").text().match(/\d+/)[0]);
var coords = "";
var alapertelmezes = {
    bbkodos: 'igen',
    ujsor: 'igen',
    elvalaszt: ","
};

function getPlayer() {
    return "[player]" + $("#player_info").find("tr").first().text().trim() + "[/player]" + "\n\n"
}

// tribe
function getTribe() {
    if (InfoPlayer.player_id != game_data.player.id) {
        return "[ally]" + $("#player_info").find("a").last().text().trim() + "[/ally]" + "\n\n";
    } else {
        return "[ally]" + $("#player_info").find("a").not(":last").text().trim() + "[/ally]" + "\n\n";
    }
}

// bb code
function bb_code(coord) {
    if (alapertelmezes.bbkodos == "igen") {
        return `[coord]${coord}[/coord]`;
    } else {
        return `${coord}`;
    }
}

// new line
function new_line(coord) {
    if (alapertelmezes.ujsor == "igen") {
        return `${coord}\n`;
    } else {
        return `${coord} `;
    }
}

function change(coord) {
    return coord.replace("|", alapertelmezes.elvalaszt);
}

function addTooltip() {
    if (game_data.player.id) {
        VillageContext.init();
        UI.ToolTip('.tooltip');
    }
}

function getCoords() {
    $("table#villages_list > tbody > tr").each(function(key, val) {
        coords += new_line(change(bb_code($(val).text().match(/\d+\|\d+/g))));
    });
}

function createTextarea() {
    $('h2:eq(0)').after('<textarea id="scriptused_text" cols="90" rows="15"></textarea>');
    addCoordsToTextarea();
    makeItPretty();
}

function addCoordsToTextarea() {
    $('textarea#scriptused_text').val(getPlayer() + getTribe() + coords);
}

function makeItPretty() {
    $("#scriptused_text").width($("h2").width());
}

function removeDisplay() {
    $('#villages_list > tbody > tr:last').remove();
}

function appendData(data) {
    $('#villages_list > tbody').append(data.villages);
}

function run() {
    if (villages > 100) {
        $.get(`/game.php?village=${game_data.village.id}&screen=info_player&ajax=fetch_villages&player_id=${InfoPlayer.player_id}`, {}, function(data) {
            removeDisplay();
            appendData(data);
            addTooltip();
            getCoords();
            createTextarea();
        }, 'json');
    } else {
        getCoords();
        createTextarea();
    }
}
run()
void(0);
