var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class ArcomageCards extends ArcomageGame.ArcomageCardsContainer {
        constructor() {
            super();
        }
        /**
         * Get all cards
         * @returns {Object} cards
         */
        get cards() {
            return this.cardsArray;
        }
        /**
         * Get back of card src
         * @returns {Object} backOfCardSrc
         */
        get backOfCardSource() {
            return this.backOfCardSrc;
        }
        /**
         * Get discard text
         * @returns {string} discardTxt
         */
        get discardText() {
            return this.discardTxt;
        }
        /**
         *  Get cards names
         * @returns {string[]}
         */
        get names() {
            return Object.keys(this.cardsArray);
        }
        /**
         * Get one card by name
         * @param {string} cardName
         * @returns {Object}
         */
        getSingleCard(cardName) {
            return this.cards[cardName];
        }
        /**
         * Get card name by card description
         * @param {string} description
         * @returns {string} cardName
         */
        getCardNameByDesc(description) {
            for (let i = 0, length = this.names.length; i < length; i++) {
                let cardDesc = this.getSingleCard(this.names[i]).description;
                if (description === cardDesc) {
                    return this.names[i];
                }
            }
        }
        /**
         * Get card fabric object
         * @param {string} cardName
         * @returns {fabric.IGroup}
         */
        getCardObject(cardName) {
            return this.getSingleCard(cardName).object;
        }
        /**
         * Set card fabric object
         * @param {string} cardName
         * @param {fabric.IGroup} newObject
         */
        setCardObject(cardName, newObject) {
            if (typeof newObject === "object") {
                this.getSingleCard(cardName).object = newObject;
            }
        }
        /**
         * Get back of card fabric object
         * @param {string} cardName
         * @returns {fabric.IGroup}
         */
        getBackOfCardObject(cardName) {
            return this.getSingleCard(cardName).backObject;
        }
        /**
         * Set back of card fabric object
         * @param {string} cardName
         * @param {fabric.IGroup} newObject
         */
        setBackOfCardObject(cardName, newObject) {
            if (typeof newObject === "object") {
                this.getSingleCard(cardName).backObject = newObject;
            }
        }
        /**
         * Check if player have enough resources to use card
         * @param {string} cardName
         * @param {Player} player
         * @returns {boolean}
         */
        cardCanBeUsed(cardName, player) {
            let card = this.getSingleCard(cardName);
            let resourceName = Object.keys(card.resource)[0];
            let resourceValue = card.resource[resourceName];
            return (player.resources[resourceName] - resourceValue >= 0);
        }
        /**
         * Get card active status
         * @param {string} cardName
         * @returns {boolean}
         */
        isActive(cardName) {
            return this.getSingleCard(cardName).isActive;
        }
        /**
         * Change card status to false
         * @param {string} cardName
         */
        deactivate(cardName) {
            this.getSingleCard(cardName).isActive = false;
        }
        /**
         * Change card status to active
         * @param {string} cardName
         */
        activate(cardName) {
            this.getSingleCard(cardName).isActive = true;
        }
    }
    ArcomageGame.ArcomageCards = ArcomageCards;
})(ArcomageGame || (ArcomageGame = {}));
