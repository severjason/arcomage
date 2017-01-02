(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader = new Loader();
        loader.init().then(function (res) {
            loader.events.init();
            let CARDS = loader.cards;
            let game = loader.game;
            let canvas = loader.canvas;
            if (Loader.hideLoader()) {
                game.allotCards(game.playerOne);
                game.allotCards(game.playerTwo);
                game.drawCards(canvas, game.playerOne);
                setInterval(function () {
                    //console.log(game.playerOne.cards[0].object._objects[0])
                    //game.playerOne.cards[0].object._objects[0].trigger("mousedown");
                    //game.allotCards(game.playerTwo);
                    //game.drawCards(canvas, game.playerOne);
                }, 1000);
            }
        });
    });
}());
