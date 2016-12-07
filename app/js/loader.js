"use strict";

class Loader {
    
    constructor() {
        this.params = {};
        this.cards = {};
        this.game = {};
        this.canvas = {};
    }
    
    static hideLoader() {
        document.querySelector("#loader").style.display = "none";
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
                return new Arcomage(
                    that.params,
                    that.cards);
            })
            .then(function (game) {
                that.game = game;
                return new Canvas(that.params.canvasDivId, that.params.canvasId);
            })
            .then(function (canvas) {
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
                return that.canvas.cardsImagesLoaded;
            })
            .then(function (imagesPromises) {
                return Promise.all(imagesPromises);
            })
    }

}





