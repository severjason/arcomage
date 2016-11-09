"use strict";

class Param {

    constructor(playerOneName = "Player",
                playerOneValues = {
                    tower: 15,
                    wall:5,
                    resources: {
                        "bricks": 10,
                        "gems": 10,
                        "beasts": 10
                    },
                    sources: {
                        "mine": 1,
                        "magic": 1,
                        "dungeon": 1
                    }
                },
                playerTwoName = "CPU",
                playerTwoValues = {
                    tower: 15,
                    wall:5,
                    resources: {
                        "bricks": 10,
                        "gems": 10,
                        "beasts": 10
                    },
                    sources: {
                        "mine": 1,
                        "magic": 1,
                        "dungeon": 1
                    }
                },
                cardsQuantity = 2,
                divIdForCanvas = "arcomage",
                idForCanvas = "arcomage_canvas"
    ) {

        this.playerOneName = playerOneName;
        this.playerOneValues = playerOneValues;
        this.playerTwoName = playerTwoName;
        this.playerTwoValues = playerTwoValues;
        this.quantityOfCards = cardsQuantity;
        this.divIdForCanvas = divIdForCanvas;
        this.idForCanvas = idForCanvas;
    }

    get firstPlayer() {
        return this.playerOneName;
    }

    get secondPlayer() {
        return this.playerTwoName;
    }
    
    get firstPlayerValues() {
        return this.playerOneValues;
    }

    get secondPlayerValues() {
        return this.playerTwoValues;
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