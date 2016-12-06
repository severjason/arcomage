"use strict";

class Param {

    constructor(playersValues = {
                    "names": ["Player", "CPU"],
                    "firstPlayer": {
                        "towerLife": 10,
                        "wallLife": 10,
                        "resources": {
                            "bricks": 10,
                            "gems": 10,
                            "beasts": 10
                        },
                        "sources": {
                            "mine": 1,
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
                            "mine": 1,
                            "magic": 1,
                            "dungeon": 1
                        }
                    }
                },
                canvasValues = {
                    "playersNamesText": {
                        "width": 100,
                        "height": 26,
                        "padding": 10,
                        "strokeWidth":1,
                        "borderRadius":2,
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
                        "paddingTop":20,
                        "textPadding":5,
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
                    "towers":{
                        "positionY":300,
                        "width":50,
                        "roofWidth":70,
                        "roofHeight":50,
                        "heightStep":4,
                        "padding": 150,
                        "fontSize": 24,
                        "textColor": "#34495e"
                    },
                    "walls":{
                        "positionY":300,
                        "width":30,
                        "heightStep":3,
                        "padding": 250,
                        "fontSize": 24,
                        "textColor": "#34495e"
                    },
                    "cards": {
                        "width": 146,
                        "height": 210,
                        "padding":5,
                        "cardsStrokeWidth":0,
                        "cardsBordersRadius":2,
                        "imageWidth": 90,
                        "imageHeight": 60,
                        "priceCircleRadius": 12,
                        "priceFontSize":18,
                        "priceStrokeWidth":1,
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

                },
                cardsQuantity = 2,
                divIdForCanvas = "arcomage",
                idForCanvas = "arcomage_canvas") {

        this.playersValues = playersValues;
        this.canvasValues = canvasValues;
        this.quantityOfCards = cardsQuantity;
        this.divIdForCanvas = divIdForCanvas;
        this.idForCanvas = idForCanvas;
    }

    /**
     *
     * @returns {string} playersValues.names[0]
     */
    get firstPlayerName() {
        return this.playersValues.names[0];
    }

    /**
     *
     * @returns {string} playersValues.names[1]
     */
    get secondPlayerName() {
        return this.playersValues.names[1];
    }

    /**
     * Get first player defaults values
     * @returns {object} playersValues.firstPlayer
     */
    get firstPlayerValues() {
        return this.playersValues.firstPlayer;
    }

    /**
     * Get second player defaults values
     * @returns {object} playersValues.secondPlayer
     */
    get secondPlayerValues() {
        return this.playersValues.secondPlayer;
    }

    /**
     * Get all canvas basic values
     * @returns {object} canvasValues
     */
    get mainCanvasValues() {
        return this.canvasValues;
    }

    /**
     * Get cards values from Canvas values
     * @returns {object} canvasValues.cards
     */
    get cardsValues() {
        return this.canvasValues.cards;
    }

    /**
     * Get cards quantity for each player
     * @returns {number} quantityOfCards
     */
    get cardsQuantity() {
        return this.quantityOfCards;
    }

    /**
     * Get canvas container (div) id
     * @returns {string} divIdForCanvas
     */
    get canvasDivId() {
        return this.divIdForCanvas;
    }

    /**
     * Get canvas id
     * @returns {string} idForCanvas
     */
    get canvasId() {
        return this.idForCanvas;
    }

    /**
     * Get relations between resources and sources
     * @returns {object} canvasValues.relations
     */
    get relations() {
        return this.canvasValues.relations;
    }
}