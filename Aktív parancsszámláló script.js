javascript:
var rows = $(".table-responsive").find("tr"),
    cellidx = rows.eq(1).find("td").length - 2,
    commands = 0;
for (var i = 1; i < rows.length; i++) {
    commands += Number(rows.eq(i).find("td").eq(cellidx).text());
}
UI.SuccessMessage("Aktív parancsok száma: " + commands,2500)
void(0);
