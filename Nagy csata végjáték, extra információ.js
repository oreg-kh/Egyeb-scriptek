javascript:
var title = [
    "Koordináták",
    "Falu_pontok",
    "Játékosok",
    "Klánok",
    "Védekezés_módosító",
    "Napi_befolyás_pontok"
];

function sending(a) {
    $(".siege-has-tooltip").each(function (key, val){
        text = $.parseHTML($(".siege-has-tooltip")[key].tooltipText)[1].childNodes[1].children[a].nextSibling.nextSibling.childNodes[3].innerText;
        $(".siege-bonus").eq(key).text(text);
    })
}

$(title).each(function (key, val){
    $(".vis.modemenu").append(`<input type="radio" id=${title[key]} /><label for="scriptused">${title[key]}</label><br/><input`);
    $(`input#${val}`).on("click", function() {
        for (var i = 0; i < title.length; i++) {
            if (key != i) {
                $(`#${title[i]}`).prop("checked", false);
            }
        }
        sending(key);
    })
})
void(0);
