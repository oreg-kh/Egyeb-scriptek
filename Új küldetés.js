//Fő küldetések:
javascript:Questlines.showDialog(0, 'main-tab');void(0)

//Klánküldetések:
javascript:Questlines.showDialog(101, 'main-tab');void(0)

//Jutalmak:
javascript:
Dialog.fetch("quest", "new_quests", {
    ajax: "quest_popup",
    tab: "main-tab",
    quest: "0"
}, function() {
    $(".quest-popup-body .tab:eq(0)").removeClass("active-tab");    
    $("#reward-tab").addClass("active-tab");
    Questlines.init()
});
void(0);

//Mentorküldetések:
javascript:Questlines.showDialog(100, 'main-tab');void(0)
