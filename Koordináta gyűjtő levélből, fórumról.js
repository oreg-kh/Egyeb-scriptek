javascript:
$(".village_anchor a").on("click", function(event) {
    console.log(event.currentTarget.innerText.match(/\d+\|\d+/g));
    coord = event.currentTarget.innerText.match(/\d+\|\d+/g);
    $('textarea#scriptused_coords').val($('textarea#scriptused_coords').val() + coord + "\n");
    $(this).fadeTo(0, 0.5);
    return false;
})

function select() {
    $("#scriptused_coords").select();
}

var content = `<textarea id="scriptused_coords" cols="23" rows="15" onclick="select()"></textarea>`;
$("#header_info").after(content);
void(0);
