class Events {

    private _cards:ArcomageCards;
    private _canvas:Canvas;

    constructor(CARDS:ArcomageCards, canvas:Canvas) {
        this._cards = CARDS;
        this._canvas = canvas;
    }

    init():void {
        this.addEvents();
    }

    addEvents():void {
        let that = this;
        for (let i = 0; i < this._cards.names.length; i++) {
            this._cards.getCardObject(this._cards.names[i]).on("mousedown", function () {
                that._canvas.fabricElement.renderAll();
            })
        }
    }
}