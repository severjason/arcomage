namespace ArcomageGame {
    "use strict";

    import IGroup = fabric.IGroup;

    export class Arcomage {

        /**
         * Clear canvas from cards objects
         * @param {Canvas} canvas
         * @param {Player} player
         */
        public static clearCardsFromCanvas(canvas: Canvas, player: Player) {
            for (let card of player.cards) {
                let playerCardObject: IGroup = card.object;
                canvas.fabricElement.remove(playerCardObject);
            }
        }

        private paramsObject: Param;
        private playerOneObject: Player;
        private playerTwoObject: Player;
        private CPUAI: CPUAI;
        private cardsQty: number;
        private cardsObject: ArcomageCards;
        private playerOneTurnStatus: boolean;
        private playerTwoTurnStatus: boolean;
        private gameStatus: boolean;
        private DOMObject: DOM;
        private cookieObject: Cookie;
        private difficultyLevel: number;

        constructor(params: Param,
                    cards: ArcomageCards,
                    dom: DOM,
                    cookie: Cookie,
                    playerOneName: string,
                    difficulty: number,
                    playerTwoName?: string,
                    playerOneValuesFromCookie?: any,
                    playerTwoValuesFromCookie?: any) {
            this.playerOneObject = new Player(
                playerOneName || params.playerOneName,
                playerOneValuesFromCookie || params.playerOneValues,
                params.maxValues,
                params.canvasValues,
                difficulty);
            this.playerTwoObject = new Player(
                playerTwoName || params.playerTwoName,
                playerTwoValuesFromCookie || params.playerTwoValues,
                params.maxValues,
                params.canvasValues,
                difficulty);
            this.cardsQty = params.cardsQuantity;
            this.cardsObject = cards;
            this.paramsObject = params;
            this.playerOneTurnStatus = true;
            this.playerTwoTurnStatus = false;
            this.gameStatus = true;
            this.DOMObject = dom;
            this.cookieObject = cookie;
            this.difficultyLevel = difficulty;
            this.CPUAI = new CPUAI(this.playerTwoObject, cards, params);
        }

        /**
         * Get Param class
         * @returns {Param} paramsObject
         */
        get params(): Param {
            return this.paramsObject;
        }

        /**
         * Get player one
         * @returns {Player} playerOneObject
         */
        get playerOne(): Player {
            return this.playerOneObject;
        }

        /**
         * Get player one turn
         * @returns {boolean} playerOneTurnStatus
         */
        get playerOneTurn(): boolean {
            return this.playerOneTurnStatus;
        }

        /**
         * Get player two
         * @returns {Player} playerTwoObject
         */
        get playerTwo(): Player {
            return this.playerTwoObject;
        }

        /**
         * Get player two turn
         * @returns {boolean} playerTwoTurnStatus
         */
        get playerTwoTurn(): boolean {
            return this.playerTwoTurnStatus;
        }

        /**
         * Get CPU AI class
         * @returns {CPU_AI} CPUAI
         */
        get CPU_AI(): CPUAI {
            return this.CPUAI;
        }

        /**
         * Get players turn
         * @param {Player} player
         * @returns {boolean}
         */
        public getPlayerTurn(player: Player): boolean {
            return (player === this.playerOne) ? this.playerOneTurn : this.playerTwoTurn;
        }

        /**
         * Get cardValues from params
         * @returns {Object} paramsObject.cardsValues
         */
        get cardsValues(): any {
            return this.paramsObject.cardsValues;
        }

        /**
         * Get card class
         * @returns {ArcomageCards} cardsObject
         */
        get cards(): ArcomageCards {
            return this.cardsObject;
        }

        /**
         * Get cards quantity from params
         * @returns {number} cardsQty
         */
        get cardsQuantity(): number {
            return this.cardsQty;
        }

        /**
         * Get game status
         * @returns {boolean} gameStatus
         */
        get status(): boolean {
            return this.gameStatus;
        }

        /**
         * Get DOM class
         * @returns {DOM} DOMObject
         */
        get DOM(): DOM {
            return this.DOMObject;
        }

        /**
         * Get Cookie class
         * @returns {Cookie} cookieObject
         */
        get cookie(): Cookie {
            return this.cookieObject;
        }

        /**
         * Get difficulty level
         * @returns {number} difficultyLevel
         */
        get difficulty(): number {
            return this.difficultyLevel;
        }

        /**
         * Change game status to false, destroy cookie and show gameOver message
         * @param {Player} player
         */
        public gameOver(player: Player): void {
            this.gameStatus = false;
            let playerOneWin = (player === this.playerOne);
            this.cookie.setStatusCookie(this.status);
            this.DOM.showGameOverMessage(playerOneWin, this.playerOne.moves, this.playerOne.scores);
        }

        /**
         * Check if game is on
         * @returns {boolean} status
         */
        public isOn(): boolean {
            return this.status;
        }

        /**
         * Update player one moves and change turn to player two
         */
        public playerOneMoved(): void {
            this.playerOne.updateMoves();
            this.playerOneTurnStatus = false;
            this.playerTwoTurnStatus = true;
        }

        /**
         * Update player two moves and change turn to player one
         */
        public playerTwoMoved(): void {
            this.playerTwo.updateMoves();
            this.playerTwoTurnStatus = false;
            this.playerOneTurnStatus = true;
        }

        /**
         * Update player moves and change turn to another player
         * @param {Player} player
         */
        public playerMoved(player: Player): void {
            (player === this.playerOne) ? this.playerOneMoved() : this.playerTwoMoved();
        }

        /**
         * Highlight active player
         * @param {Player} player
         */
        public highlightActivePlayer(player: Player): void {
            let playerOne: Player = (player === this.playerOne) ? this.playerOne : this.playerTwo;
            let playerTwo: Player = (player === this.playerOne) ? this.playerTwo : this.playerOne;
            playerOne.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.activeFillColor);
            playerTwo.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.fillColor);

        }

        /**
         * Apply card by its name and check if game is over
         * @param {string} cardName
         * @param {Player} player
         * @param {Player} enemy
         */
        public applyCard(cardName: string, player: Player, enemy: Player) {
            this.cards.getSingleCard(cardName).action(player, enemy);
            player.updateScores(this.cards.getScore(cardName) * (1 + this.difficulty / 2));
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
        public cardAvailable(cardName: string, player: Player) {
            if (this.cards.isActive(cardName)) {
                let switcher = false;
                for (let card of player.cards) {
                    if (this.cards.getSingleCard(cardName) === card) {
                        switcher = true;
                    }
                }
                return switcher;
            } else {
                return false;
            }
        }

        /**
         * Randomly allot card to player
         * @param {Player} player
         * @returns {boolean}
         */
        public allotCards(player: Player): boolean {

            let cardsNames: string[] = this.cards.names;

            for (let i = 0; player.cards.length < this.cardsQuantity; i++) {

                let random: number = Math.floor(Math.random() * (cardsNames.length));
                let randomCard: any = this.cards.getSingleCard(cardsNames[random]);

                if (!this.cards.isActive(cardsNames[random])) {
                    this.cards.activate(cardsNames[random]);
                    player.updateCards(randomCard);
                } else {
                    this.allotCards(player);
                }
            }
            return true;
        }

        /**
         * Allot cards for both players from cookies
         */
        public allotCardsFromCookies(): void {
            let playerOneCards: string[] = this.cookie.getPlayerOneValues().cards;
            let playerTwoCards: string[] = this.cookie.getPlayerTwoValues().cards;
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
        public clearCPUBackOfCards(canvas: Canvas) {
            for (let playerTwoCard of  this.playerTwo.cards) {
                let playerCardObject: IGroup = playerTwoCard.backObject;
                canvas.fabricElement.remove(playerCardObject);
            }
        }

        /**
         * CPU move
         * @param {Canvas} canvas
         */
        public CPUMove(canvas: Canvas) {
            let that = this;
            that.drawBackOfCards(canvas, that.playerTwo);
            that.CPU_AI.move(canvas, that, that.playerTwo.cards);
            document.addEventListener("CPU moved", (e) => {
                e.stopImmediatePropagation();
                let eventPromise: Promise<any> = new Promise((resolve, reject) => {
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
        public drawBackOfCards(canvas: Canvas, player: Player) {
            this.clearCPUBackOfCards(canvas);
            for (let i = 0; i < player.cards.length; i++) {
                let playerCardObject: IGroup = player.cards[i].backObject;
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
        public drawCards(canvas: Canvas, player: Player) {
            Arcomage.clearCardsFromCanvas(canvas, player);
            for (let i = 0; i < player.cards.length; i++) {
                let playerCardObject: IGroup = player.cards[i].object;
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
        public updateResources(playerOneSources: any, playerTwoSources: any): void {
            let sources: string[] = Object.keys(this.params.relations);
            let newResourcesPlayerOne: any = {};
            let newResourcesPlayerTwo: any = {};
            for (let source of sources) {
                newResourcesPlayerOne[this.params.relations[source]] = playerOneSources[source];
                newResourcesPlayerTwo[this.params.relations[source]] = playerTwoSources[source];
            }
            this.playerOne.updateResources(newResourcesPlayerOne);
            this.playerTwo.updateResources(newResourcesPlayerTwo);
            this.cookie.setCookie(this.playerOne, this.playerTwo);
        }
    }
}
