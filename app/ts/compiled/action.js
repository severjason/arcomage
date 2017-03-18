var LoaderClass = ArcomageGame.Loader;
$(document).ready(() => {
    let loader = new LoaderClass();
    let body = $("body");
    loader.initCookie();
    if (loader.cookie.cookiesAreSet()) {
        loader.start(loader.cookie.getPlayerOneName());
    }
    else {
        // $("#start_field").show();
        loader.start("Player1");
    }
    body.on("click", "#start_game_button", () => {
        let newName = $("#player_name_input").val();
        $("#start_field").hide();
        loader.start(newName);
    });
    body.on("click", "#clear_cookie_button", () => {
        loader.cookie.removeAll();
        window.location.reload();
    });
});
