var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class Arcomage {
        constructor(params, cards, dom, cookie, playerOneName, difficulty, playerTwoName, playerOneValuesFromCookie, playerTwoValuesFromCookie) {
            this.playerOneObject = new ArcomageGame.Player(playerOneName || params.playerOneName, playerOneValuesFromCookie || params.playerOneValues, params.maxValues, params.canvasValues, difficulty);
            this.playerTwoObject = new ArcomageGame.Player(playerTwoName || params.playerTwoName, playerTwoValuesFromCookie || params.playerTwoValues, params.maxValues, params.canvasValues, difficulty);
            this.cardsQty = params.cardsQuantity;
            this.cardsObject = cards;
            this.paramsObject = params;
            this.playerOneTurnStatus = true;
            this.playerTwoTurnStatus = false;
            this.gameStatus = true;
            this.DOMObject = dom;
            this.cookieObject = cookie;
            this.difficultyLevel = difficulty;
            this.CPUAI = new ArcomageGame.CPUAI(this.playerTwoObject, cards, params);
        }
        /**
         * Clear canvas from cards objects
         * @param {Canvas} canvas
         * @param {Player} player
         */
        static clearCardsFromCanvas(canvas, player) {
            for (let card of player.cards) {
                let playerCardObject = card.object;
                canvas.fabricElement.remove(playerCardObject);
            }
        }
        /**
         * Get Param class
         * @returns {Param} paramsObject
         */
        get params() {
            return this.paramsObject;
        }
        /**
         * Get player one
         * @returns {Player} playerOneObject
         */
        get playerOne() {
            return this.playerOneObject;
        }
        /**
         * Get player one turn
         * @returns {boolean} playerOneTurnStatus
         */
        get playerOneTurn() {
            return this.playerOneTurnStatus;
        }
        /**
         * Get player two
         * @returns {Player} playerTwoObject
         */
        get playerTwo() {
            return this.playerTwoObject;
        }
        /**
         * Get player two turn
         * @returns {boolean} playerTwoTurnStatus
         */
        get playerTwoTurn() {
            return this.playerTwoTurnStatus;
        }
        /**
         * Get CPU AI class
         * @returns {CPU_AI} CPUAI
         */
        get CPU_AI() {
            return this.CPUAI;
        }
        /**
         * Get players turn
         * @param {Player} player
         * @returns {boolean}
         */
        getPlayerTurn(player) {
            return (player === this.playerOne) ? this.playerOneTurn : this.playerTwoTurn;
        }
        /**
         * Get cardValues from params
         * @returns {Object} paramsObject.cardsValues
         */
        get cardsValues() {
            return this.paramsObject.cardsValues;
        }
        /**
         * Get card class
         * @returns {ArcomageCards} cardsObject
         */
        get cards() {
            return this.cardsObject;
        }
        /**
         * Get cards quantity from params
         * @returns {number} cardsQty
         */
        get cardsQuantity() {
            return this.cardsQty;
        }
        /**
         * Get game status
         * @returns {boolean} gameStatus
         */
        get status() {
            return this.gameStatus;
        }
        /**
         * Get DOM class
         * @returns {DOM} DOMObject
         */
        get DOM() {
            return this.DOMObject;
        }
        /**
         * Get Cookie class
         * @returns {Cookie} cookieObject
         */
        get cookie() {
            return this.cookieObject;
        }
        /**
         * Change game status to false, destroy cookie and show gameOver message
         * @param {Player} player
         */
        gameOver(player) {
            this.gameStatus = false;
            let playerOneWin = (player === this.playerOne);
            this.cookie.setStatusCookie(this.status);
            this.DOM.showGameOverMessage(playerOneWin, this.playerOne.moves, this.playerOne.scores);
        }
        /**
         * Check if game is on
         * @returns {boolean} status
         */
        isOn() {
            return this.status;
        }
        /**
         * Update player one moves and change turn to player two
         */
        playerOneMoved() {
            this.playerOne.updateMoves();
            this.playerOneTurnStatus = false;
            this.playerTwoTurnStatus = true;
        }
        /**
         * Update player two moves and change turn to player one
         */
        playerTwoMoved() {
            this.playerTwo.updateMoves();
            this.playerTwoTurnStatus = false;
            this.playerOneTurnStatus = true;
        }
        /**
         * Update player moves and change turn to another player
         * @param {Player} player
         */
        playerMoved(player) {
            (player === this.playerOne) ? this.playerOneMoved() : this.playerTwoMoved();
        }
        /**
         * Highlight active player
         * @param {Player} player
         */
        highlightActivePlayer(player) {
            let playerOne = (player === this.playerOne) ? this.playerOne : this.playerTwo;
            let playerTwo = (player === this.playerOne) ? this.playerTwo : this.playerOne;
            playerOne.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.activeFillColor);
            playerTwo.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.fillColor);
        }
        /**
         * Apply card by its name and check if game is over
         * @param {string} cardName
         * @param {Player} player
         * @param {Player} enemy
         */
        applyCard(cardName, player, enemy) {
            this.cards.getSingleCard(cardName).action(player, enemy);
            player.updateScores(this.cards.getScore(cardName));
            this.cards.deactivate(cardName);
            if (player.towerLife === this.params.maxValues.tower || enemy.towerLife === 0) {
                this.gameOver(player);
            }
        }
        /**
         * Check if player can use card
         * @param {string} cardName
         * @param {Player} player
         * @returns {boolean}
         */
        cardAvailable(cardName, player) {
            if (this.cards.isActive(cardName)) {
                let switcher = false;
                for (let card of player.cards) {
                    if (this.cards.getSingleCard(cardName) === card) {
                        switcher = true;
                    }
                }
                return switcher;
            }
            else {
                return false;
            }
        }
        /**
         * Randomly allot card to player
         * @param {Player} player
         * @returns {boolean}
         */
        allotCards(player) {
            let cardsNames = this.cards.names;
            for (let i = 0; player.cards.length < this.cardsQuantity; i++) {
                let random = Math.floor(Math.random() * (cardsNames.length));
                let randomCard = this.cards.getSingleCard(cardsNames[random]);
                if (!this.cards.isActive(cardsNames[random])) {
                    this.cards.activate(cardsNames[random]);
                    player.updateCards(randomCard);
                }
                else {
                    this.allotCards(player);
                }
            }
            return true;
        }
        /**
         * Allot cards for both players from cookies
         */
        allotCardsFromCookies() {
            let playerOneCards = this.cookie.getPlayerOneValues().cards;
            let playerTwoCards = this.cookie.getPlayerTwoValues().cards;
            for (let playerOneCard of playerOneCards) {
                this.cards.activate(playerOneCard);
                this.playerOne.updateCards(this.cards.getSingleCard(playerOneCard));
            }
            for (let playerTwoCard of playerTwoCards) {
                this.cards.activate(playerTwoCard);
                this.playerTwo.updateCards(this.cards.getSingleCard(playerTwoCard));
            }
        }
        /**
         * Clear back of cards for CPU only
         * @param {Canvas} canvas
         */
        clearCPUBackOfCards(canvas) {
            for (let playerTwoCard of this.playerTwo.cards) {
                let playerCardObject = playerTwoCard.backObject;
                canvas.fabricElement.remove(playerCardObject);
            }
        }
        /**
         * CPU move
         * @param {Canvas} canvas
         */
        CPUMove(canvas) {
            let that = this;
            that.drawBackOfCards(canvas, that.playerTwo);
            that.CPU_AI.move(canvas, that, that.playerTwo.cards);
            document.addEventListener("CPU moved", (e) => {
                e.stopImmediatePropagation();
                let eventPromise = new Promise((resolve, reject) => {
                    that.clearCPUBackOfCards(canvas);
                    resolve();
                    reject(() => {
                        throw new Error("Can`t clear back of cards!");
                    });
                });
                eventPromise.then(() => {
                    that.updateResources(that.playerOne.sources, that.playerTwo.sources);
                }).then(() => {
                    that.drawCards(canvas, that.playerOne);
                });
            });
        }
        /**
         * Draw back of cards from available cards
         * @param {Canvas} canvas
         * @param {Player} player
         */
        drawBackOfCards(canvas, player) {
            this.clearCPUBackOfCards(canvas);
            for (let i = 0; i < player.cards.length; i++) {
                let playerCardObject = player.cards[i].backObject;
                let paddingLeft = (i === 0)
                    ? this.cardsValues.padding
                    : (player.cards[i].backObject.getWidth()
                        + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
                playerCardObject.setLeft(paddingLeft);
                playerCardObject.setOpacity(1);
                canvas.fabricElement.add(playerCardObject);
            }
            this.highlightActivePlayer(player);
            canvas.fabricElement.renderAll();
        }
        /**
         * Clear old cards from canvas and draws cards from available cards
         * @param {Canvas} canvas
         * @param {Player} player
         */
        drawCards(canvas, player) {
            Arcomage.clearCardsFromCanvas(canvas, player);
            for (let i = 0; i < player.cards.length; i++) {
                let playerCardObject = player.cards[i].object;
                let paddingLeft = (i === 0)
                    ? 2 * this.cardsValues.padding
                    : (player.cards[i].object.getWidth() + 2 * this.cardsValues.padding) * i
                        + 2 * this.cardsValues.padding;
                playerCardObject.setLeft(paddingLeft);
                playerCardObject.setOpacity(0.9);
                canvas.fabricElement.add(playerCardObject);
            }
            this.highlightActivePlayer(player);
            canvas.fabricElement.renderAll();
        }
        /**
         * Update resources according to players sources and set cookies
         * @param {Object} playerOneSources
         * @param {Object} playerTwoSources
         */
        updateResources(playerOneSources, playerTwoSources) {
            let sources = Object.keys(this.params.relations);
            let newResourcesPlayerOne = {};
            let newResourcesPlayerTwo = {};
            for (let source of sources) {
                newResourcesPlayerOne[this.params.relations[source]] = playerOneSources[source];
                newResourcesPlayerTwo[this.params.relations[source]] = playerTwoSources[source];
            }
            this.playerOne.updateResources(newResourcesPlayerOne);
            this.playerTwo.updateResources(newResourcesPlayerTwo);
            this.cookie.setCookie(this.playerOne, this.playerTwo);
        }
    }
    ArcomageGame.Arcomage = Arcomage;
})(ArcomageGame || (ArcomageGame = {}));
