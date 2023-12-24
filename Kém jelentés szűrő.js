javascript:
function getPage(id, pages) {
    if (id < pages) {
        UI.SuccessMessage(id + 1 + "/" + pages,1000);
        var report_id = $(`#report_list`).find("input").eq(id).attr("name").replace("id_","");
        console.log(report_id);
        TribalWars.get("report", {
            ajax: "view",
            id: report_id
        }, function(data) {
            if (data.dialog.includes("attack_spy_away")) {
                s = data.dialog.trim();
                spear = parseInt($(s).find(".unit-item-spear").last().text());
                sword = parseInt($(s).find(".unit-item-sword").last().text());
                axe = parseInt($(s).find(".unit-item-axe").last().text());
                archer = parseInt($(s).find(".unit-item-archer").last().text());
                spy = parseInt($(s).find(".unit-item-spy").last().text());
                light = parseInt($(s).find(".unit-item-light").last().text());
                marcher = parseInt($(s).find(".unit-item-marcher").last().text());
                heavy = parseInt($(s).find(".unit-item-heavy").last().text());
                ram = parseInt($(s).find(".unit-item-ram").last().text());
                catapult = parseInt($(s).find(".unit-item-catapult").last().text());
                knight = parseInt($(s).find(".unit-item-knight").last().text());
                snob = parseInt($(s).find(".unit-item-snob").last().text());

                if(!game_data.units.includes("archer")) {
                    archer = 0;
                    marcher = 0;
                }

                sum = spear + sword + axe + archer + spy + light + marcher + heavy + ram + catapult + knight + snob;

                if (sum > 0) {
                    $(`#report_list`).find("input").eq(id).prop('checked', true);
                }
            }
            setTimeout(function() {
                sum = 0;
                getPage(id + 1, pages);
            }, 500);
        })
    } else {
        UI.SuccessMessage("A jelentések válogatása elkészült.",2500);
    }
}
getPage(0, totalPages());

function totalPages() {
    return $(`#report_list`).find("input").length - 1;
}
void(0);
