(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader = new Loader();
        loader.init().then(function () {
            loader.events.init();
            let game = loader.game;
            let canvas = loader.canvas;
            if (Loader.hideLoader()) {
                game.allotCards(game.playerOne);
                game.allotCards(game.playerTwo);
                game.drawCards(canvas, game.playerOne);
            }
        });
    });
}());
