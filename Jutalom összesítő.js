javascript:
var sumiron = 0;
var sumstone = 0;
var sumwood = 0;
var $iron = 0;
var $stone = 0;
var $wood = 0;
var i = 1;

TribalWars.post("new_quests", {ajax: "claim_rewards_all"}, {building: "place"}, function(object) {

    for (const key in object.rewards) {
       
        $iron += object.rewards[key].reward.iron;
        $stone += object.rewards[key].reward.stone;
        $wood += object.rewards[key].reward.wood;
    }
   
    for (const key in object.rewards_all) {
   
        iron = object.rewards_all[key].iron;
        stone = object.rewards_all[key].stone;
        wood = object.rewards_all[key].wood;
       
        sumiron += iron;
        sumstone += stone;
        sumwood += wood;
       
        $(`#reward-system-rewards > tr:nth-child(${i})`).append(`<td><span class="icon header wood"></span>${wood}</td>`);
        $(`#reward-system-rewards > tr:nth-child(${i})`).append(`<td><span class="icon header stone"></span>${stone}</td>`);
        $(`#reward-system-rewards > tr:nth-child(${i})`).append(`<td><span class="icon header iron"></span>${iron}</td>`);
        i++;
    }

    $("#claimable-rewards > thead > tr").append(`<th colspan="3" style="white-space: nowrap">Összes jutalom:</th>`);
   
    $("#reward-system-rewards").append(`
        <tr class="border">
            <td></td><td></td>
            <td><span class="icon header wood"></span>${$wood}</td>
            <td><span class="icon header stone"></span>${$stone}</td>
            <td><span class="icon header iron"></span>${$iron}</td>
            <td></td><td></td>
            <td><span class="icon header wood"></span>${sumwood}</td>
            <td><span class="icon header stone"></span>${sumstone}</td>
            <td><span class="icon header iron"></span>${sumiron}</td>
        </tr>
    `);
})

function initCss(css) {
    $(`<style>${css}</style>`).appendTo("body");
}

initCss(`
    tr.border td{
        border-top: double;
    }
`);
void(0);
