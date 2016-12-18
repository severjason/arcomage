(function () {
    document.addEventListener("DOMContentLoaded", function () {
        let loader = new Loader();
        loader.init().then(function (res) {
            loader.events.init();
            let CARDS = loader.cards;
            let game = loader.game;
            let canvas = loader.canvas;
            if (Loader.hideLoader()) {
                canvas.fabricElement.add(CARDS.getCardObject("amethyst"));
                canvas.fabricElement.add(CARDS.getCardObject("great_wall"));
                canvas.fabricElement.add(CARDS.getCardObject("werewolf"));
                canvas.fabricElement.add(CARDS.getCardObject("new_equipment"));
                canvas.fabricElement.add(CARDS.getCardObject("earthquake"));
            }
        });
    });
}());
