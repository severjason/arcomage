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
    set cards(newCards) {
        this._cards = newCards;
    }
    get game() {
        return this._game;
    }
    set game(newGame) {
        this._game = newGame;
    }
    get canvas() {
        return this._canvas;
    }
    set canvas(newCanvas) {
        this._canvas = newCanvas;
    }
    get events() {
        return this._events;
    }
    set events(newEvents) {
        this._events = newEvents;
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
            that.params = param;
            return new ArcomageCards();
        })
            .then(function (cards) {
            that.cards = cards;
            return new Arcomage(that.params, that.cards);
        })
            .then(function (game) {
            that.game = game;
            return new Canvas(that.params.canvasDivId, that.params.canvasId);
        })
            .then(function (canvas) {
            that.canvas = canvas;
            that.canvas.setCanvasDimensions();
                that.canvas.drawAll(that.cards, that.params.cardsValues, that.params.relations, that.game.playerOne, that.game.playerTwo, that.params.mainCanvasValues);
                return new Events(that.params, that.cards, that.canvas, that.game);
        })
            .then(function (events) {
            that.events = events;
            return that.canvas.cardsImagesLoaded;
        })
            .then(function (imagesPromises) {
            return Promise.all(imagesPromises);
        });
    }
}
