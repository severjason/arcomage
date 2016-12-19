class Events {

    private _cards:ArcomageCards;
    private _canvas:Canvas;
    private _game:Arcomage;

    constructor(CARDS:ArcomageCards, canvas:Canvas, game:Arcomage) {
        this._cards = CARDS;
        this._canvas = canvas;
        this._game = game;
    }

    get canvas():Canvas {
        return this._canvas;
    }

    get cards():ArcomageCards {
        return this._cards;
    }

    get game():Arcomage {
        return this._game;
    }

    get firstPlayer() {
        return this.game.firstPlayer;
    }

    init():void {
        this.addEvents();
    }

    addEvents():void {
        let that = this;
        for (let i = 0; i < this.cards.names.length; i++) {
            let cardName = this.cards.names[i];
            let card = this.cards.getSingleCard(cardName);
            let cardObject = this.cards.getCardObject(cardName);

            cardObject.on("mousedown", function () {
                if (card.isActive) {
                    let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                        card.isActive = !card.isActive;
                        that.canvas.fabricElement.remove(cardObject);
                        that.firstPlayer.removeCard(card);
                        (that.game.allotCards(that.firstPlayer))
                            ? resolve()
                            : reject("Can`t set card active status to false!");
                    });

                    eventPromise.then(() => {
                        that.game.drawCards(that.canvas);
                        that.game.applyCard(cardName, that.game.firstPlayer, that.game.secondPlayer);
                    });
                }
            })
        }
    }
}