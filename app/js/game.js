"use strict";

class Arcomage {
    
    constructor(params, cardsObject) {
        this.playerOne = new Player(params.firstPlayerName, params.firstPlayerValues,params.maxValues, params.mainCanvasValues);
        this.playerTwo = new Player(params.secondPlayerName, params.secondPlayerValues, params.maxValues, params.mainCanvasValues);
        this.cardsQuantity = params.cardsQuantity;
        this.cards = cardsObject;
    }

    get firstPlayer() {
        return this.playerOne;
    }

    get secondPlayer() {
        return this.playerTwo;
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







