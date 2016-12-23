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
    addEvents() {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName = this.cards.names[i];
            let card = this.cards.getSingleCard(cardName);
            let cardObject = this.cards.getCardObject(cardName);
            cardObject.on("mousedown", function () {
                if (that.cards.cardCanBeUsed(cardName, that.game.firstPlayer) && that.game.firstPlayerTurn) {
                    that.game.firstPlayerMoved();
                    let basicValue = {
                        "top": cardObject.top,
                        "left": cardObject.left
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
                                    //cardObject.setLeft(-1000); // stupid hack
                                    let eventPromise = new Promise((resolve, reject) => {
                                        (that.game.allotCards(that.firstPlayer))
                                            ? resolve()
                                            : reject("Can`t set card active status to false!");
                                    });
                                    eventPromise.then(() => {
                                        that.game.drawCards(that.canvas);
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
            });
        }
    }
}
