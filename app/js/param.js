"use strict";

class Param {

    constructor(playerOneName = "Player",
                playerOneValues = {
                    "towerLife": 15,
                    "wallLife": 5,
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
                playerTwoName = "CPU",
                playerTwoValues = {
                    "towerLife": 15,
                    "wallLife": 50,
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
                canvasValues = {
                    "playersNamesText": {
                        "width": 100,
                        "height": 26,
                        "padding": 20,
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
                        "padding": 20,
                        "fontSize": 40,
                        "textColor": "black",
                        "borderRadius": 1,
                        "mine": {
                            "color": "#d35400",
                            "textColor": "#34495e",
                            "src": "./images/sources/mine.png",
                            "resource": "bricks"
                        },
                        "magic": {
                            "color": "#3498db",
                            "textColor": "#34495e",
                            "src": "./images/sources/magic.jpg",
                            "resource": "gems"
                        },
                        "dungeon": {
                            "color": "#1abc9c",
                            "textColor": "#34495e",
                            "src": "./images/sources/dungeon.jpg",
                            "resource": "beasts"
                        }
                    },
                    "cards": {
                        "width": 150,
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
                            "textColor": "#34495e"
                        },
                        "magic": {
                            "color": "#3498db",
                            "textColor": "#34495e"
                        },
                        "dungeon": {
                            "color": "#1abc9c",
                            "textColor": "#34495e"
                        }
                    }

                },
                cardsQuantity = 2,
                divIdForCanvas = "arcomage",
                idForCanvas = "arcomage_canvas") {

        this.playerOneName = playerOneName;
        this.playerOneValues = playerOneValues;
        this.playerTwoName = playerTwoName;
        this.playerTwoValues = playerTwoValues;
        this.canvasValues = canvasValues;
        this.quantityOfCards = cardsQuantity;
        this.divIdForCanvas = divIdForCanvas;
        this.idForCanvas = idForCanvas;
    }

    get firstPlayerName() {
        return this.playerOneName;
    }

    get secondPlayerName() {
        return this.playerTwoName;
    }

    get firstPlayerValues() {
        return this.playerOneValues;
    }

    get secondPlayerValues() {
        return this.playerTwoValues;
    }

    get mainCanvasValues() {
        return this.canvasValues;
    }

    get cardsValues() {
        return this.canvasValues.cards;
    }

    get cardsQuantity() {
        return this.quantityOfCards;
    }

    get canvasDivId() {
        return this.divIdForCanvas;
    }

    get canvasId() {
        return this.idForCanvas;
    }
    
    get relations() {
        return this.canvasValues.relations;
    }
}