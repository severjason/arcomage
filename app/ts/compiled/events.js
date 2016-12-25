class Events {
    constructor(params, CARDS, canvas, game) {
        this._cards = CARDS;
        this._canvas = canvas;
        this._game = game;
        this._params = params;
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
    get firstPlayer() {
        return this.game.firstPlayer;
    }
    get secondPlayer() {
        return this.game.secondPlayer;
    }
    init() {
        this.addEvents();
    }
    shakeCard(cardName) {
        let that = this;
        let cardObject = this.cards.getCardObject(cardName);
        let cardLeftValue = cardObject.getLeft();
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
                            duration: 100
                        });
                    }
                });
            }
        });
    }
    addEvents() {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName = this.cards.names[i];
            let card = this.cards.getSingleCard(cardName);
            let cardObject = this.cards.getCardObject(cardName);
            let applyCard = () => {
                if (that.game.firstPlayerTurn) {
                    if (!that.cards.cardCanBeUsed(cardName, that.game.firstPlayer)) {
                        that.shakeCard(cardName);
                    }
                    else {
                        if (that.cards.isActive(cardName)) {
                            that.game.firstPlayerMoved();
                            let basicValue = {
                                "top": cardObject.getTop(),
                                "left": cardObject.getLeft()
                            };
                            that.cards.deactivate(cardName);
                            cardObject.animate({
                                "top": 100,
                                "left": (that.canvas.width - that.params.cardsValues.width) / 2
                            }, {
                                onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                                easing: fabric.util.ease.easeInCubic,
                                duration: 500,
                                onComplete: function () {
                                    that.game.applyCard(cardName, that.game.firstPlayer, that.game.secondPlayer);
                                    cardObject.animate({
                                        "top": 0,
                                        "opacity": 0
                                    }, {
                                        onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                                        duration: 500,
                                        onComplete: function () {
                                            that.canvas.fabricElement.remove(cardObject);
                                            that.firstPlayer.removeCard(card);
                                            cardObject.setTop(basicValue.top);
                                            let eventPromise = new Promise((resolve, reject) => {
                                                (that.game.allotCards(that.firstPlayer))
                                                    ? resolve()
                                                    : reject("Can`t set card active status to false!");
                                            });
                                            eventPromise.then(() => {
                                                that.game.drawCards(that.canvas, that.game.firstPlayer);
                                            }).then(() => {
                                                that.game.updateResources(that.firstPlayer.sources, that.secondPlayer.sources);
                                                that.canvas.fabricElement.renderAll();
                                                that.game.secondPlayerMoved();
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            };
            let discardCard = () => {
                if (that.game.firstPlayerTurn) {
                    if (that.cards.isActive(cardName)) {
                        that.game.firstPlayerMoved();
                        let cardObjectTop = cardObject.getTop();
                        that.cards.deactivate(cardName);
                        cardObject.animate({
                            "top": 0,
                            "opacity": 0
                        }, {
                            onChange: that.canvas.fabricElement.renderAll.bind(that.canvas.fabricElement),
                            duration: 500,
                            onComplete: function () {
                                that.canvas.fabricElement.remove(cardObject);
                                that.firstPlayer.removeCard(card);
                                cardObject.setTop(cardObjectTop);
                                let eventPromise = new Promise((resolve, reject) => {
                                    (that.game.allotCards(that.firstPlayer))
                                        ? resolve()
                                        : reject("Can`t set card active status to false!");
                                });
                                eventPromise.then(() => {
                                    that.game.drawCards(that.canvas, that.game.firstPlayer);
                                    that.game.secondPlayerMoved();
                                });
                            }
                        });
                    }
                }
            };
            for (let i = 0; i < 6; i++) {
                cardObject._objects[i].on("mousedown", applyCard);
            }
            for (let i = 6; i < 8; i++) {
                cardObject._objects[i].on("mousedown", discardCard);
            }
        }
    }
}
