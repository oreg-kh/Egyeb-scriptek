javascript:
var text = $('#message').text().replace(/- \[report\]/g,"[Spoiler][Report_display]").replace(/\[\/report\]/g,"[/Report_display][/Spoiler]").replace(/^.*\n/, "").trim();
$('#message').text(text).select();
document.execCommand("Copy");
UI.InfoMessage("A jelentések a vágólapra másolva!",3000);
void(0);
