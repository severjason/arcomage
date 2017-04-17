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
        $("#start-field").show();
    }
    body.on("click", "#start-game-button", () => {
        let newName = $("#player-name-input").val();
        let difficulty = $("button.difficulty-level.active").data("value");
        $("#start-field").hide();
        loader.start(newName, difficulty);
    });
    body.on("click", "button.difficulty-level", (e) => {
        $("button.difficulty-level").removeClass("active");
        $(e.currentTarget).addClass("active");
    });
    body.on("click", ".newgame-button", () => {
        loader.cookie.removeAll();
        window.location.reload(true);
    });
});
