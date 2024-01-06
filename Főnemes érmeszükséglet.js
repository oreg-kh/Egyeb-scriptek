javascript:
(function () {
    let buttonCancel = {
        text: "Bezár",
        callback: () => {},
        cancel: true
    };
    let message = `
        <p style="font-size:14px">Adj meg egy tetszőleges főnemes-korlátot és eredményül megkapod a hozzá szükséges aranyérmék számát.</p>
        <input id="noble_value" maxlength="4" oninput=calculate(this.value) style="width: 40px;" type="number" value="">`
        window.UI.ConfirmationBox(message, [buttonCancel], "coin_calculator", true, true);
})()
function calculate(val) {
    if (val != "") {
        $("#cointext").remove();
        var noble = parseInt(val);
        var coin = [noble * (noble + 1)] / 2;
        $("input#noble_value").after(`<p id="cointext" style="font-size:14px"><b>${noble} főnemeshez ${coin} érmét szükséges veretni.</b></p>`);
    }
}
void(0);
