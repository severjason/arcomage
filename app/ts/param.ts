class Param {

    private _playersValues:any;
    private _canvasValues:any;
    private _cardsPerPlayer:number;
    private _idForDivCanvas:string;
    private _idForCanvas:string;

    constructor(playersValues:any = {
        "names": ["Player", "CPU"],
        "max": {
            "tower": 100,
            "wall": 150,
            "sources": 50,
            "resources": 300
        },
        "playerOne": {
            "towerLife": 10,
            "wallLife": 15,
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
        "playerTwo": {
            "towerLife": 10,
            "wallLife": 15,
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
                canvasValues:any = {
                    "playersNamesText": {
                        "width": 100,
                        "height": 28,
                        "padding": 10,
                        "strokeWidth": 0,
                        "borderRadius": 2,
                        "fontSize": 24,
                        "textColor": "#000",
                        "strokeColor": "#fff",
                        "fillColor": "#fff",
                        "activeFillColor": "#f1c40f"

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
                        "height": 240,
                        "padding": 5,
                        "mainTextPadding": 100,
                        "cardsStrokeWidth": 0,
                        "cardsBordersRadius": 2,
                        "imageWidth": 90,
                        "imageHeight": 60,
                        "imagePadding": 30,
                        "priceCircleRadius": 12,
                        "priceFontSize": 18,
                        "priceStrokeWidth": 1,
                        "discardHeight": 30,
                        "discardFontSize": 16,
                        "backColor": "#1a242f",
                        "backTextColor": "#e67e22",
                        "backTextFontSize": 18,
                        "backTextPadding": 50,
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
                cardsQuantity:number = 2,
                divIdForCanvas:string = "arcomage",
                idForCanvas:string = "arcomage_canvas") {

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
    get playersValues():any {
        return this._playersValues;
    }

    /**
     *
     * @returns {string} _playersValues.names[0]
     */
    get playerOneName():string {
        return this._playersValues.names[0];
    }

    /**
     *
     * @returns {string} _playersValues.names[1]
     */
    get playerTwoName():string {
        return this._playersValues.names[1];
    }

    /**
     * Get player one defaults values
     * @returns {any} _playersValues.playerOne
     */
    get playerOneValues():any {
        return this._playersValues.playerOne;
    }

    /**
     * Get player two defaults values
     * @returns {any} _playersValues.playerTwo
     */
    get playerTwoValues():any {
        return this._playersValues.playerTwo;
    }

    /**
     * Get all canvas basic values
     * @returns {any} _canvasValues
     */
    get canvasValues():any {
        return this._canvasValues;
    }

    /**
     * Get cards values from Canvas values
     * @returns {any} _canvasValues.cards
     */
    get cardsValues():any {
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
    get maxValues():any {
        return this._playersValues.max;
    }

    /**
     * Get canvas container (div) id
     * @returns {string} _idForDivCanvas
     */
    get canvasDivId():string {
        return this._idForDivCanvas;
    }

    /**
     * Get canvas id
     * @returns {string} _idForCanvas
     */
    get canvasId():string {
        return this._idForCanvas;
    }

    /**
     * Get relations between resources and sources
     * @returns {any} _canvasValues.relations
     */
    get relations():any {
        return this._canvasValues.relations;
    }
}