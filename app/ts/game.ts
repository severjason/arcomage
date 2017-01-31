class Arcomage {

    private _params:Param;
    private _playerOne:Player;
    private _playerTwo:Player;
    private _CPU_AI:CPU_AI;
    private _cardsQuantity:number;
    private _cards:ArcomageCards;
    private _playerOneTurn:boolean;
    private _playerTwoTurn:boolean;
    private _status:boolean;
    private _DOM:DOM;
    private _cookie:Cookie;

    constructor(params:Param,
                cards:ArcomageCards,
                dom:DOM,
                cookie:Cookie,
                playerOneName?:string,
                playerTwoName?:string,
                playerOneValuesFromCookie?:any,
                playerTwoValuesFromCookie?:any) {
        this._playerOne = new Player(
            playerOneName || params.playerOneName,
            playerOneValuesFromCookie || params.playerOneValues,
            params.maxValues,
            params.canvasValues);
        this._playerTwo = new Player(
            playerTwoName || params.playerTwoName,
            playerTwoValuesFromCookie || params.playerTwoValues,
            params.maxValues,
            params.canvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
        this._params = params;
        this._playerOneTurn = true;
        this._playerTwoTurn = false;
        this._status = true;
        this._DOM = dom;
        this._cookie = cookie;
        this._CPU_AI = new CPU_AI(this._playerTwo, cards, params);
    }

    /**
     * Get Param class
     * @returns {Param} _params
     */
    get params():Param {
        return this._params;
    }

    /**
     * Get player one
     * @returns {Player} _playerOne
     */
    get playerOne():Player {
        return this._playerOne;
    }

    /**
     * Get player one turn
     * @returns {boolean} _playerOneTurn
     */
    get playerOneTurn():boolean {
        return this._playerOneTurn
    }

    /**
     * Get player two
     * @returns {Player} _playerTwo
     */
    get playerTwo():Player {
        return this._playerTwo;
    }

    /**
     * Get player two turn
     * @returns {boolean} _playerTwoTurn
     */
    get playerTwoTurn():boolean {
        return this._playerTwoTurn
    }

    /**
     * Get CPU AI class
     * @returns {CPU_AI} _CPU_AI
     */
    get CPU_AI():CPU_AI {
        return this._CPU_AI;
    }

    /**
     * Get players turn
     * @param {Player} player
     * @returns {boolean}
     */
    getPlayerTurn(player:Player):boolean {
        return (player === this.playerOne) ? this.playerOneTurn : this.playerTwoTurn;
    }

    /**
     * Get cardValues from params
     * @returns {any} _params.cardsValues
     */
    get cardsValues():any {
        return this._params.cardsValues;
    }

    /**
     * Get card class
     * @returns {ArcomageCards} _cards
     */
    get cards():ArcomageCards {
        return this._cards;
    }

    /**
     * Get cards quantity from params
     * @returns {number} _cardsQuantity
     */
    get cardsQuantity():number {
        return this._cardsQuantity
    }

    /**
     * Get game status
     * @returns {boolean} _status
     */
    get status():boolean {
        return this._status;
    }

    /**
     * Get DOM class
     * @returns {DOM} _DOM
     */
    get DOM():DOM {
        return this._DOM;
    }

    /**
     * Get Cookie class
     * @returns {Cookie} _cookie
     */
    get cookie():Cookie {
        return this._cookie;
    }

    /**
     * Change game status to false, destroy cookie and show gameOver message
     * @param {Player} player
     */
    gameOver(player:Player):void {
        this._status = false;
        let playerOneWin = (player === this.playerOne) ? true : false;
        this.cookie.setStatusCookie(this.status);
        this.DOM.showGameOverMessage(playerOneWin, this.playerOne.moves);
    }

    /**
     * Check if game is on
     * @returns {boolean} status
     */
    isOn():boolean {
        return this.status;
    }

    /**
     * Update player one moves and change turn to player two
     */
    playerOneMoved():void {
        this.playerOne.updateMoves();
        this._playerOneTurn = false;
        this._playerTwoTurn = true;
    }

    /**
     * Update player two moves and change turn to player one
     */
    playerTwoMoved():void {
        this.playerTwo.updateMoves();
        this._playerTwoTurn = false;
        this._playerOneTurn = true;
    }

    /**
     * Update player moves and change turn to another player
     * @param {Player} player
     */
    playerMoved(player:Player):void {
        (player === this.playerOne) ? this.playerOneMoved() : this.playerTwoMoved();
    }

    /**
     * Highlight active player
     * @param {Player} player
     */
    highlightActivePlayer(player:Player):void {
        let playerOne:Player = (player === this.playerOne) ? this.playerOne : this.playerTwo;
        let playerTwo:Player = (player === this.playerOne) ? this.playerTwo : this.playerOne;
        playerOne.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.activeFillColor);
        playerTwo.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.fillColor);

    }

    /**
     * Apply card by its name
     * @param {string} cardName
     * @param {Player} player
     * @param {Player} enemy
     */
    applyCard(cardName:string, player:Player, enemy:Player) {
        this.cards.getSingleCard(cardName).action(player, enemy);
        this.cards.deactivate(cardName);
        if (player.towerLife === this.params.maxValues.tower || enemy.towerLife === 0) this.gameOver(player);
    }

    /**
     * Check if player can use card
     * @param {string} cardName
     * @param {Player} player
     * @returns {boolean}
     */
    cardAvailable(cardName:string, player:Player) {
        if (this.cards.isActive(cardName)) {
            let switcher = false;
            for (let i = 0; i < player.cards.length; i++) {
                if (this.cards.getSingleCard(cardName) === player.cards[i]) {
                    switcher = true;
                }
            }
            return switcher;
        } else return false;
    }

    /**
     * Randomly allot card to player
     * @param {Player} player
     * @returns {boolean}
     */
    allotCards(player:Player):boolean {

        let cardsNames:Array<string> = this.cards.names;

        for (let i = 0; player.cards.length < this.cardsQuantity; i++) {

            let random:number = Math.floor(Math.random() * (cardsNames.length));
            let randomCard:any = this.cards.getSingleCard(cardsNames[random]);

            if (!this.cards.isActive(cardsNames[random])) {
                this.cards.activate(cardsNames[random]);
                player.updateCards(randomCard);
            }
            else this.allotCards(player);
        }
        return true;
    }

    /**
     * Allot cards for both players from cookies
     */
    allotCardsFromCookies():void {
        let playerOneCards:string[] = this.cookie.getPlayerOneValues().cards;
        let playerTwoCards:string[] = this.cookie.getPlayerTwoValues().cards;
        for (let i = 0; i < playerOneCards.length; i++) {
            this.cards.activate(playerOneCards[i]);
            this.playerOne.updateCards(this.cards.getSingleCard(playerOneCards[i]));
        }
        for (let i = 0; i < playerTwoCards.length; i++) {
            this.cards.activate(playerTwoCards[i]);
            this.playerTwo.updateCards(this.cards.getSingleCard(playerTwoCards[i]));
        }
    }

    /**
     * Clear canvas from cards objects
     * @param {Canvas} canvas
     * @param {Player} player
     */
    static clearCardsFromCanvas(canvas:Canvas, player:Player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject:IGroup = player.cards[i].object;
            canvas.fabricElement.remove(playerCardObject);
        }
    }

    /**
     * Clear back of cards for CPU only
     * @param {Canvas} canvas
     */
    clearCPUBackOfCards(canvas:Canvas) {
        for (let i = 0; i < this.playerTwo.cards.length; i++) {
            let playerCardObject:IGroup = this.playerTwo.cards[i].backObject;
            canvas.fabricElement.remove(playerCardObject);
        }
    }

    /**
     * CPU move
     * @param {Canvas} canvas
     */
    CPUMove(canvas:Canvas) {
        let that = this;
        that.drawBackOfCards(canvas, that.playerTwo);
        that.CPU_AI.move(canvas, that).then(()=> {
            let eventPromise:Promise<any> = new Promise((resolve, reject) => {
                (that.allotCards(that.playerTwo))
                    ? resolve()
                    : reject("Can`t allot cards!");
            });
            eventPromise.then(() => {
                that.clearCPUBackOfCards(canvas);
            }).then(()=> {
                that.updateResources(that.playerOne.sources, that.playerTwo.sources);
                that.drawCards(canvas, that.playerOne);
            });
        });
    }

    /**
     * Draw back of cards from available cards
     * @param {Canvas} canvas
     * @param {Player} player
     */
    drawBackOfCards(canvas:Canvas, player:Player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject:IGroup = player.cards[i].backObject;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (this.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
        this.highlightActivePlayer(player);
        canvas.fabricElement.renderAll();
    }

    /**
     * Draw cards from available cards
     * @param {Canvas} canvas
     * @param {Player} player
     */
    drawCards(canvas:Canvas, player:Player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject:IGroup = player.cards[i].object;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (this.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
        this.highlightActivePlayer(player);
        canvas.fabricElement.renderAll();
    }

    /**
     * Update resources according to players sources and set cookies
     * @param {any} playerOneSources
     * @param {any} playerTwoSources
     */
    updateResources(playerOneSources:any, playerTwoSources:any):void {
        let sources:Array<string> = Object.keys(this.params.relations);
        let newResourcesPlayerOne:any = {};
        let newResourcesPlayerTwo:any = {};
        for (let i = 0; i < sources.length; i++) {
            newResourcesPlayerOne[this.params.relations[sources[i]]] = playerOneSources[sources[i]];
            newResourcesPlayerTwo[this.params.relations[sources[i]]] = playerTwoSources[sources[i]];
        }
        this.playerOne.updateResources(newResourcesPlayerOne);
        this.playerTwo.updateResources(newResourcesPlayerTwo);
        this.cookie.setCookie(this.playerOne, this.playerTwo);
    }
}







