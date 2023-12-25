javascript:
      var tema = "teszt levél",
          koszones = "Hali,",
          uzenet = "Ez egy teszt üzenet, kérlek ne válaszolj rá.",
          elkoszones = "Üdvözlettel: öreg";
      $("[name=subject]").val(tema);
      $("#message").val(koszones + "\n\n" + uzenet + "\n\n" + elkoszones);
void(0);
