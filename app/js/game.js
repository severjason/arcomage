"use strict";

class Arcomage {

    constructor(player1 = "Player", player2 = "CPU" , cardsQuantity, cardsObject) {
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
        this.cardsQuantity = cardsQuantity;
        this.cards = cardsObject;
    }

    get firstPlayer() {
        return this.player1;
    }

    get secondPlayer() {
        return this.player2;
    }

    applyCard(cardName, player, enemy) {
        this.cards.getSingleCard(cardName).action(player, enemy);
        //this.CARDS[cardName].isActive = false;
    }

    allotCards(player) {
        let cardsNames = this.cards.names;
        
        for (let i = 0; player.cards.length < this.cardsQuantity; i++) {
            let random  = Math.floor(Math.random() * (cardsNames.length));
            let randomCard = this.cards.getSingleCard(cardsNames[random]);

            if (!randomCard.isActive) {
                randomCard.isActive = true;
                player.updateCards(randomCard);
            }
            else this.allotCards(player);
        }
    }

}

let game = new Arcomage("Player", "CPU", 2, CARDS);

game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);

game.allotCards(game.firstPlayer);
//game.allotCards(game.secondPlayer);
game.applyCard("new_equipment", game.firstPlayer, game.secondPlayer);






