var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class Param {
        constructor(playersValues = {
                max: {
                    tower: 100,
                    wall: 150,
                    sources: 50,
                    resources: 999,
                },
                playerOne: {
                    name: "Player",
                    towerLife: [10, 10, 5],
                    wallLife: [10, 15, 10],
                    resources: [
                        { bricks: 10, gems: 10, beasts: 10 },
                        { bricks: 10, gems: 5, beasts: 10 },
                        { bricks: 5, gems: 5, beasts: 5 },
                    ],
                    sources: {
                        mine: 1,
                        magic: 1,
                        dungeon: 1,
                    },
                },
                playerTwo: {
                    name: ["CPU", "Stan", "Cartman", "Batman", "Chuck", "Goblin", "Mr. Bot"],
                    towerLife: [10, 15, 15],
                    wallLife: [10, 15, 20],
                    resources: [
                        { bricks: 10, gems: 10, beasts: 10 },
                        { bricks: 15, gems: 15, beasts: 15 },
                        { bricks: 20, gems: 20, beasts: 20 },
                    ],
                    sources: {
                        mine: 1,
                        magic: 1,
                        dungeon: 1,
                    },
                },
            }, canvasValues = {
                playersNamesText: {
                    maxLetters: 10,
                    width: 140,
                    height: 28,
                    padding: 5,
                    strokeWidth: 0,
                    borderRadius: 2,
                    fontSize: 24,
                    textColor: "#000",
                    strokeColor: "#fff",
                    fillColor: "#7f8c8d",
                    activeFillColor: "#000",
                },
                relations: {
                    mine: "bricks",
                    magic: "gems",
                    dungeon: "beasts",
                },
                sources: {
                    width: 100,
                    height: 100,
                    imgWidth: 80,
                    imgHeight: 60,
                    resImgWidth: 60,
                    resImgHeight: 45,
                    padding: 5,
                    paddingTop: 20,
                    textPadding: 5,
                    fontSize: 24,
                    descFontSize: 18,
                    textColor: "#010101",
                    borderRadius: 1,
                    mine: {
                        color: "#d35400",
                        textColor: "#010101",
                        src: "./images/sources/mine.png",
                        resSrc: "./images/sources/bricks.png",
                        resource: "bricks",
                        position: 0,
                    },
                    magic: {
                        color: "#2980b9",
                        textColor: "#010101",
                        src: "./images/sources/magic.png",
                        resSrc: "./images/sources/gems.png",
                        resource: "gems",
                        position: 1,
                    },
                    dungeon: {
                        color: "#27ae60",
                        textColor: "#010101",
                        src: "./images/sources/dungeon.png",
                        resSrc: "./images/sources/beasts.png",
                        resource: "beasts",
                        position: 2,
                    },
                },
                towers: {
                    positionY: 300,
                    width: 50,
                    height: 30,
                    roofWidth: 70,
                    roofHeight: 50,
                    heightStep: 2.5,
                    padding: 155,
                    fontSize: 22,
                    textColor: "#010101",
                    roofColor: "#7c3607",
                    roofStrokeColor: "#5d2906",
                    towerColor: "#a34508",
                },
                walls: {
                    positionY: 300,
                    width: 30,
                    heightStep: 2.5,
                    padding: 250,
                    fontSize: 22,
                    textColor: "#010101",
                    wallColor: "#7f8c8d",
                    src: "./images/temp/bricks.jpg",
                },
                cards: {
                    width: 141,
                    height: 235,
                    padding: 4,
                    mainTextPadding: 120,
                    cardsStrokeWidth: 2,
                    cardsBordersRadius: 2,
                    cardsBodyColor: "#f8ecc2",
                    imageWidth: 140,
                    imageHeight: 90,
                    imagePadding: 22,
                    priceCircleRadius: 12,
                    priceFontSize: 18,
                    priceStrokeWidth: 1,
                    discardHeight: 30,
                    discardFontSize: 16,
                    backColor: "#010101",
                    backTextColor: "#e67e22",
                    backTextFontSize: 18,
                    backTextPadding: 50,
                    mine: {
                        color: "#d35400",
                        textColor: "#010101",
                    },
                    magic: {
                        color: "#2980b9",
                        textColor: "#010101",
                    },
                    dungeon: {
                        color: "#27ae60",
                        textColor: "#010101",
                    },
                },
            }, cardsQuantity = 5, divIdForCanvas = "arcomage", idForCanvas = "arcomage_canvas") {
            this.playersVls = playersValues;
            this.canvasVls = canvasValues;
            this.cardsPerPlayer = cardsQuantity;
            this.idForDivCanvas = divIdForCanvas;
            this.idForCanvas = idForCanvas;
        }
        /**
         *
         * @returns {Object} playersValues
         */
        get playersValues() {
            return this.playersVls;
        }
        /**
         *
         * @returns {string} playersVls.playerOne.name
         */
        get playerOneName() {
            return this.playersVls.playerOne.name;
        }
        /**
         *
         * @returns {string} playersVls.playerTwo.name
         */
        get playerTwoName() {
            return this.playersVls.playerTwo.name[Math.floor(Math.random() * (this.playersVls.playerTwo.name.length))];
        }
        /**
         * Get player one defaults values
         * @returns {Object} playersVls.playerOne
         */
        get playerOneValues() {
            return this.playersVls.playerOne;
        }
        /**
         * Get player two defaults values
         * @returns {Object} playersVls.playerTwo
         */
        get playerTwoValues() {
            return this.playersVls.playerTwo;
        }
        /**
         * Get all canvas basic values
         * @returns {Object} canvasVls
         */
        get canvasValues() {
            return this.canvasVls;
        }
        /**
         * Get cards values from Canvas values
         * @returns {Object} canvasVls.cards
         */
        get cardsValues() {
            return this.canvasVls.cards;
        }
        /**
         * Get cards quantity for each player
         * @returns {number} quantityOfCards
         */
        get cardsQuantity() {
            return this.cardsPerPlayer;
        }
        /**
         * Get max values
         * @returns {Object} playersVls.max
         */
        get maxValues() {
            return this.playersVls.max;
        }
        /**
         * Get canvas container (div) id
         * @returns {string} idForDivCanvas
         */
        get canvasDivId() {
            return this.idForDivCanvas;
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
         * @returns {Object} canvasVls.relations
         */
        get relations() {
            return this.canvasVls.relations;
        }
    }
    ArcomageGame.Param = Param;
})(ArcomageGame || (ArcomageGame = {}));
