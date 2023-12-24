javascript:
    $(".village_anchor").click(function(event) {
        var id = event.currentTarget.dataset.id;
        $(this).fadeTo(0, 0.5);
        getInfo(id);
        return false;
    });

    function getInfo(id) {
        console.log(id);
        $.get(`${game_data.link_base_pure}info_village&id=${id}`, function(data, status){
            if (!$("#group_popup").is(":visible")) {
                $("body").append(`
                    <div id="group_popup" class="popup_style ui-draggable" style="width: 320px; position: fixed; top: 101px; left: 554px; display: block;">
                        <div id="group_popup_menu" class="popup_menu ui-draggable-handle">Csapatmozgások<a id="closelink_group_popup" onclick="$('#group_popup').remove()" href="#">X</a></div>
                        <div id="group_popup_content" class="popup_content" style="height: 380px; overflow-y: auto;"></div>
                        <div id="group_popup_oreg" style="height:50px;background-color:white;overflow:auto" contenteditable="true" ondblclick="document.execCommand('selectAll',false,null)"></div>
                    </div>
                `);
                UI.Draggable($("#group_popup"));
            }
            $("#group_popup_content").html("");
            $("#group_popup_content").append($(data).find("#commands_outgoings, #commands_incomings"));
            Timing.tickHandlers.timers.initTimers("widget-command-timer");
        })
    }
void(0);
