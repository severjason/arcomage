class CPUAI {

    private cpuPlayer: Player;
    private cardsObject: ArcomageCards;
    private paramsObject: Param;

    constructor(cpu: Player, cards: ArcomageCards, params: Param) {
        this.cpuPlayer = cpu;
        this.cardsObject = cards;
        this.paramsObject = params;
    }

    /**
     * Get playerTwo (CPU)
     * @returns {Player} cpuPlayer
     */
    get cpu(): Player {
        return this.cpuPlayer;
    }

    /**
     * Get cards class
     * @returns {ArcomageCards} cardsObject
     */
    get cards(): ArcomageCards {
        return this.cardsObject;
    }

    /**
     * Get relations from parameters
     * @returns {{mine, magic, dungeon}|Object} relations
     */
    get relation(): any {
        return this.paramsObject.canvasValues.relations;
    }

    /**
     * Get Param class
     * @returns {Param} paramsObject
     */
    get params(): Param {
        return this.paramsObject;
    }

    /**
     * Apply card by its name
     * @param {string} cardName
     * @param {Canvas} canvas
     * @param {Arcomage} game
     */
    public applyCard(cardName: string, canvas: Canvas, game: Arcomage): void {
        let that = this;
        let card: any = this.cards.getSingleCard(cardName);
        let backOfCardObject: IGroup = this.cards.getBackOfCardObject(cardName);
        let cardObject: IGroup = this.cards.getCardObject(cardName);

        if (game.isOn() && game.getPlayerTurn(that.cpu)) {
            if (game.cardAvailable(cardName, that.cpu)) {
                if (!card.playAgain) {
                    game.playerMoved(that.cpu);
                }
                let basicValue: any = {
                    top: backOfCardObject.getTop(),
                    left: backOfCardObject.getLeft(),
                };
                cardObject.setTop(100);
                cardObject.setLeft((canvas.width - that.params.cardsValues.width) / 2);
                backOfCardObject.animate({
                    top: 100,
                    left: (canvas.width - that.params.cardsValues.width) / 2,
                }, {
                    onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                    easing: fabric.util.ease.easeInCubic,
                    duration: 500,
                    onComplete: () => {
                        canvas.fabricElement.remove(backOfCardObject);
                        cardObject.setOpacity(1);
                        canvas.fabricElement.add(cardObject);
                        backOfCardObject.setTop(basicValue.top);
                        game.applyCard(cardName, that.cpu, game.playerOne);
                        backOfCardObject.animate({
                            opacity: 0,
                        }, {
                            onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                            duration: 100,
                            onComplete:  () => {
                                setTimeout(() => {
                                    cardObject.animate({
                                        top: 0,
                                        opacity: 0,
                                    }, {
                                        onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                                        duration: 500,
                                        onComplete: () => {
                                            that.cpu.removeCard(card);
                                            cardObject.setTop(basicValue.top);
                                            cardObject.setOpacity(1);
                                            canvas.fabricElement.remove(cardObject);
                                            if (game.allotCards(that.cpu)) {
                                                if (card.playAgain) {
                                                    game.drawBackOfCards(canvas, that.cpu);
                                                    that.move(canvas, game);
                                                } else {
                                                    document.dispatchEvent(new CustomEvent("CPU moved"));
                                                }
                                            }
                                        },
                                    });
                                }, 250);
                            },
                        });
                    },
                });
            }
        }
    }
    /**
     * Discard card by its name
     * @param {string} cardName
     * @param {Canvas} canvas
     * @param {Arcomage} game
     */
    public discardCard(cardName: string, canvas: Canvas, game: Arcomage): void {
        let that = this;
        let card: any = this.cards.getSingleCard(cardName);
        let backOfCardObject: IGroup = this.cards.getBackOfCardObject(cardName);
        let backOfCardObjectTop: number = backOfCardObject.getTop();

        if (game.isOn() && game.getPlayerTurn(that.cpu)) {
            if (game.cardAvailable(cardName, that.cpu)) {
                game.playerMoved(that.cpu);
                that.cards.deactivate(cardName);
                backOfCardObject.animate({
                    top: 0,
                    opacity: 0,
                }, {
                    onChange: canvas.fabricElement.renderAll.bind(canvas.fabricElement),
                    duration: 500,
                    onComplete: () => {
                        that.cpu.removeCard(card);
                        backOfCardObject.setTop(backOfCardObjectTop);
                        canvas.fabricElement.remove(backOfCardObject);
                        if (game.allotCards(that.cpu)) {
                            document.dispatchEvent(new CustomEvent("CPU moved"));
                        }
                    },
                });
            }
        }
    }

    /**
     * Get less resourceful card name
     * @param {Object[]} cards
     * @returns {string} cardName
     */
    public getLessResourcefulCard(cards: any[]): any {
        let resultCard: any = cards[0];
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
     * @param {Object[]} cards
     * @returns {string} cardName
     */
    public getMostResourcefulCard(cards: any[]): any {
        let resultCard: any = cards[0];
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
     * @returns {Object[]}
     */
    public getAllCardsThatCanBeUsed(): any[] {
        let availableCards: any[] = [];
        for (let card of this.cpu.cards) {
            if (this.cards.cardCanBeUsed(card.name, this.cpu)) {
                availableCards.push(card);
            }
        }
        return availableCards;
    }

    /**
     * Check if at least one card can be used
     * @returns {boolean}
     */
    public cardsCanBeUsed(): boolean {
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
     */
    public move(canvas: Canvas, game: Arcomage): void {
        return (!this.cardsCanBeUsed())
            ? this.discardCard(this.getLessResourcefulCard(this.cpu.cards), canvas, game)
            : this.applyCard(this.getMostResourcefulCard(this.getAllCardsThatCanBeUsed()), canvas, game);
    }
}
