class CPU_AI {

    private _cpu:Player;
    private _cards:ArcomageCards;
    private _params:any;

    constructor(cpu:Player, cards:ArcomageCards, params:Param) {
        this._cpu = cpu;
        this._cards = cards;
        this._params = params;
    }

    /**
     * Get playerTwo (CPU)
     * @returns {Player} _playerTwo
     */
    get cpu():Player {
        return this._cpu;
    }

    /**
     * Get cards class
     * @returns {ArcomageCards} _cards
     */
    get cards():ArcomageCards {
        return this._cards;
    }

    /**
     * Get relations from parameters
     * @returns {{mine, magic, dungeon}|any} relations
     */
    get relation():any {
        return this._params.canvasValues.relations;
    }

    /**
     * Get Param class
     * @returns {Param} _params
     */
    get params():any {
        return this._params;
    }

    /**
     * Apply card by card name  with small delay
     * @param {string} cardName
     * @param {Canvas} canvas
     * @param {Arcomage} game
     * @returns {Promise<any>}
     */
    applyCard(cardName:string, canvas:Canvas, game:Arcomage):Promise<any> {
        let that = this;
        let card:any = this.cards.getSingleCard(cardName);
        let backOfCardObject:IGroup = this.cards.getBackOfCardObject(cardName);
        let cardObject:IGroup = this.cards.getCardObject(cardName);

        return new Promise((resolve, reject)=> {
            if (game.isOn() && game.getPlayerTurn(that.cpu)) {
                if (game.cardAvailable(cardName, that.cpu)) {
                    game.playerMoved(that.cpu);
                    let basicValue:any = {
                        "top": backOfCardObject.getTop(),
                        "left": backOfCardObject.getLeft()
                    };
                    cardObject.setTop(100);
                    cardObject.setLeft((canvas.width - that.params.cardsValues.width) / 2);
                    backOfCardObject.animate({
                        "top": 100,
                        "left": (canvas.width - that.params.cardsValues.width) / 2
                    }, {
                        onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                        easing: fabric.util.ease.easeInCubic,
                        duration: 500,
                        onComplete: function () {
                            canvas.fabricElement.remove(backOfCardObject);
                            cardObject.setOpacity(1);
                            canvas.fabricElement.add(cardObject);
                            backOfCardObject.setTop(basicValue.top);
                            game.applyCard(cardName, that.cpu, game.playerOne);
                            backOfCardObject.animate({
                                "opacity": 0
                            }, {
                                onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                                duration: 100,
                                onComplete: function () {
                                    setTimeout(()=> {
                                        cardObject.animate({
                                            "top": 0,
                                            "opacity": 0
                                        }, {
                                            onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                                            duration: 500,
                                            onComplete: function () {
                                                that.cpu.removeCard(card);
                                                cardObject.setTop(basicValue.top);
                                                cardObject.setOpacity(1);
                                                canvas.fabricElement.remove(cardObject);
                                                resolve();
                                            }
                                        });
                                    }, 250);
                                }
                            });
                        }
                    });
                }
                else {
                    reject("CPU can`t apply card!");
                }
            }
        });
    }

    /**
     * Discard card by name
     * @param {string} cardName
     * @param {Canvas} canvas
     * @param {Arcomage} game
     * @returns {Promise<any>}
     */
    discardCard(cardName:string, canvas:Canvas, game:Arcomage):Promise<any> {
        let that = this;
        let card:any = this.cards.getSingleCard(cardName);
        let backOfCardObject:IGroup = this.cards.getBackOfCardObject(cardName);
        let backOfCardObjectTop:number = backOfCardObject.getTop();

        return new Promise((resolve, reject)=> {
            if (game.isOn() && game.getPlayerTurn(that.cpu)) {
                if (game.cardAvailable(cardName, that.cpu)) {
                    game.playerMoved(that.cpu);
                    that.cards.deactivate(cardName);
                    backOfCardObject.animate({
                        "top": 0,
                        "opacity": 0
                    }, {
                        onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                        duration: 500,
                        onComplete: function () {
                            that.cpu.removeCard(card);
                            backOfCardObject.setTop(backOfCardObjectTop);
                            canvas.fabricElement.remove(backOfCardObject);
                            resolve();
                        }
                    });
                }
                else {
                    reject("Card is not active!");
                }
            }
        });
    }

    /**
     * Get less resourceful card name
     * @param {any[]} cards
     * @returns {string} cardName
     */
    getLessResourcefulCard(cards:any[]):any {
        let resultCard:any = cards[0];
        for (let i = 0, length = cards.length; i < length; i++) {
            if (cards[i].resource[this.relation[cards[i].source]] <=
                resultCard.resource[this.relation[resultCard.source]]) {
                resultCard = cards[i];
            }
        }
        return resultCard.name;
    }

    /**
     * Get most resourceful card name
     * @param {any[]} cards
     * @returns {string} cardName
     */
    getMostResourcefulCard(cards:any[]):any {
        let resultCard:any = cards[0];
        for (let i = 0, length = cards.length; i < length; i++) {
            if (cards[i].resource[this.relation[cards[i].source]] >=
                resultCard.resource[this.relation[resultCard.source]]) {
                resultCard = cards[i];
            }
        }
        return resultCard.name;
    }

    /**
     * Get all cards that CPU can use from all available cards
     * @returns {any[]}
     */
    getAllCardsThatCanBeUsed():any[] {
        let availableCards:any[] = [];
        for (let i = 0; i < this.cpu.cards.length; i++) {
            if (this.cards.cardCanBeUsed(this.cpu.cards[i].name, this.cpu)) {
                availableCards.push(this.cpu.cards[i]);
            }
        }
        return availableCards;
    }

    /**
     * Check if at least one card can be used
     * @returns {boolean}
     */
    cardsCanBeUsed():boolean {
        for (let i = 0, cardsLength = this.cpu.cards.length; i < cardsLength; i++) {
            let cardName = this.cpu.cards[i].name;
            if (this.cards.cardCanBeUsed(cardName, this.cpu)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Apply most resourceful card if CPU can, else discard less resourceful card
     * @param {Canvas} canvas
     * @param {Arcomage} game
     * @returns {Promise<any>} discardCard or applyCard
     */
    move(canvas:Canvas, game:Arcomage):Promise<any> {
        return (!this.cardsCanBeUsed())
            ? this.discardCard(this.getLessResourcefulCard(this.cpu.cards), canvas, game)
            : this.applyCard(this.getMostResourcefulCard(this.getAllCardsThatCanBeUsed()), canvas, game);
    }
}