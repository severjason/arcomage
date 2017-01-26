class Arcomage {
    constructor(params, cards) {
        this._playerOne = new Player(params.playerOneName, params.playerOneValues, params.maxValues, params.canvasValues);
        this._playerTwo = new Player(params.playerTwoName, params.playerTwoValues, params.maxValues, params.canvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
        this._params = params;
        this._playerOneTurn = true;
        this._playerTwoTurn = false;
        this._status = true;
        this._CPU_AI = new CPU_AI(this._playerTwo, cards, params);
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
    get CPU_AI() {
        return this._CPU_AI;
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
    get status() {
        return this._status;
    }
    gameOver() {
        this._status = false;
    }
    isOn() {
        return this.status;
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
        (player === this.playerOne) ? this.playerOneMoved() : this.playerTwoMoved();
    }
    highlightActivePlayer(player) {
        let playerOne = (player === this.playerOne) ? this.playerOne : this.playerTwo;
        let playerTwo = (player === this.playerOne) ? this.playerTwo : this.playerOne;
        playerOne.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.activeFillColor);
        playerTwo.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.fillColor);
    }
    applyCard(cardName, player, enemy) {
        this.cards.getSingleCard(cardName).action(player, enemy);
        this.cards.deactivate(cardName);
        if (player.towerLife === this.params.maxValues.tower || enemy.towerLife === 0)
            this.gameOver();
    }
    cardAvailable(cardName, player) {
        if (this.cards.isActive(cardName)) {
            let switcher = false;
            for (let i = 0; i < player.cards.length; i++) {
                if (this.cards.getSingleCard(cardName) === player.cards[i]) {
                    switcher = true;
                }
            }
            return switcher;
        }
        else
            return false;
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
    clearCPUBackOfCards(canvas) {
        for (let i = 0; i < this.playerTwo.cards.length; i++) {
            let playerCardObject = this.playerTwo.cards[i].backObject;
            canvas.fabricElement.remove(playerCardObject);
        }
    }
    CPUMove(canvas) {
        let that = this;
        that.drawBackOfCards(canvas, that.playerTwo);
        that.CPU_AI.move(canvas, that).then(() => {
            let eventPromise = new Promise((resolve, reject) => {
                (that.allotCards(that.playerTwo))
                    ? resolve()
                    : reject("Can`t allot cards!");
            });
            eventPromise.then(() => {
                that.clearCPUBackOfCards(canvas);
            }).then(() => {
                that.updateResources(that.playerOne.sources, that.playerTwo.sources);
                that.drawCards(canvas, that.playerOne);
            });
        });
    }
    drawBackOfCards(canvas, player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject = player.cards[i].backObject;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (this.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
        this.highlightActivePlayer(player);
        canvas.fabricElement.renderAll();
    }
    drawCards(canvas, player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject = player.cards[i].object;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (this.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
        this.highlightActivePlayer(player);
        canvas.fabricElement.renderAll();
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
