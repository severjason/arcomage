class Arcomage {
    
    private _playerOne:Player;
    private _playerTwo:Player;
    private _cardsQuantity:number;
    private _cards:ArcomageCards;
    

    constructor(params:Param, cards:ArcomageCards) {
        this._playerOne = new Player(params.firstPlayerName, params.firstPlayerValues,params.maxValues, params.mainCanvasValues);
        this._playerTwo = new Player(params.secondPlayerName, params.secondPlayerValues, params.maxValues, params.mainCanvasValues);
        this._cardsQuantity = params.cardsQuantity;
        this._cards = cards;
    }

    get firstPlayer() {
        return this._playerOne;
    }

    get secondPlayer() {
        return this._playerTwo;
    }

    applyCard(cardName:string, player:Player, enemy:Player) {
        this._cards.getSingleCard(cardName).action(player, enemy);
        //this.CARDS[cardName].isActive = false;
    }

    allotCards(player:Player) {
        let cardsNames:Array<string> = this._cards.names;

        for (let i = 0; player.cards.length < this._cardsQuantity; i++) {
            let random:number  = Math.floor(Math.random() * (cardsNames.length));
            let randomCard:any = this._cards.getSingleCard(cardsNames[random]);

            if (!randomCard.isActive) {
                randomCard.isActive = true;
                player.updateCards(randomCard);
            }
            else this.allotCards(player);
        }
    }

}







