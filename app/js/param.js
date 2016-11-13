"use strict";

class Param {

    constructor(playerOneName = "Player",
                playerOneValues = {
                    "tower": 15,
                    "wall":5,
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
                    "tower": 15,
                    "wall":5,
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
                        "height" : 26,
                        "padding": 20,
                        "fontSize":24
                    },
                    "sources": {
                        "width": 100,
                        "height": 100,
                        "padding": 20,
                        "mine": {
                            "color": "#d35400",
                            "textColor": "#34495e",
                            "src": "./images/sources/mine.png"
                        },
                        "magic": {
                            "color": "#3498db",
                            "textColor": "#34495e",
                            "src": "./images/sources/magic.jpg"
                        },
                        "dungeon": {
                            "color": "#1abc9c",
                            "textColor": "#34495e",
                            "src": "./images/sources/dungeon.jpg"
                        }
                    }
                },
                cardsQuantity = 2,
                cardsValues = {
                    "red": {
                        "color": "#d35400",
                        "textColor": "#34495e",
                        "price": "bricks"
                    },
                    "blue": {
                        "color": "#3498db",
                        "textColor": "#34495e",
                        "price": "gems"
                    },
                    "green": {
                        "color": "#1abc9c",
                        "textColor": "#34495e",
                        "price": "beasts"
                    }
                },
                divIdForCanvas = "arcomage",
                idForCanvas = "arcomage_canvas"
    ) {

        this.playerOneName = playerOneName;
        this.playerOneValues = playerOneValues;
        this.playerTwoName = playerTwoName;
        this.playerTwoValues = playerTwoValues;
        this.canvasValues = canvasValues;
        this.quantityOfCards = cardsQuantity;
        this.cardsValuesObject = cardsValues;
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
        return this.cardsValuesObject;
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

}