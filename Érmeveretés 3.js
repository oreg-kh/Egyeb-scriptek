javascript:
        try {
                var coints = $("#coin_mint_fill_max").text().match(/\d+/)[0];
                if (coints > 1) {
                        $("#coin_mint_count").val(coints - 1);
                        $(".btn-default").trigger("click");
                } else {
                        UI.SuccessMessage("Az utolsó érme szükséges a script működéséhez, nem fogja leveretni.",5000);
                }
        } catch (error) {
                UI.ErrorMessage("Figyelj rá, hogy mindig legyen legalább 1 verethető érme, különben nem frissül a darabszáma, mikor megérkezik a nyersanyag a faluba.", 10000);
                console.log(error);
        }
void(0);
