class Param {
    constructor(playersValues = {
            "names": ["Player", "CPU"],
            "max": {
                "tower": 100,
                "wall": 150,
                "sources": 50,
                "resources": 300
            },
            "firstPlayer": {
                "towerLife": 10,
                "wallLife": 50,
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
        }, canvasValues = {
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
                "width": 150,
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
        }, cardsQuantity = 2, divIdForCanvas = "arcomage", idForCanvas = "arcomage_canvas") {
        this._playersValues = playersValues;
        this._canvasValues = canvasValues;
        this._cardsPerPlayer = cardsQuantity;
        this._idForDivCanvas = divIdForCanvas;
        this._idForCanvas = idForCanvas;
    }
    /**
     *
     * @returns {any} playersValues
     */
    get playersValues() {
        return this._playersValues;
    }
    /**
     *
     * @returns {string} _playersValues.names[0]
     */
    get firstPlayerName() {
        return this._playersValues.names[0];
    }
    /**
     *
     * @returns {string} _playersValues.names[1]
     */
    get secondPlayerName() {
        return this._playersValues.names[1];
    }
    /**
     * Get first player defaults values
     * @returns {any} _playersValues.firstPlayer
     */
    get firstPlayerValues() {
        return this._playersValues.firstPlayer;
    }
    /**
     * Get second player defaults values
     * @returns {any} _playersValues.secondPlayer
     */
    get secondPlayerValues() {
        return this._playersValues.secondPlayer;
    }
    /**
     * Get all canvas basic values
     * @returns {any} _canvasValues
     */
    get mainCanvasValues() {
        return this._canvasValues;
    }
    /**
     * Get cards values from Canvas values
     * @returns {any} _canvasValues.cards
     */
    get cardsValues() {
        return this._canvasValues.cards;
    }
    /**
     * Get cards quantity for each player
     * @returns {number} quantityOfCards
     */
    get cardsQuantity() {
        return this._cardsPerPlayer;
    }
    /**
     * Get max values
     * @returns {any} _playersValues.max
     */
    get maxValues() {
        return this._playersValues.max;
    }
    /**
     * Get canvas container (div) id
     * @returns {string} _idForDivCanvas
     */
    get canvasDivId() {
        return this._idForDivCanvas;
    }
    /**
     * Get canvas id
     * @returns {string} _idForCanvas
     */
    get canvasId() {
        return this._idForCanvas;
    }
    /**
     * Get relations between resources and sources
     * @returns {any} _canvasValues.relations
     */
    get relations() {
        return this._canvasValues.relations;
    }
}
