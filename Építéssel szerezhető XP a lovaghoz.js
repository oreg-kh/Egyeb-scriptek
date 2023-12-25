javascript:
var buildings = $("#buildings").find("tr");
for (var i = 0; i < buildings.length; i++) {
        if (i == 0) {
                text = "Szerezhető XP";
                $("#buildings").find("tr").eq(i).append('<th>'+text+'</th>');
        } else {
                wood = Number($("#buildings").find("tr").eq(i).find(".cost_wood").text());
                stone = Number($("#buildings").find("tr").eq(i).find(".cost_stone").text());
                iron = Number($("#buildings").find("tr").eq(i).find(".cost_iron").text());
                xp = (wood + stone + iron) / 2;
                $("#buildings").find("tr").eq(i).append('<td>'+xp+'</td>');
        }
}
void(0);
