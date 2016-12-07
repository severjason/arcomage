"use strict";

class Arcomage {
    
    constructor(playersValues, canvasValues, cardsQuantity, cardsObject) {
        this.playerOne = new Player(playersValues.firstPlayerName, playersValues.firstPlayerValues,playersValues.maxValues, canvasValues);
        this.playerTwo = new Player(playersValues.secondPlayerName, playersValues.secondPlayerValues, playersValues.maxValues, canvasValues);
        this.cardsQuantity = cardsQuantity;
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







