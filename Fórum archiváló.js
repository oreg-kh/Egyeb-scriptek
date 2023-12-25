javascript:
      var newline = "\n\n",
          topic_name = $(".forum-content.clearfix").find("h2").text(),
          server = game_data.world,
          page_number = $(".clearfix").find("strong").last().text(),
          page_numbers = (page_number == "") ? "1" : page_number.slice(2, -2),
          textarea = '<textarea id="scriptused_text" cols="90" rows="15"></textarea>',
          comments = "";
      $('.spoiler').find('span').css('display', 'all').show();
      $(".postheader_left").each(function (key, val) {
            var name = $(val)[0].innerText;
            var text = $(".text")[key].innerText;
            var comment = '[table][**]' + name + '[/**]' + newline + '[*]' + text + '[/table]';
            comments += comment;
      });
      $('h2:eq(0)').after(textarea);
      $('textarea#scriptused_text').val('[size=12][b]' + server + ": " + topic_name + '[/b][/size]' + newline + comments + newline + '[i]' + page_numbers + ". oldal[/i]").select();
      $("#scriptused_text").width($("#forum_box").eq(0).width());
void(0);
