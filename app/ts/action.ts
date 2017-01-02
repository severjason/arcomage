(function () {
    document.addEventListener("DOMContentLoaded", function () {

        let loader:Loader = new Loader();
        loader.init().then(function (res) {
            loader.events.init();
            let CARDS:ArcomageCards = loader.cards;
            let game:Arcomage = loader.game;
            let canvas:any = loader.canvas;

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
                /*canvas.fabricElement.add(CARDS.getCardObject("amethyst"));
                canvas.fabricElement.add(CARDS.getCardObject("great_wall"));
                canvas.fabricElement.add(CARDS.getCardObject("werewolf"));
                canvas.fabricElement.add(CARDS.getCardObject("new_equipment"));
                 canvas.fabricElement.add(CARDS.getCardObject("earthquake"));*/

                /*document.addEventListener("click", function () {
                 game.applyCard("amethyst", game.playerTwo, game.playerOne);
                    canvas.fabricElement.renderAll();
                 console.log(game.playerTwo);
                 });*/

                /*game.applyCard("new_equipment", game.playerOne, game.playerTwo);
                 game.allotCards(game.playerOne);
                 game.allotCards(game.playerTwo);
                 game.applyCard("new_equipment", game.playerOne, game.playerTwo);
                 game.applyCard("werewolf", game.playerOne, game.playerTwo);
                 game.applyCard("werewolf", game.playerOne, game.playerTwo);*/
            }
        });
    });
}());

