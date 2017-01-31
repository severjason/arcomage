/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader:Loader = new Loader();
        loader.initCookie();

        if (loader.cookie.cookiesAreSet()) {
            loader.start(loader.cookie.getPlayerOneName());
        }
        else {
            $("#start_field").show();
        }
        
        $("body").on("click", "#start_game_button", function () {
            let newName:string = $("#player_name_input").val();
            $("#start_field").hide();
            loader.start(newName);
        });

    });
}());

