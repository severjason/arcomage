class Loader {
    constructor() {
        this._params = {};
        this._cards = {};
        this._game = {};
        this._canvas = {};
    }
    get params() {
        return this._params;
    }
    set params(newParams) {
        this._params = newParams;
    }
    get cards() {
        return this._cards;
    }
    get game() {
        return this._game;
    }
    get canvas() {
        return this._canvas;
    }
    static hideLoader() {
        let elem = document.querySelector("#loader");
        elem.style.display = "none";
        return true;
    }
    init() {
        let that = this;
        let promiseChain = new Promise((resolve, reject) => {
            resolve(new Param());
            reject(new Error("Can`t create Default Parameters!"));
        });
        return promiseChain
            .then(function (param) {
            that._params = param;
            return new ArcomageCards();
        })
            .then(function (cards) {
            that._cards = cards;
            return new Arcomage(that.params, that.cards);
        })
            .then(function (game) {
            that._game = game;
            return new Canvas(that.params.canvasDivId, that.params.canvasId);
        })
            .then(function (canvas) {
            that._canvas = canvas;
            that.canvas.setCanvasDimensions();
            that.canvas.drawAll(that.cards, that.params.cardsValues, that.params.relations, that.params.firstPlayerName, that.game.firstPlayer, that.params.secondPlayerName, that.game.secondPlayer, that.params.mainCanvasValues);
            return that.canvas.cardsImagesLoaded;
        })
            .then(function (imagesPromises) {
            return Promise.all(imagesPromises);
        });
    }
}
