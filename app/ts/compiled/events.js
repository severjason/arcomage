class Events {
    constructor(CARDS, canvas, game) {
        this._cards = CARDS;
        this._canvas = canvas;
        this._game = game;
    }
    get canvas() {
        return this._canvas;
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
                if (card.isActive) {
                    let eventPromise = new Promise((resolve, reject) => {
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
            });
        }
    }
}
