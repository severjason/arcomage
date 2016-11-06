"use strict";

class Loader {

    constructor() {
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

            resolve(new ArcomageCards());

            reject(new Error("Can`t create ArcomageCards!"));

        });

        return promiseChain
            .then(function (cards) {
                that.cards = cards;
                return new Arcomage("Player", "CPU", 2, cards);
            })
            .then(function (game) {
                that.game = game;
                return new Canvas("arcomage", "arcomage_canvas");
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



