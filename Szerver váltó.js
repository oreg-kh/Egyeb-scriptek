javascript:
var WorldSwitch = {
    submit_login: function(e) {
        return $server_select_list = $("#server_select_list"),
        $server_select_list.attr("action", $server_select_list.attr("action") + "&" + e),
        $server_select_list.submit(),
        !1
    }
}

TribalWars.get("api", {
    ajax: "world_switch",
    village: game_data.village.id
}, function(e) {
    $("#mobileHeader").append(e.html);
    $("#server_select_list").css({
       "display": "flex",
       "justify-content": "center"
    })
})
void(0);
