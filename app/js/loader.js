"use strict";

class Loader {

    constructor() {
        this.params = {};
        this.promises = [];
        this.cards = {};
        this.game = {};
        this.canvas = {};
    }

    get allPromises() {
        return this.promises;
    }

    add(promise) {
        if (typeof promise === "object") {
            if (Array.isArray(promise)) {
                for (let i = 0, promiseLength = promise.length; i < promiseLength; i++) {
                    this.promises.push(promise[i]);
                }
            }
            else {
                this.promises.push(promise);
            }
        }
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
                    that.params.firstPlayer,
                    that.params.firstPlayerValues, 
                    that.params.secondPlayer,
                    that.params.secondPlayerValues, 
                    that.params.cardsQuantity, 
                    cards);
            })
            .then(function (game) {
                that.game = game;
                return new Canvas(that.params.canvasDivId, that.params.canvasId);
            })
            .then(function (canvas) {
                that.canvas = canvas;
                that.canvas.setCanvasDimensions();
                that.canvas.createCards(that.cards);
                return that.canvas.imagesLoaded;
            })
            .then(function (imagesPromises) {
                return Promise.all(imagesPromises);
            })
    }

}

var loader = new Loader();



