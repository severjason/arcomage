class Arcomage {
    constructor(params, cards) {
        this._playerOne = new Player(params.playerOneName, params.playerOneValues, params.maxValues, params.mainCanvasValues);
        this._playerTwo = new Player(params.playerTwoName, params.playerTwoValues, params.maxValues, params.mainCanvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
        this._params = params;
        this._playerOneTurn = true;
        this._playerTwoTurn = false;
    }
    get params() {
        return this._params;
    }
    get playerOne() {
        return this._playerOne;
    }
    get playerOneTurn() {
        return this._playerOneTurn;
    }
    get playerTwo() {
        return this._playerTwo;
    }
    get playerTwoTurn() {
        return this._playerTwoTurn;
    }
    getPlayerTurn(player) {
        return (player === this.playerOne) ? this.playerOneTurn : this.playerTwoTurn;
    }
    get cardsValues() {
        return this._params.cardsValues;
    }
    get cards() {
        return this._cards;
    }
    get cardsQuantity() {
        return this._cardsQuantity;
    }
    playerOneMoved() {
        this._playerOneTurn = false;
        this._playerTwoTurn = true;
    }
    playerTwoMoved() {
        this._playerTwoTurn = false;
        this._playerOneTurn = true;
    }
    playerMoved(player) {
        return (player === this.playerOne) ? this.playerOneMoved() : this.playerTwoMoved();
    }
    applyCard(cardName, player, enemy) {
        this.cards.getSingleCard(cardName).action(player, enemy);
        this.cards.deactivate(cardName);
    }
    allotCards(player) {
        let cardsNames = this.cards.names;
        for (let i = 0; player.cards.length < this.cardsQuantity; i++) {
            let random = Math.floor(Math.random() * (cardsNames.length));
            let randomCard = this.cards.getSingleCard(cardsNames[random]);
            if (!this.cards.isActive(cardsNames[random])) {
                this.cards.activate(cardsNames[random]);
                player.updateCards(randomCard);
            }
            else
                this.allotCards(player);
        }
        return true;
    }
    static clearCardsFromCanvas(canvas, player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject = player.cards[i].object;
            canvas.fabricElement.remove(playerCardObject);
        }
    }
    drawCards(canvas, player) {
        let that = this;
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject = player.cards[i].object;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (that.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
    }
    updateResources(playerOneSources, playerTwoSources) {
        let sources = Object.keys(this.params.relations);
        let newResourcesPlayerOne = {};
        let newResourcesPlayerTwo = {};
        for (let i = 0; i < sources.length; i++) {
            newResourcesPlayerOne[this.params.relations[sources[i]]] = playerOneSources[sources[i]];
            newResourcesPlayerTwo[this.params.relations[sources[i]]] = playerTwoSources[sources[i]];
        }
        this.playerOne.updateResources(newResourcesPlayerOne);
        this.playerTwo.updateResources(newResourcesPlayerTwo);
    }
}
