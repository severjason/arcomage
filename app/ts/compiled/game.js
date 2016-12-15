class Arcomage {
    constructor(params, cards) {
        this._playerOne = new Player(params.firstPlayerName, params.firstPlayerValues, params.maxValues, params.mainCanvasValues);
        this._playerTwo = new Player(params.secondPlayerName, params.secondPlayerValues, params.maxValues, params.mainCanvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
    }
    get firstPlayer() {
        return this._playerOne;
    }
    get secondPlayer() {
        return this._playerTwo;
    }
    applyCard(cardName, player, enemy) {
        this._cards.getSingleCard(cardName).action(player, enemy);
        //this.CARDS[cardName].isActive = false;
    }
    allotCards(player) {
        let cardsNames = this._cards.names;
        for (let i = 0; player.cards.length < this._cardsQuantity; i++) {
            let random = Math.floor(Math.random() * (cardsNames.length));
            let randomCard = this._cards.getSingleCard(cardsNames[random]);
            if (!randomCard.isActive) {
                randomCard.isActive = true;
                player.updateCards(randomCard);
            }
            else
                this.allotCards(player);
        }
    }
}
