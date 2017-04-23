namespace ArcomageGame {
    "use strict";

    import IGroup = fabric.IGroup;

    export class CPUAI {

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
                                onComplete: () => {
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
                                                        that.move(canvas, game, that.cpu.cards);
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
         * Create new array with cards that CPU can use
         * @param {Object[]} cards
         * @returns {Object[]}
         */
        public getAllCardsThatCanBeUsed(cards: any[]): any[] {
            let availableCards: any[] = [];
            for (let card of cards) {
                if (this.cards.cardCanBeUsed(card.name, this.cpu)) {
                    availableCards.push(card);
                }
            }
            return availableCards;
        }

        /**
         * Check if at least one card can be used
         * @param {Object[]} cards
         * @returns {boolean}
         */
        public cardsCanBeUsed(cards: any[]): boolean {
            for (let i = 0, cardsLength = cards.length; i < cardsLength; i++) {
                let cardName = cards[i].name;
                if (this.cards.cardCanBeUsed(cardName, this.cpu)) {
                    return true;
                }
            }
            return false;
        }

        /**
         * Apply most resourceful card or discard less resourceful card
         * Some particular cards CPU use only under specific conditions
         * @param {Canvas} canvas
         * @param {Arcomage} game
         * @param {Object[]} CPUcards
         */
        public move(canvas: Canvas, game: Arcomage, CPUcards: any[]): void {
            let allCards: any = this.cards.cards;
            let that = this;

            function removeCard(cardsArray: any[], cardToRemoveName: string): any[] {
                let resultArray: any[] = [];
                for (let card of cardsArray) {
                    if (card.name !== cardToRemoveName) {
                        resultArray.push(card);
                    }
                }
                return resultArray;
            }

            if (!that.cardsCanBeUsed(CPUcards)) {
                that.discardCard(that.getLessResourcefulCard(that.cpu.cards), canvas, game);
            } else {
                let availableCards: any = that.getAllCardsThatCanBeUsed(CPUcards);
                let mostResCardName: string = that.getMostResourcefulCard(availableCards);
                if (mostResCardName === allCards.berserker.name && that.cpu.towerLife >= 5) {
                    that.move(canvas, game,
                        removeCard(availableCards, allCards.berserker.name));

                } else if (mostResCardName === allCards.cave_river.name &&
                    (that.cpu.wallLife <= game.playerOne.wallLife)) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.defective_ore.name
                    && (that.cpu.resources.bricks < game.playerOne.resources.bricks)) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.discord.name
                    && that.cpu.towerLife < game.playerOne.towerLife
                    && that.cpu.towerLife < 8) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.earthquake.name
                    && that.cpu.sources.mine < game.playerOne.sources.mine) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.goblin_mob.name
                    && that.cpu.wallLife < 3) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.parity.name &&
                    that.cpu.sources.magic > game.playerOne.sources.magic) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.power_burn.name && that.cpu.towerLife < 10) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.shift.name
                    && that.cpu.wallLife > game.playerOne.wallLife
                    && that.cpu.wallLife !== 0) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.technology_copping.name
                    && that.cpu.sources.mine >= game.playerOne.sources.mine) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else if (mostResCardName === allCards.tremor.name
                    && (game.playerOne.wallLife <= 5 || that.cpu.wallLife < game.playerOne.wallLife)) {
                    that.move(canvas, game, removeCard(availableCards, mostResCardName));

                } else {
                    that.applyCard(mostResCardName, canvas, game);
                }
            }
        }
    }
}
