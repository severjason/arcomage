var Arcomage = (function () {
    function Arcomage(params, cards) {
        this._playerOne = new Player(params.firstPlayerName, params.firstPlayerValues, params.maxValues, params.mainCanvasValues);
        this._playerTwo = new Player(params.secondPlayerName, params.secondPlayerValues, params.maxValues, params.mainCanvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
    }
    Object.defineProperty(Arcomage.prototype, "firstPlayer", {
        get: function () {
            return this._playerOne;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Arcomage.prototype, "secondPlayer", {
        get: function () {
            return this._playerTwo;
        },
        enumerable: true,
        configurable: true
    });
    Arcomage.prototype.applyCard = function (cardName, player, enemy) {
        this._cards.getSingleCard(cardName).action(player, enemy);
        //this.CARDS[cardName].isActive = false;
    };
    Arcomage.prototype.allotCards = function (player) {
        var cardsNames = this._cards.names;
        for (var i = 0; player.cards.length < this._cardsQuantity; i++) {
            var random = Math.floor(Math.random() * (cardsNames.length));
            var randomCard = this._cards.getSingleCard(cardsNames[random]);
            if (!randomCard.isActive) {
                randomCard.isActive = true;
                player.updateCards(randomCard);
            }
            else
                this.allotCards(player);
        }
    };
    return Arcomage;
}());
