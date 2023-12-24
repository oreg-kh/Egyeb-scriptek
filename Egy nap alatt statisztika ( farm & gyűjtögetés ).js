javascript:
var array = [];
function select() {
    var buttons = [{
        text: "Farmolt nyersanyagok",
        callback: function() {change("loot_res")}
    }, {
        text: "Összegyűjtött nyersanyagok",
        callback: function() {change("scavenge")}
    }];
    UI.ConfirmationBox("Kattints valamelyik gombra a folytatáshoz!", buttons, "", true);
}
select()

function change(val) {
    array.push(val);
    if (array[0] == "loot_res") {
        name = "Farmolt nyersanyagok";
    } else {
        name = "Összegyűjtött nyersanyagok";
    }
    createHeader(`
        <th>${name}</th>
    `);
}

function createMessage(type,message,time) {
    UI[type](message,time);
}

function createContent(val) {
    $("#content_value td:first table:last").append(val);
}

createContent(`
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>Összesen:</td>
        <td id="sum"></td>
    </tr>
`);

function createHeader(val) {
    $("#content_value td:first table:last").find("tr").first().append(val);
}

function fade(val) {
    $(val).fadeTo(0, 0.5);
}

$("#content_value td:first table:last a").on("click", function (e) {
    var player = e.target.innerText.trim();
    var url = `https://${document.location.host}/game.php?screen=ranking&mode=in_a_day&type=${array[0]}&name=${player}`;

    $.get(url, function(data, status) {
        var selector = $(data).find("#in_a_day_ranking_table").find("tr");

        for (var i = 0; i < selector.length; i++) {
            var name = selector.eq(i).find("td").eq(1).text().trim();
            var point = selector.eq(i).find("td").eq(3).text().trim();
            if (selector.eq(1).find("td").prop("colspan") == 5) {
                point = 0;
                $(e.target.parentElement.parentElement).append('<td class="points">'+ point +'</td>');
                break;
            } else {
                if (name == player) {
                    $(e.target.parentElement.parentElement).append('<td class="points">'+ point +'</td>');
                }
            }
        }
        var points = $(".points");
        var sum = 0;
        for (var i = 0; i < points.length; i++) {
             sum += parseInt(points.eq(i).text().replace(/\./g, ""));
        }
        $("#sum").text(sum);
    });
    fade(this)
    return false;
})
void(0);
