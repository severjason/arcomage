class Loader {

    private _params:Param;
    private _cards:ArcomageCards;
    private _game:Arcomage;
    private _canvas:Canvas;
    private _events:Events;

    constructor() {
    }

    /**
     * Get Param class
     * @returns {Param} _params
     */
    get params():Param {
        return this._params;
    }

    /**
     * Set Param class
     * @param {Param} newParams
     */
    set params(newParams:Param) {
        this._params = newParams;
    }

    /**
     * Get ArcomageCards class
     * @returns {ArcomageCards} _cards
     */
    get cards():ArcomageCards {
        return this._cards;
    }

    /**
     * Set ArcomageCards
     * @param {ArcomageCards} newCards
     */
    set cards(newCards:ArcomageCards) {
        this._cards = newCards;
    }

    /**
     * Get Arcomage class
     * @returns {Arcomage} _game
     */
    get game():Arcomage {
        return this._game;
    }

    /**
     * Set Arcomage class
     * @param {Arcomage} newGame
     */
    set game(newGame:Arcomage) {
        this._game = newGame;
    }

    /**
     * Get canvas class
     * @returns {Canvas} _canvas
     */
    get canvas():Canvas {
        return this._canvas;
    }

    /**
     * Set Canvas class
     * @param {Canvas} newCanvas _canvas
     */
    set canvas(newCanvas:Canvas) {
        this._canvas = newCanvas;
    }

    /**
     * Get Events class
     * @returns {Events} _events
     */
    get events():Events {
        return this._events;
    }

    /**
     * Set Events class
     * @param {Events} newEvents
     */
    set events(newEvents:Events) {
        this._events = newEvents;
    }

    /**
     * Hides loader
     * @returns {boolean}
     */
    static hideLoader():boolean {
        let elem = <HTMLElement>document.querySelector("#loader");
        elem.style.display = "none";
        return true;
    }

    /**
     * Loads all classes step by step
     * @returns {Promise<any>}
     */
    init() {
        let that:Loader = this;

        let promiseChain:Promise<Object> = new Promise((resolve, reject) => {

            resolve(new Param());

            reject(new Error("Can`t create Default Parameters!"));

        });

        return promiseChain
            .then(function (param:Param) {
                that.params = param;
                return new ArcomageCards();
            })
            .then(function (cards:ArcomageCards) {
                that.cards = cards;
                return new Arcomage(
                    that.params,
                    that.cards);
            })
            .then(function (game:Arcomage) {
                that.game = game;
                return new Canvas(that.params.canvasDivId, that.params.canvasId);
            })
            .then(function (canvas:any) {
                that.canvas = canvas;
                that.canvas.setCanvasDimensions();
                that.canvas.drawAll(
                    that.cards,
                    that.params.cardsValues,
                    that.params.relations,
                    that.game.playerOne,
                    that.game.playerTwo,
                    that.params.canvasValues);
                return new Events(that.params, that.cards, that.canvas, that.game);
            })
            .then(function (events) {
                that.events = events;
                return that.canvas.cardsImagesLoaded;
            })
            .then(function (imagesPromises:Array<Promise<any>>) {
                return Promise.all(imagesPromises);
            })
    }

}





