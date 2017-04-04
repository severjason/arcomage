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
        let difficulty = $("div.difficulty_level.active").data("value");
        $("#start_field").hide();
        loader.start(newName, difficulty);
    });
    body.on("click", "div.difficulty_level", (e) => {
        $("div.difficulty_level").removeClass("active");
        $(e.currentTarget).addClass("active");
    });
    body.on("click", "#sound", () => {
        console.log($("#sound").find("span").toggleClass("glyphicon-volume-up").toggleClass("glyphicon-volume-off"));
    });
    body.on("click", ".newgame_button", () => {
        loader.cookie.removeAll();
        window.location.reload(true);
    });
});
