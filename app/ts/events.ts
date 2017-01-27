class Events {

    private _cards:ArcomageCards;
    private _canvas:Canvas;
    private _game:Arcomage;
    private _params:Param;
    private _cardShakeEventStarted:boolean;

    constructor(params:Param, CARDS:ArcomageCards, canvas:Canvas, game:Arcomage) {
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
    get cardShakeEventStarted():boolean {
        return this._cardShakeEventStarted;
    }

    /**
     * Get Canvas class
     * @returns {Canvas} _canvas
     */
    get canvas():Canvas {
        return this._canvas;
    }

    /**
     * Get Param class
     * @returns {Param} _params
     */
    get params():Param {
        return this._params;
    }

    /**
     * Get ArcomageCards class
     * @returns {ArcomageCards} _cards
     */
    get cards():ArcomageCards {
        return this._cards;
    }

    /**
     * Get Arcomage class
     * @returns {Arcomage} _game
     */
    get game():Arcomage {
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
    init():void {
        this.addEvents();
    }

    /**
     * Shake card if it is not available
     * @param {string} cardName
     */
    private shakeCard(cardName:string):void {
        let that = this;
        let cardObject:IGroup = this.cards.getCardObject(cardName);
        let cardLeftValue:number = cardObject.getLeft();
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
    private applyCard(player:Player, cardName:string):void {
        let that = this;
        let card:any = this.cards.getSingleCard(cardName);
        let cardObject:IGroup = this.cards.getCardObject(cardName);

        let playerOne:Player = (player === that.playerOne) ? that.playerOne : that.playerTwo;
        let playerTwo:Player = (player === that.playerOne) ? that.playerTwo : that.playerOne;
        if (that.game.isOn() && that.game.getPlayerTurn(playerOne)) {
            if (!that.cards.cardCanBeUsed(cardName, playerOne)) {
                that.shakeCard(cardName);
            }
            else {
                if (that.game.cardAvailable(cardName, playerOne)) {
                    that.game.playerMoved(playerOne);
                    let basicValue:any = {
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
                                        let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                                            (that.game.allotCards(playerOne))
                                                ? resolve()
                                                : reject("Can`t set card active status to false!");
                                        });
                                        eventPromise.then(() => {
                                            that.canvas.fabricElement.renderAll();
                                            Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                                        }).then(()=> {
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

    /**
     * Discard player`s card by cardName
     * @param {Player} player
     * @param {string} cardName
     */
    private discardCard(player:Player, cardName:string):void {
        let that = this;
        let card:any = this.cards.getSingleCard(cardName);
        let cardObject:IGroup = this.cards.getCardObject(cardName);

        let playerOne:Player = (player === that.playerOne) ? that.playerOne : that.playerTwo;
        if (that.game.isOn() && that.game.getPlayerTurn(playerOne)) {
            if (that.game.cardAvailable(cardName, playerOne)) {
                that.game.playerMoved(playerOne);
                let cardObjectTop:number = cardObject.getTop();
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
                        let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                            (that.game.allotCards(playerOne))
                                ? resolve()
                                : reject("Can`t allot cards!");
                        });
                        eventPromise.then(() => {
                            Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                        }).then(()=> {
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
    private addEvents():void {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName:string = this.cards.names[i];
            let cardObject:IGroup = this.cards.getCardObject(cardName);

            for (let i = 0; i < 6; i++) {
                cardObject.getObjects()[i].on("mousedown", function () {
                    that.applyCard(that.playerOne, cardName);
                });
            }
            for (let i = 6; i < 8; i++) {
                cardObject.getObjects()[i].on("mousedown", function () {
                    that.discardCard(that.playerOne, cardName);
                });
            }
        }
    }
}
