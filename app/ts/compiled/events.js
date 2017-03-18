class Events {
    constructor(params, CARDS, canvas, game) {
        this.cardsObject = CARDS;
        this.canvasObject = canvas;
        this.gameObject = game;
        this.paramsObject = params;
        this.cardShakeEventStatus = false;
    }
    /**
     * Get switcher for card shake
     * @returns {boolean} cardShakeEventStatus
     */
    get cardShakeEventStarted() {
        return this.cardShakeEventStatus;
    }
    /**
     * Get Canvas class
     * @returns {Canvas} canvasObject
     */
    get canvas() {
        return this.canvasObject;
    }
    /**
     * Get Param class
     * @returns {Param} paramsObject
     */
    get params() {
        return this.paramsObject;
    }
    /**
     * Get ArcomageCards class
     * @returns {ArcomageCards} cardsObject
     */
    get cards() {
        return this.cardsObject;
    }
    /**
     * Get Arcomage class
     * @returns {Arcomage} gameObject
     */
    get game() {
        return this.gameObject;
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
        this.cardShakeEventStatus = true;
    }
    /**
     * Stop card shake event
     */
    cardShakeOff() {
        this.cardShakeEventStatus = false;
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
                left: cardLeftValue - that.params.cardsValues.padding,
            }, {
                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                duration: 100,
                onComplete: () => {
                    cardObject.animate({
                        left: cardLeftValue + that.params.cardsValues.padding,
                    }, {
                        onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                        duration: 100,
                        onComplete: () => {
                            cardObject.animate({
                                left: cardLeftValue,
                            }, {
                                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                                duration: 100,
                                onComplete: () => {
                                    that.cardShakeOff();
                                },
                            });
                        },
                    });
                },
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
                        top: cardObject.getTop(),
                        left: cardObject.getLeft(),
                    };
                    cardObject.animate({
                        top: 100,
                        left: (that.canvas.width - that.params.cardsValues.width) / 2,
                        opacity: 1,
                    }, {
                        onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                        easing: fabric.util.ease.easeInCubic,
                        duration: 500,
                        onComplete: () => {
                            that.game.applyCard(cardName, playerOne, playerTwo);
                            cardObject.animate({
                                top: 0,
                                opacity: 0,
                            }, {
                                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                                duration: 500,
                                onComplete: () => {
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
                                },
                            });
                        },
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
                    top: 0,
                    opacity: 0,
                }, {
                    onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                    duration: 500,
                    onComplete: () => {
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
                    },
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
            for (let j = 0; j < 5; j++) {
                cardObject.getObjects()[j].on("mousedown", () => {
                    that.applyCard(that.playerOne, cardName);
                });
            }
            for (let k = 5; k < 7; k++) {
                cardObject.getObjects()[k].on("mousedown", () => {
                    that.discardCard(that.playerOne, cardName);
                });
            }
        }
    }
}
