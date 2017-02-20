/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

(function () {
    $(document).ready(()=> {
        let loader:Loader = new Loader();
        loader.initCookie();
        
        if (loader.cookie.cookiesAreSet()) {
            loader.start(loader.cookie.getPlayerOneName());
        }
        else {
            //$("#start_field").show();
            loader.start("Player1");
        }
        
        $("body").on("click", "#start_game_button", function () {
            let newName:string = $("#player_name_input").val();
            $("#start_field").hide();
            loader.start(newName);
        });

        $("body").on("click", "#clear_cookie_button", function () {
            loader.cookie.removeAll();
            window.location.reload();
        });

    });
}());

