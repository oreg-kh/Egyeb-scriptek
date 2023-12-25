javascript:
      if (document.URL.match("screen=overview_villages&mode=prod")) {
            var faProd = 0,
                agyagProd = 0,
                vasProd = 0,
                faInc = 0,
                agyagInc = 0,
                vasInc = 0,
                raktar = 0,
                url = "https://" + window.location.host + "/game.php?village="+ game_data.village.id + "&screen=overview_villages&mode=trader&type=inc";
            $.ajax({
                  success: function () {
                        $.get(url, function(data) {
                              $(data).find("#trades_table .nowrap").each(function (key, val) {
                                    if ($(val).find(".icon.header.wood").length) {
                                          faInc += Number($(val).text().replace(".",""));
                                    }
                                    if ($(val).find(".icon.header.stone").length) {
                                          agyagInc += Number($(val).text().replace(".",""));
                                    }
                                    if ($(val).find(".icon.header.iron").length) {
                                          vasInc += Number($(val).text().replace(".",""));
                                    }
                              });
                        })
                        $.ajax({
                              success: function () {
                                    $("#production_table .nowrap").each(function (key, val) {
                                          faProd += Number($(val).find(".res.wood,.warn_90.wood,.warn.wood").text().replace(".",""));
                                          agyagProd += Number($(val).find(".res.stone,.warn_90.stone,.warn.stone").text().replace(".",""));
                                          vasProd += Number($(val).find(".res.iron,.warn_90.iron,.warn.iron").text().replace(".",""));
                                    });
                                    function numberWithCommas(x) {
                                          var parts = x.toString().split(".");
                                          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                                          return parts.join(".");
                                    }
                                    $("#production_table .nowrap").each(function (key, val) {
                                          raktar += Number($(val).find("td").eq(4).text());
                                    });
                                    var fa = (faInc+faProd)/raktar*100,
                                        agyag = (agyagInc+agyagProd)/raktar*100,
                                        vas = (vasInc+vasProd)/raktar*100;
                                    alert("Úton lévő(beérkező) nyersanyag:" +'\n'+ "Fa: " + numberWithCommas(faInc) + "   Agyag: " + numberWithCommas(agyagInc) + "   Vas: " + numberWithCommas(vasInc) +'\n'+'\n'+ "Raktárban lévő nyersanyag:" +'\n'+ "Fa: " + numberWithCommas(faProd) + "   Agyag: " + numberWithCommas(agyagProd) + "   Vas: " + numberWithCommas(vasProd) +'\n'+'\n'+ "Összes nyersanyag:" +'\n'+ "Fa: " + numberWithCommas(faInc+faProd) + "   Agyag: " + numberWithCommas(agyagInc+agyagProd) + "   Vas: " + numberWithCommas(vasInc+vasProd) +'\n'+'\n'+ "Összes raktár: " + numberWithCommas(raktar) +'\n'+ "Fa: " + numberWithCommas(fa.toFixed(2) + "%") + "   Agyag: " + numberWithCommas(agyag.toFixed(2) + "%") + "   Vas: " + numberWithCommas(vas.toFixed(2) + "%") +'\n'+'\n'+ "Author: öreg");
                              }
                        })
                  }         
            });
      } else {
            alert("A script csak az Áttekintés / Termelés nézetben működik, most átirányítunk oda!");
            self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=prod");
      };
void(0);
