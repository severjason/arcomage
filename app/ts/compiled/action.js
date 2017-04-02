"use strict";
var LoaderClass = ArcomageGame.Loader;
$(document).ready(() => {
    let loader = new LoaderClass();
    let body = $("body");
    loader.initCookie();
    if (loader.cookie.cookiesAreSet()) {
        loader.start(loader.cookie.getPlayerOneName());
    }
    else {
        $("#start_field").show();
    }
    body.on("click", "#start_game_button", () => {
        let newName = $("#player_name_input").val();
        let difficulty = $("#game_difficulty").val();
        $("#start_field").hide();
        loader.start(newName, difficulty);
    });
    body.on("click", "#sound", () => {
        console.log($("#sound").find("span").toggleClass("glyphicon-volume-up").toggleClass("glyphicon-volume-off"));
    });
    body.on("click", ".newgame_button", () => {
        loader.cookie.removeAll();
        window.location.reload(true);
    });
});
