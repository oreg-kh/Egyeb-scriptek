javascript:
TribalWars.get("api", {
    ajax: "get_inventory",
    screen: "inventory",
}, function(responseText) {
    var sum = 0;
    for (var key in responseText.inventory) {
        if (key.includes("1000")) {
            sum += parseInt(responseText.inventory[key].amount) * 10;
        }
        if (key.includes("1001")) {
            sum += parseInt(responseText.inventory[key].amount) * 10;
        }
        if (key.includes("1002")) {
            sum += parseInt(responseText.inventory[key].amount) * 5;
        }
        if (key.includes("1003")) {
            sum += parseInt(responseText.inventory[key].amount) * 10;
        }
        if (key.includes("1004")) {
            sum += parseInt(responseText.inventory[key].amount) * 15;
        }
        if (key.includes("1005")) {
            sum += parseInt(responseText.inventory[key].amount) * 20;
        }
        if (key.includes("1006")) {
            sum += parseInt(responseText.inventory[key].amount) * 30;
        }
        if (key.includes("1007")) {
            sum += parseInt(responseText.inventory[key].amount) * 40;
        }
        if (key.includes("1008")) {
            sum += parseInt(responseText.inventory[key].amount) * 50;
        }
        if (key.includes("1009")) {
            sum += parseInt(responseText.inventory[key].amount) * 100;
        }
        if (key.includes("1010")) {
            sum += parseInt(responseText.inventory[key].amount) * 1;
        }
        if (key.includes("1011")) {
            sum += parseInt(responseText.inventory[key].amount) * 2;
        }
        if (key.includes("1012")) {
            sum += parseInt(responseText.inventory[key].amount) * 3;
        }
        if (key.includes("1013")) {
            sum += parseInt(responseText.inventory[key].amount) * 4;
        }
        if (key.includes("1014")) {
            sum += parseInt(responseText.inventory[key].amount) * 6;
        }
        if (key.includes("1015")) {
            sum += parseInt(responseText.inventory[key].amount) * 7;
        }
        if (key.includes("1016")) {
            sum += parseInt(responseText.inventory[key].amount) * 8;
        }
        if (key.includes("1017")) {
            sum += parseInt(responseText.inventory[key].amount) * 9;
        }
        if (key.includes("1018")) {
            sum += parseInt(responseText.inventory[key].amount) * 60;
        }
        if (key.includes("1019")) {
            sum += parseInt(responseText.inventory[key].amount) * 70;
        }
        if (key.includes("1020")) {
            sum += parseInt(responseText.inventory[key].amount) * 80;
        }
        if (key.includes("1021")) {
            sum += parseInt(responseText.inventory[key].amount) * 90;
        }
    }
    UI.SuccessMessage(`A leltárban ${sum}% Nyersanyag csomag található.`,3000);
});
void(0);
