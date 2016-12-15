(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var loader = new Loader();
        loader.init().then(function (res) {
            let CARDS = loader.cards;
            let game = loader.game;
            let canvas = loader.canvas;
            if (Loader.hideLoader()) {
                canvas.fabricElement.add(CARDS.getCardObject("amethyst"));
                canvas.fabricElement.add(CARDS.getCardObject("great_wall"));
                canvas.fabricElement.add(CARDS.getCardObject("werewolf"));
                canvas.fabricElement.add(CARDS.getCardObject("new_equipment"));
                canvas.fabricElement.add(CARDS.getCardObject("earthquake"));
                document.addEventListener("click", function () {
                    game.applyCard("new_equipment", game.secondPlayer, game.firstPlayer);
                    canvas.fabricElement.renderAll();
                    console.log(game.secondPlayer);
                });
            }
        });
    });
}());
