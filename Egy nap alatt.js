//Legyőzött egységek támadóként:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=kill_att&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);

//Legyőzött egységek védőként:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=kill_def&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);

//Legyőzött egységek támogatóként:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=kill_sup&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);

//Farmolt nyersanyagok:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=loot_res&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);

//Kifosztott falvak:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=loot_vil&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);

//Összegyűjtött nyersanyagok:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=scavenge&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);

//Meghódított falvak:
javascript:
$.ajax({
    url: `${game_data.link_base_pure}ranking&mode=in_a_day&type=conquer&name=${game_data.player.name}`,
    type: 'GET',
    async: true,
    success: function(xml) {
        UI.SuccessMessage($(xml).find("#content_value > table > tbody > tr > td:nth-child(2) > p:nth-child(4) > b").text(),5000);
    },
    error: function(xhr, statusText, error) {}
})
void(0);
