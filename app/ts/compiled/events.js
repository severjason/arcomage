class Events {
    constructor(params, CARDS, canvas, game) {
        this._cards = CARDS;
        this._canvas = canvas;
        this._game = game;
        this._params = params;
        this._cardShakeEventStarted = false;
    }
    get cardShakeEventStarted() {
        return this._cardShakeEventStarted;
    }
    get canvas() {
        return this._canvas;
    }
    get params() {
        return this._params;
    }
    get cards() {
        return this._cards;
    }
    get game() {
        return this._game;
    }
    get playerOne() {
        return this.game.playerOne;
    }
    get playerTwo() {
        return this.game.playerTwo;
    }
    cardShakeOn() {
        this._cardShakeEventStarted = true;
    }
    cardShakeOff() {
        this._cardShakeEventStarted = false;
    }
    init() {
        this.addEvents();
    }
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
                    that.game.playerMoved(playerOne);
                    let basicValue = {
                        "top": cardObject.getTop(),
                        "left": cardObject.getLeft()
                    };
                    cardObject.animate({
                        "top": 100,
                        "left": (that.canvas.width - that.params.cardsValues.width) / 2
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
                                                : reject("Can`t set card active status to false!");
                                        });
                                        eventPromise.then(() => {
                                            that.canvas.fabricElement.renderAll();
                                            Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                                        }).then(() => {
                                            that.game.CPUMove(that.canvas);
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
    discardCard(player, cardName) {
        let that = this;
        let card = this.cards.getSingleCard(cardName);
        let cardObject = this.cards.getCardObject(cardName);
        let playerOne = (player === that.playerOne) ? that.playerOne : that.playerTwo;
        let playerTwo = (player === that.playerOne) ? that.playerTwo : that.playerOne;
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
    addEvents() {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName = this.cards.names[i];
            let cardObject = this.cards.getCardObject(cardName);
            for (let i = 0; i < 6; i++) {
                cardObject.getObjects()[i].on("mousedown", function () {
                    //let player = (that.game.getPlayerTurn(that.playerOne)) ? that.playerOne : that.playerTwo;
                    that.applyCard(that.playerOne, cardName);
                });
            }
            for (let i = 6; i < 8; i++) {
                cardObject.getObjects()[i].on("mousedown", function () {
                    //let player = (that.game.getPlayerTurn(that.playerOne)) ? that.playerOne : that.playerTwo;
                    that.discardCard(that.playerOne, cardName);
                });
            }
        }
    }
}
