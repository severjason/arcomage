(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader:Loader = new Loader();
        loader.init().then(function () {
            loader.events.init();
            let game:Arcomage = loader.game;
            let canvas:any = loader.canvas;
            if (Loader.hideLoader()) {
                game.allotCards(game.playerOne);
                game.allotCards(game.playerTwo);
                game.drawCards(canvas, game.playerOne);
            }
        });
    });
}());

