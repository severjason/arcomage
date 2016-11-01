"use strict";

class Arcomage {



    constructor(player = "Player") {
        this.player = new Player(player);
        this.CPU = new Player("CPU");

        this.CARDS_QUANTITY = 2;
    }

    static applyCard(cardName, player, enemy) {
        CARDS[cardName].action(player, enemy);
        CARDS[cardName].active = true;
    }

    static allotCards(player) {
        if (player.getCards().length < this.CARDS_QUANTITY) {

            let randomCard  = Math.floor(Math.random() * (getCardsNames().length));

            if (!CARDS[getCardsNames()[randomCard]].isActive) {
                CARDS[getCardsNames()[randomCard]].isActive = true;
                player.updateCards(CARDS[getCardsNames()[randomCard]]);
            }
            else this.allotCards(player);

        }

    }

}

let game = new Arcomage();



Arcomage.applyCard("new_equipment", game.player, game.CPU);

Arcomage.allotCards(game.player);
Arcomage.allotCards(game.player);
console.log(game.player);
//Arcomage.allotCards(game.CPU);




