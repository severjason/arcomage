(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader = new Loader();
        loader.init().then(function (res) {
            loader.events.init();
            let CARDS = loader.cards;
            let game = loader.game;
            let canvas = loader.canvas;
            if (Loader.hideLoader()) {
                game.allotCards(game.firstPlayer);
                game.allotCards(game.secondPlayer);
                game.drawCards(canvas, game.firstPlayer);
                setInterval(function () {
                    //console.log(game.firstPlayer.cards[0].object._objects[0])
                    //game.firstPlayer.cards[0].object._objects[0].trigger("mousedown");
                    //game.allotCards(game.secondPlayer);
                    //game.drawCards(canvas, game.firstPlayer);
                }, 1000);
            }
        });
    });
}());
