"use strict";

loader.init().then(function (res) {

    let CARDS = loader.cards;
    let game = loader.game;
    let canvas = loader.canvas;

    canvas.fabricElement.add(CARDS.all["amethyst"].object);
    canvas.fabricElement.add(CARDS.all["great_wall"].object);
    canvas.fabricElement.add(CARDS.all["werewolf"].object);
    canvas.fabricElement.add(CARDS.all["new_equipment"].object);



    /*
     game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);
     game.allotCards(game.firstPlayer);
     //game.allotCards(game.secondPlayer);
     game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);*/
});

