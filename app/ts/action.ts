/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader:Loader = new Loader();

        $("body").on("click", "#start_game_button", function () {
            let newName:string = $("#player_name_input").val();
            $("#start_field").hide();
            loader.start(newName);
        });
    });
}());

