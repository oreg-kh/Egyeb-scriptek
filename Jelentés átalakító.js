javascript:
      var szoveg = $('#message').text().replace(/- \[report\]/g,"[Spoiler][Report_display]").replace(/\[\/report\]/g,"[/Report_display][/Spoiler]").replace("Továbbított jelentések:", "").trim();
      $('#message').text(szoveg).select();
      document.execCommand("Copy");
      UI.InfoMessage("A jelentések a vágólapra másolva! <br> Author: öreg",3000);
void(0);
