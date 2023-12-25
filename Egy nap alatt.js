javascript:
var htmlContent = `<table align="center">
    <tr>
        <td>
            <label for="sablon">Egy nap alatt: </label>
            <select id="sablon">
                <option></option>
                <option value="kill_att">Legyőzött egységek támadóként</option>
                <option value="kill_def">Legyőzött egységek védőként</option>
                <option value="kill_sup">Legyőzött egységek támogatóként</option>
                <option value="loot_res">Farmolt nyersanyagok</option>
                <option value="loot_vil">Kifosztott falvak</option>
                <option value="scavenge">Összegyűjtött nyersanyagok</option>
                <option value="conquer">Meghódított falvak</option>
            </select>
        </td>
    </tr>
</table>`;

function getData(text) {
    $.get(`${game_data.link_base_pure}ranking&mode=in_a_day&type=${text}&name=${game_data.player.name}`,function(data,status,xhr) {
        UI.SuccessMessage($(data).find("#content_value").find("b").text(),5000);
    })
}

function popup() {        
    Dialog.show('öreg-popup', function(container) {
        $(htmlContent).appendTo(container);
        select();
    });
}

function select() {
    $("#sablon").on("change", function(event) {
        var option = event.currentTarget.selectedOptions[0].value;
        getData(option);
    })
}

popup()
void(0);
