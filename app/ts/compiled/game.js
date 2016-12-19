class Arcomage {
    constructor(params, cards) {
        this._playerOne = new Player(params.firstPlayerName, params.firstPlayerValues, params.maxValues, params.mainCanvasValues);
        this._playerTwo = new Player(params.secondPlayerName, params.secondPlayerValues, params.maxValues, params.mainCanvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
        this._params = params;
    }
    get firstPlayer() {
        return this._playerOne;
    }
    get secondPlayer() {
        return this._playerTwo;
    }
    get cardsValues() {
        return this._params.cardsValues;
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
        return true;
    }
    drawCards(canvas) {
        let that = this;
        for (let i = 0; i < that.firstPlayer.cards.length; i++) {
            let playerCard = that.firstPlayer.cards[i];
            let playerCardObject = playerCard.object;
            playerCardObject.left = (that.cardsValues.width + 2 * this.cardsValues.padding) * i;
            canvas.fabricElement.add(playerCardObject);
            canvas.fabricElement.renderAll();
        }
    }
}
