(function () {
    document.addEventListener("DOMContentLoaded", function () {

        let loader:Loader = new Loader();
        loader.init().then(function (res) {
            loader.events.init();
            let CARDS:ArcomageCards = loader.cards;
            let game:Arcomage = loader.game;
            let canvas:any = loader.canvas;

            if (Loader.hideLoader()) {

                canvas.fabricElement.add(CARDS.getCardObject("amethyst"));
                canvas.fabricElement.add(CARDS.getCardObject("great_wall"));
                canvas.fabricElement.add(CARDS.getCardObject("werewolf"));
                canvas.fabricElement.add(CARDS.getCardObject("new_equipment"));
                canvas.fabricElement.add(CARDS.getCardObject("earthquake"));

                /*document.addEventListener("click", function () {
                    game.applyCard("amethyst", game.secondPlayer, game.firstPlayer);
                    canvas.fabricElement.renderAll();
                    console.log(game.secondPlayer);
                 });*/

                /*game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);
                 game.allotCards(game.firstPlayer);
                 game.allotCards(game.secondPlayer);
                 game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);
                 game.applyCard("werewolf", game.firstPlayer, game.secondPlayer);
                 game.applyCard("werewolf", game.firstPlayer, game.secondPlayer);*/
            }
        });
    });
}());

