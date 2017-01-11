class Arcomage {

    private _params:Param;
    private _playerOne:Player;
    private _playerTwo:Player;
    private _cardsQuantity:number;
    private _cards:ArcomageCards;
    private _playerOneTurn:boolean;
    private _playerTwoTurn:boolean;
    private _status:boolean;

    constructor(params:Param, cards:ArcomageCards) {
        this._playerOne = new Player(params.playerOneName, params.playerOneValues, params.maxValues, params.canvasValues);
        this._playerTwo = new Player(params.playerTwoName, params.playerTwoValues, params.maxValues, params.canvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
        this._params = params;
        this._playerOneTurn = true;
        this._playerTwoTurn = false;
        this._status = true;
    }

    get params():Param {
        return this._params;
    }

    get playerOne():Player {
        return this._playerOne;
    }

    get playerOneTurn():boolean {
        return this._playerOneTurn
    }

    get playerTwo():Player {
        return this._playerTwo;
    }

    get playerTwoTurn():boolean {
        return this._playerTwoTurn
    }

    getPlayerTurn(player:Player):boolean {
        return (player === this.playerOne) ? this.playerOneTurn : this.playerTwoTurn;
    }

    get cardsValues():any {
        return this._params.cardsValues;
    }

    get cards():ArcomageCards {
        return this._cards;
    }

    get cardsQuantity():number {
        return this._cardsQuantity
    }

    get status():boolean {
        return this._status;
    }

    gameOver():void {
        this._status = false;
    }

    isOn():boolean {
        return this.status;
    }

    playerOneMoved():void {
        this._playerOneTurn = false;
        this._playerTwoTurn = true;
    }

    playerTwoMoved():void {
        this._playerTwoTurn = false;
        this._playerOneTurn = true;
    }

    playerMoved(player:Player):void {
        return (player === this.playerOne) ? this.playerOneMoved() : this.playerTwoMoved();
    }

    highlightActivePlayer(player:Player):void {
        let playerOne:Player = (player === this.playerOne) ? this.playerOne : this.playerTwo;
        let playerTwo:Player = (player === this.playerOne) ? this.playerTwo : this.playerOne;
        playerOne.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.activeFillColor);
        playerTwo.nameObject.getObjects()[0].setFill(this.params.canvasValues.playersNamesText.fillColor);

    }

    applyCard(cardName:string, player:Player, enemy:Player) {
        this.cards.getSingleCard(cardName).action(player, enemy);
        this.cards.deactivate(cardName);
        if (player.towerLife === this.params.maxValues.tower || enemy.towerLife === 0) this.gameOver();
    }

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

    static clearCardsFromCanvas(canvas:Canvas, player:Player) {
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject:IGroup = player.cards[i].object;
            canvas.fabricElement.remove(playerCardObject);
        }
    }

    CPUMove(canvas:Canvas) {
        let that = this;
        setTimeout(function () {
            that.playerMoved(that.playerTwo);
            that.drawCards(canvas, that.playerOne);
        }, 1000)
    }

    drawCards(canvas:Canvas, player:Player) {
        let that = this;
        for (let i = 0; i < player.cards.length; i++) {
            let playerCardObject:IGroup = player.cards[i].object;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (that.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
        this.highlightActivePlayer(player);
        canvas.fabricElement.renderAll();
    }

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
    }


}







