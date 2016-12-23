class Arcomage {

    private _params:Param;
    private _playerOne:Player;
    private _playerTwo:Player;
    private _cardsQuantity:number;
    private _cards:ArcomageCards;
    private _playerOneTurn:boolean;
    private _playerTwoTurn:boolean;

    constructor(params:Param, cards:ArcomageCards) {
        this._playerOne = new Player(params.firstPlayerName, params.firstPlayerValues, params.maxValues, params.mainCanvasValues);
        this._playerTwo = new Player(params.secondPlayerName, params.secondPlayerValues, params.maxValues, params.mainCanvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
        this._params = params;
        this._playerOneTurn = true;
        this._playerTwoTurn = false;
    }

    get params():Param {
        return this._params;
    }

    get firstPlayer():Player {
        return this._playerOne;
    }

    get firstPlayerTurn():boolean {
        return this._playerOneTurn
    }

    get secondPlayer():Player {
        return this._playerTwo;
    }

    get secondPlayerTurn():boolean {
        return this._playerTwoTurn
    }

    firstPlayerMoved():void {
        this._playerOneTurn = false;
        this._playerTwoTurn = true;
    }

    secondPlayerMoved():void {
        this._playerTwoTurn = false;
        this._playerOneTurn = true;
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

    applyCard(cardName:string, player:Player, enemy:Player) {
        this._cards.getSingleCard(cardName).action(player, enemy);
        //this.CARDS[cardName].isActive = false;
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

    drawCards(canvas:Canvas) {
        let that = this;
        for (let i = 0; i < that.firstPlayer.cards.length; i++) {
            let playerCardObject:IGroup = that.firstPlayer.cards[i].object;
            let paddingLeft = (i === 0)
                ? this.cardsValues.padding
                : (that.cardsValues.width + 2 * this.cardsValues.padding) * i + this.cardsValues.padding;
            playerCardObject.setLeft(paddingLeft);
            playerCardObject.setOpacity(1);
            canvas.fabricElement.add(playerCardObject);
        }
    }

    updateResources(playerOneSources:any, playerTwoSources:any):void {
        let sources:Array<string> = Object.keys(this.params.relations);
        let newResourcesPlayerOne:any = {};
        let newResourcesPlayerTwo:any = {};
        for (let i = 0; i < sources.length; i++) {
            newResourcesPlayerOne[this.params.relations[sources[i]]] = playerOneSources[sources[i]];
            newResourcesPlayerTwo[this.params.relations[sources[i]]] = playerTwoSources[sources[i]];
        }
        this.firstPlayer.updateResources(newResourcesPlayerOne);
        this.secondPlayer.updateResources(newResourcesPlayerTwo);
    }


}







