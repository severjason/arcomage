class Loader {

    private _params:any;
    private _cards:any;
    private _game:any;
    private _canvas:any;

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

    get game():Arcomage {
        return this._game;
    }

    get canvas():any {
        return this._canvas;
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
                that._params = param;
                return new ArcomageCards();
            })
            .then(function (cards:ArcomageCards) {
                that._cards = cards;
                return new Arcomage(
                    that.params,
                    that.cards);
            }) 
            .then(function (game:Arcomage) {
                that._game = game;
                return new Canvas(that.params.canvasDivId, that.params.canvasId);
            })
            .then(function (canvas:any) {
                that._canvas = canvas;
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
                return that.canvas.cardsImagesLoaded;
            })
            .then(function (imagesPromises:Array<Promise<any>>) {
                return Promise.all(imagesPromises);
            })
    }

}





