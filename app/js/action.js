"use strict";

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var loader = new Loader();
        loader.init().then(function (res) {

            let CARDS = loader.cards;
            let game = loader.game;
            let canvas = loader.canvas;


            canvas.fabricElement.add(CARDS.getCardObject("amethyst"));
            canvas.fabricElement.add(CARDS.getCardObject("great_wall"));
            canvas.fabricElement.add(CARDS.getCardObject("werewolf"));
            canvas.fabricElement.add(CARDS.getCardObject("new_equipment"));
            canvas.fabricElement.add(CARDS.getCardObject("earthquake"));

            document.addEventListener("click", function () {
                game.applyCard("werewolf", game.secondPlayer, game.firstPlayer);
                canvas.fabricElement.renderAll();
                console.log(game.firstPlayer);
            });

            /*game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);
             game.allotCards(game.firstPlayer);
             game.allotCards(game.secondPlayer);
             game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);
             game.applyCard("werewolf", game.firstPlayer, game.secondPlayer);
             game.applyCard("werewolf", game.firstPlayer, game.secondPlayer);*/
        });

    });
}());

