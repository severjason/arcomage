class Events {
    constructor(params, CARDS, canvas, game) {
        this._cards = CARDS;
        this._canvas = canvas;
        this._game = game;
        this._params = params;
        this._cardShakeEventStarted = false;
    }
    /**
     * Get switcher for card shake
     * @returns {boolean} _cardShakeEventStarted
     */
    get cardShakeEventStarted() {
        return this._cardShakeEventStarted;
    }
    /**
     * Get Canvas class
     * @returns {Canvas} _canvas
     */
    get canvas() {
        return this._canvas;
    }
    /**
     * Get Param class
     * @returns {Param} _params
     */
    get params() {
        return this._params;
    }
    /**
     * Get ArcomageCards class
     * @returns {ArcomageCards} _cards
     */
    get cards() {
        return this._cards;
    }
    /**
     * Get Arcomage class
     * @returns {Arcomage} _game
     */
    get game() {
        return this._game;
    }
    /**
     * Get player One
     * @returns {Player} game.playerOne
     */
    get playerOne() {
        return this.game.playerOne;
    }
    /**
     * Get player two
     * @returns {Player} game.playerTwo
     */
    get playerTwo() {
        return this.game.playerTwo;
    }
    /**
     * Start card shake event
     */
    cardShakeOn() {
        this._cardShakeEventStarted = true;
    }
    /**
     * Stop card shake event
     */
    cardShakeOff() {
        this._cardShakeEventStarted = false;
    }
    /**
     * Attach events
     */
    init() {
        this.addEvents();
    }
    /**
     * Shake card if it is not available
     * @param {string} cardName
     */
    shakeCard(cardName) {
        let that = this;
        let cardObject = this.cards.getCardObject(cardName);
        let cardLeftValue = cardObject.getLeft();
        if (!this.cardShakeEventStarted) {
            that.cardShakeOn();
            cardObject.animate({
                left: cardLeftValue - that.params.cardsValues.padding
            }, {
                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                duration: 100,
                onComplete: function () {
                    cardObject.animate({
                        left: cardLeftValue + that.params.cardsValues.padding
                    }, {
                        onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                        duration: 100,
                        onComplete: function () {
                            cardObject.animate({
                                left: cardLeftValue
                            }, {
                                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                                duration: 100,
                                onComplete: function () {
                                    that.cardShakeOff();
                                }
                            });
                        }
                    });
                }
            });
        }
    }
    /**
     * Apply player`s card by cardName
     * @param {Player} player
     * @param {string} cardName
     */
    applyCard(player, cardName) {
        let that = this;
        let card = this.cards.getSingleCard(cardName);
        let cardObject = this.cards.getCardObject(cardName);
        let playerOne = (player === that.playerOne) ? that.playerOne : that.playerTwo;
        let playerTwo = (player === that.playerOne) ? that.playerTwo : that.playerOne;
        if (that.game.isOn() && that.game.getPlayerTurn(playerOne)) {
            if (!that.cards.cardCanBeUsed(cardName, playerOne)) {
                that.shakeCard(cardName);
            }
            else {
                if (that.game.cardAvailable(cardName, playerOne)) {
                    if (!card.playAgain) {
                        that.game.playerMoved(playerOne);
                    }
                    let basicValue = {
                        "top": cardObject.getTop(),
                        "left": cardObject.getLeft()
                    };
                    cardObject.animate({
                        "top": 100,
                        "left": (that.canvas.width - that.params.cardsValues.width) / 2,
                        "opacity": 1
                    }, {
                        onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                        easing: fabric.util.ease.easeInCubic,
                        duration: 500,
                        onComplete: function () {
                            that.game.applyCard(cardName, playerOne, playerTwo);
                            cardObject.animate({
                                "top": 0,
                                "opacity": 0
                            }, {
                                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                                duration: 500,
                                onComplete: function () {
                                    playerOne.removeCard(card);
                                    cardObject.setTop(basicValue.top);
                                    that.canvas.fabricElement.remove(cardObject);
                                    if (that.game.isOn()) {
                                        let eventPromise = new Promise((resolve, reject) => {
                                            (that.game.allotCards(playerOne))
                                                ? resolve()
                                                : reject("Can`t allot cards!");
                                        });
                                        eventPromise.then(() => {
                                            that.canvas.fabricElement.renderAll();
                                            Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                                        }).then(() => {
                                            if (card.playAgain) {
                                                that.game.drawCards(that.canvas, playerOne);
                                            }
                                            else {
                                                that.game.CPUMove(that.canvas);
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
    }
    /**
     * Discard player`s card by cardName
     * @param {Player} player
     * @param {string} cardName
     */
    discardCard(player, cardName) {
        let that = this;
        let card = this.cards.getSingleCard(cardName);
        let cardObject = this.cards.getCardObject(cardName);
        let playerOne = (player === that.playerOne) ? that.playerOne : that.playerTwo;
        if (that.game.isOn() && that.game.getPlayerTurn(playerOne)) {
            if (that.game.cardAvailable(cardName, playerOne)) {
                that.game.playerMoved(playerOne);
                let cardObjectTop = cardObject.getTop();
                that.cards.deactivate(cardName);
                cardObject.animate({
                    "top": 0,
                    "opacity": 0
                }, {
                    onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                    duration: 500,
                    onComplete: function () {
                        playerOne.removeCard(card);
                        cardObject.setTop(cardObjectTop);
                        that.canvas.fabricElement.remove(cardObject);
                        let eventPromise = new Promise((resolve, reject) => {
                            (that.game.allotCards(playerOne))
                                ? resolve()
                                : reject("Can`t allot cards!");
                        });
                        eventPromise.then(() => {
                            Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                        }).then(() => {
                            that.game.CPUMove(that.canvas);
                        });
                    }
                });
            }
        }
    }
    /**
     * Attach events to all available cards
     */
    addEvents() {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName = this.cards.names[i];
            let cardObject = this.cards.getCardObject(cardName);
            cardObject.on("mouseover", () => {
                cardObject.setOpacity(1);
                that.canvas.fabricElement.renderAll();
            });
            cardObject.on("mouseout", () => {
                cardObject.setOpacity(0.9);
                that.canvas.fabricElement.renderAll();
            });
            for (let i = 0; i < 5; i++) {
                cardObject.getObjects()[i].on("mousedown", () => {
                    that.applyCard(that.playerOne, cardName);
                });
            }
            for (let i = 5; i < 7; i++) {
                cardObject.getObjects()[i].on("mousedown", () => {
                    that.discardCard(that.playerOne, cardName);
                });
            }
        }
    }
}
