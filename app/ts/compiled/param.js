"use strict";
var Param = (function () {
    function Param(playersValues, canvasValues, cardsQuantity, divIdForCanvas, idForCanvas) {
        if (playersValues === void 0) { playersValues = {
            "names": ["Player", "CPU"],
            "max": {
                "tower": 100,
                "wall": 150,
                "sources": 50,
                "resources": 300
            },
            "firstPlayer": {
                "towerLife": 10,
                "wallLife": 100,
                "resources": {
                    "bricks": 10,
                    "gems": 10,
                    "beasts": 10
                },
                "sources": {
                    "mine": 4,
                    "magic": 1,
                    "dungeon": 1
                }
            },
            "secondPlayer": {
                "towerLife": 15,
                "wallLife": 10,
                "resources": {
                    "bricks": 10,
                    "gems": 10,
                    "beasts": 10
                },
                "sources": {
                    "mine": 3,
                    "magic": 4,
                    "dungeon": 1
                }
            }
        }; }
        if (canvasValues === void 0) { canvasValues = {
            "playersNamesText": {
                "width": 100,
                "height": 26,
                "padding": 10,
                "strokeWidth": 1,
                "borderRadius": 2,
                "fontSize": 24,
                "textColor": "#000"
            },
            "relations": {
                "mine": "bricks",
                "magic": "gems",
                "dungeon": "beasts"
            },
            "sources": {
                "width": 100,
                "height": 100,
                "imgWidth": 50,
                "imgHeight": 75,
                "padding": 10,
                "paddingTop": 20,
                "textPadding": 5,
                "fontSize": 40,
                "textColor": "#2c3e50",
                "borderRadius": 1,
                "mine": {
                    "color": "#d35400",
                    "textColor": "white",
                    "src": "./images/sources/mine.png",
                    "resource": "bricks",
                    "position": 0
                },
                "magic": {
                    "color": "#2980b9",
                    "textColor": "#34495e",
                    "src": "./images/sources/magic.png",
                    "resource": "gems",
                    "position": 1
                },
                "dungeon": {
                    "color": "#27ae60",
                    "textColor": "#34495e",
                    "src": "./images/sources/dungeon.png",
                    "resource": "beasts",
                    "position": 2
                }
            },
            "towers": {
                "positionY": 300,
                "width": 50,
                "height": 30,
                "roofWidth": 70,
                "roofHeight": 50,
                "heightStep": 4,
                "padding": 150,
                "fontSize": 24,
                "textColor": "#34495e",
                "roofColor": "#7c3607",
                "towerColor": "#a34508"
            },
            "walls": {
                "positionY": 300,
                "width": 30,
                "heightStep": 3,
                "padding": 250,
                "fontSize": 20,
                "textColor": "#34495e",
                "wallColor": "#7f8c8d",
                "src": "./images/temp/bricks.jpg"
            },
            "cards": {
                "width": 146,
                "height": 210,
                "padding": 5,
                "cardsStrokeWidth": 0,
                "cardsBordersRadius": 2,
                "imageWidth": 90,
                "imageHeight": 60,
                "priceCircleRadius": 12,
                "priceFontSize": 18,
                "priceStrokeWidth": 1,
                "mine": {
                    "color": "#d35400",
                    "textColor": "#2c3e50"
                },
                "magic": {
                    "color": "#2980b9",
                    "textColor": "#2c3e50"
                },
                "dungeon": {
                    "color": "#27ae60",
                    "textColor": "#2c3e50"
                }
            }
        }; }
        if (cardsQuantity === void 0) { cardsQuantity = 2; }
        if (divIdForCanvas === void 0) { divIdForCanvas = "arcomage"; }
        if (idForCanvas === void 0) { idForCanvas = "arcomage_canvas"; }
        this._playersValues = playersValues;
        this._canvasValues = canvasValues;
        this._cardsPerPlayer = cardsQuantity;
        this._idForDivCanvas = divIdForCanvas;
        this._idForCanvas = idForCanvas;
    }
    Object.defineProperty(Param.prototype, "playersValues", {
        /**
         *
         * @returns {any} playersValues
         */
        get: function () {
            return this._playersValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "firstPlayerName", {
        /**
         *
         * @returns {string} _playersValues.names[0]
         */
        get: function () {
            return this._playersValues.names[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "secondPlayerName", {
        /**
         *
         * @returns {string} _playersValues.names[1]
         */
        get: function () {
            return this._playersValues.names[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "firstPlayerValues", {
        /**
         * Get first player defaults values
         * @returns {Object} _playersValues.firstPlayer
         */
        get: function () {
            return this._playersValues.firstPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "secondPlayerValues", {
        /**
         * Get second player defaults values
         * @returns {Object} _playersValues.secondPlayer
         */
        get: function () {
            return this._playersValues.secondPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "mainCanvasValues", {
        /**
         * Get all canvas basic values
         * @returns {Object} _canvasValues
         */
        get: function () {
            return this._canvasValues;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "cardsValues", {
        /**
         * Get cards values from Canvas values
         * @returns {Object} _canvasValues.cards
         */
        get: function () {
            return this._canvasValues.cards;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "cardsQuantity", {
        /**
         * Get cards quantity for each player
         * @returns {number} quantityOfCards
         */
        get: function () {
            return this._cardsPerPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "maxValues", {
        /**
         * Get max values
         * @returns {Object} _playersValues.max
         */
        get: function () {
            return this._playersValues.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "canvasDivId", {
        /**
         * Get canvas container (div) id
         * @returns {string} _idForDivCanvas
         */
        get: function () {
            return this._idForDivCanvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "canvasId", {
        /**
         * Get canvas id
         * @returns {string} _idForCanvas
         */
        get: function () {
            return this._idForCanvas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Param.prototype, "relations", {
        /**
         * Get relations between resources and sources
         * @returns {Object} _canvasValues.relations
         */
        get: function () {
            return this._canvasValues.relations;
        },
        enumerable: true,
        configurable: true
    });
    return Param;
}());
