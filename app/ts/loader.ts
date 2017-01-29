/// <reference path="@types/js-cookie/js-cookie.d.ts" />

class Loader {

    private _params:Param;
    private _cards:ArcomageCards;
    private _game:Arcomage;
    private _canvas:Canvas;
    private _events:Events;
    private _dom:DOM;

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
     * Get DOM class
     * @returns {DOM} _dom
     */
    get dom():DOM {
        return this._dom;
    }

    /**
     * Set DOM class
     * @param {DOM} newDOM
     */
    set dom(newDOM:DOM) {
        this._dom = newDOM;
    }

    /**
     * Hides loader
     */
    static hideLoader() {
        let elem = <HTMLElement>document.querySelector("#loader");
        elem.style.display = "none";
    }

    /**
     * Analog of htmlspecialchars
     * @param {string } string
     * @returns {string}
     */
    static escapeHtml(string:string) {
        var map:any = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return string.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }

    /**
     * Loads all classes step by step
     * @param {string} newPlayerOneName
     * @returns {Promise<any>}
     */
    init(newPlayerOneName:string):Promise<any> {
        let that:Loader = this;

        let promiseChain:Promise<Object> = new Promise((resolve, reject) => {

            resolve(new Param());

            reject(new Error("Can`t create Default Parameters!"));

        });

        return promiseChain
            .then(function (param:Param) {
                that.params = param;
                that.dom = new DOM();
                return new ArcomageCards();
            })
            .then(function (cards:ArcomageCards) {
                that.cards = cards;
                return new Arcomage(
                    that.params,
                    that.cards,
                    that.dom,
                    newPlayerOneName);
            })
            .then(function (game:Arcomage) {
                that.game = game;
                Cookies.set("Arcomage", "sadas");
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

    start(newPlayerOneName:string):void {
        let that = this;
        this.init(Loader.escapeHtml(newPlayerOneName)).then(function () {
            that.events.init();
            Loader.hideLoader();
            that.game.allotCards(that.game.playerOne);
            that.game.allotCards(that.game.playerTwo);
            that.game.drawCards(that.canvas, that.game.playerOne);
            console.log(Cookies.get());
        });
    }

}





