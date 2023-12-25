javascript:
      var area = $("#simple_message"),
          text = area.val();
      text = text.replace(/Kém/gim, "[unit]spy[/unit]").replace(/Kos/gim, "[unit]ram[/unit]").replace(/FN/gim, "[unit]snob[/unit]").replace(/Bárdos/gim, "[unit]axe[/unit]").replace(/Kard/gim, "[unit]sword[/unit]").replace(/KLov/gim, "[unit]light[/unit]").replace(/NLov/gim, "[unit]heavy[/unit]"); area.val(text);
void(0);
