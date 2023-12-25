javascript:
      if (document.URL.match("mode=build")) {
            function build() {
                  if ($(".btn-instant-free").length) {
                        eval($(".btn-instant-free").attr("onclick").replace(/return /, ""));
                  } else if (game_data.village.buildings.place == 0) {
                        BuildingMain.destroy('place');
                  } else {
                        changePage();
                  }
            }
            build();
      }
      if (document.URL.match("mode=destroy")) {
            function destroy() {
                  if ($(".btn-instant-free").length) {
                        eval($(".btn-instant-free").attr("onclick").replace(/return /, ""));
                  } else if (game_data.village.buildings.place > 0) {
                        BuildingMain.destroy('place');
                  } else {
                        changePage();
                  }
            }
            destroy();
      }
      function changePage() {
            if (document.URL.match("mode=build")) {
                  self.location = game_data.link_base_pure.replace(/screen\=\w*/i,"screen=main&mode=destroy")
            } else if (document.URL.match("mode=destroy")) {
                  self.location = game_data.link_base_pure.replace(/screen\=\w*/i,"screen=main&mode=build")
            }
      }
void(0);
