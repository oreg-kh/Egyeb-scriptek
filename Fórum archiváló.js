javascript:
var finaltext = "";
var post = 0;
var textarea = '<textarea id="scriptused_text" cols="90" rows="15"></textarea>';
var url = "forum&screenmode=view_thread&thread_id=1&answer=true&quote_id=";

function getPlayersInformation(id) {
	return $.ajax({url: `${game_data.link_base_pure + url + id}`, type: 'GET', async: false});
}

async function comment() {
    var postheaderleft = $(".postheader_left").eq(post).find("a").text().trim();
    var tribe = postheaderleft.split(" - ")[0];
    var name = postheaderleft.split(" - ")[1];
    var date = $(".igmline-date").eq(post).text().trim();
    var id = $(".post").eq(post++).find("a").attr("name");
    var data = await getPlayersInformation(id);
    var message = $(data).find("#message").text().trim();
    var text = message.replace(/(\[.*?\])/, "").replace(/\[[^\][]*]$/, "");
    finaltext += `[table][**][ally]${tribe}[/ally] - [player]${name}[/player]  ${date}[/**][/table]${text }`;

    setTimeout(() => {
        if(post < $(".post").length) {
            comment();
        } else {
            $("#forum_box").before(textarea);
            $("textarea#scriptused_text").val(finaltext).select();
            $("#scriptused_text").width($("#forum_box").eq(0).width());
            console.log(finaltext);
        }
    }, 200);
}

comment()
void(0);
