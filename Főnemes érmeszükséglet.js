javascript:
function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(".");
}
var fonemes_korlat = prompt("Adj meg egy tetszőleges főnemes-korlátot és eredményül megkapod a hozzá szükséges aranyérmék számát.");
var number = Number(fonemes_korlat);
try {
        if (isNaN(number) == true || fonemes_korlat == "" || number < 0 || Number.isInteger(BigInt(number))) {
                UI.ErrorMessage("Csak pozitív egész szám adható meg.", 5000);
        } else if (!fonemes_korlat) {
        } else {
                UI.SuccessMessage(numberWithCommas(number) + " főnemeshez " + numberWithCommas([number * (number + 1)] / 2) + " érmét szükséges veretni.", 10000);
        }
} catch (error) {
        UI.ErrorMessage("Csak pozitív egész szám adható meg.", 5000);
        console.log(error);
}
void(0);
