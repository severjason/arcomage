class Loader {

    private _params:any;
    private _cards:any;
    private _game:any;
    private _canvas:any;
    private _events:Events;

    constructor() { 
        this._params = {};
        this._cards = {};
        this._game = {};
        this._canvas = {};
    }

    get params():Param {
        return this._params;
    }

    set params(newParams:Param) {
        this._params = newParams;
    }
    
    get cards():ArcomageCards {
        return this._cards;
    }

    set cards(newCards:ArcomageCards) {
        this._cards = newCards;
    }

    get game():Arcomage {
        return this._game;
    }

    set game(newGame:Arcomage) {
        this._game = newGame;
    }

    get canvas():any {
        return this._canvas;
    }

    set canvas(newCanvas) {
        this._canvas = newCanvas;
    }

    get events():Events {
        return this._events;
    }

    set events(newEvents) {
        this._events = newEvents;
    }

    static hideLoader():boolean {
        let elem = <HTMLElement>document.querySelector("#loader");
        elem.style.display = "none";
        return true;
    }
    
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
                    that.params.firstPlayerName,
                    that.game.firstPlayer,
                    that.params.secondPlayerName,
                    that.game.secondPlayer,
                    that.params.mainCanvasValues);
                return new Events(that.cards, that.canvas);
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





