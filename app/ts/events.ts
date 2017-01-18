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

    get cardShakeEventStarted():boolean {
        return this._cardShakeEventStarted;
    }

    get canvas():Canvas {
        return this._canvas;
    }

    get params():Param {
        return this._params;
    }

    get cards():ArcomageCards {
        return this._cards;
    }

    get game():Arcomage {
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

    init():void {
        this.addEvents();
    }

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

                                    let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                                        (that.game.allotCards(playerOne))
                                            ? resolve()
                                            : reject("Can`t set card active status to false!");
                                    });
                                    eventPromise.then(() => {
                                        //that.game.updateResources(playerOne.sources, playerTwo.sources);
                                        that.canvas.fabricElement.renderAll();
                                        Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                                    }).then(()=> {
                                        that.game.CPUMove(that.canvas);
                                        //that.game.drawCards(that.canvas, playerTwo);
                                    });
                                }
                            });
                        }
                    });
                }
            }
        }
    }

    private discardCard(player:Player, cardName:string):void {
        let that = this;
        let card:any = this.cards.getSingleCard(cardName);
        let cardObject:IGroup = this.cards.getCardObject(cardName);

        let playerOne:Player = (player === that.playerOne) ? that.playerOne : that.playerTwo;
        let playerTwo:Player = (player === that.playerOne) ? that.playerTwo : that.playerOne;
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

                        let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                            (that.game.allotCards(playerOne))
                                ? resolve()
                                : reject("Can`t set card active status to false!");
                        });
                        eventPromise.then(() => {
                            //that.game.updateResources(playerOne.sources, playerTwo.sources);
                            Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                        }).then(()=> {
                            that.game.CPUMove(that.canvas);
                            //that.game.drawCards(that.canvas, playerTwo);
                        });
                    }
                });
            }

        }
    }

    private addEvents():void {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName:string = this.cards.names[i];
            let cardObject:IGroup = this.cards.getCardObject(cardName);

            /*let applyCard = (player:Player):void => {
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

                                            let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                                                (that.game.allotCards(playerOne))
                                                    ? resolve()
                                                    : reject("Can`t set card active status to false!");
                                            });
                                            eventPromise.then(() => {
             //that.game.updateResources(playerOne.sources, playerTwo.sources);
                                                that.canvas.fabricElement.renderAll();
                                                Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                                            }).then(()=> {
             that.game.CPUMove(that.canvas);
             //that.game.drawCards(that.canvas, playerTwo);
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            };

            let discardCard = (player:Player):any => {
                let playerOne:Player = (player === that.playerOne) ? that.playerOne : that.playerTwo;
                let playerTwo:Player = (player === that.playerOne) ? that.playerTwo : that.playerOne;
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

                                let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                                    (that.game.allotCards(playerOne))
                                        ? resolve()
                                        : reject("Can`t set card active status to false!");
                                });
                                eventPromise.then(() => {
             //that.game.updateResources(playerOne.sources, playerTwo.sources);
                                    Arcomage.clearCardsFromCanvas(that.canvas, playerOne);
                                }).then(()=> {
             that.game.CPUMove(that.canvas);
             //that.game.drawCards(that.canvas, playerTwo);
                                });
                            }
                        });
                    }

                }
             };*/

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
