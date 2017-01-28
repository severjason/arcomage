class ArcomageCards extends ArcomageCardsContainer {

    constructor() {
        super();
    }

    /**
     * Get all cards
     * @returns {any} cards
     */
    get cards():any {
        return this._cards;
    }

    /**
     * Get back of card src
     * @returns {any} _backOfCardSrc
     */
    get backOfCardSrc():string {
        return this._backOfCardSrc;
    }

    /**
     * Get discard text
     * @returns {string} _discardText
     */
    get discardText():string {
        return this._discardText;
    }

    /**
     *  Get cards names
     * @returns {string[]}
     */
    get names():Array<string> {
        return Object.keys(this._cards);
    }

    /**
     * Get one card by name
     * @param {string} cardName
     * @returns {any} 
     */
    getSingleCard(cardName:string):any {
        return this.cards[cardName];
    }

    /**
     * Get card name by card description
     * @param {string} description
     * @returns {string} cardName
     */
    getCardNameByDesc(description:string):string {
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
     * @returns {any}
     */
    getCardObject(cardName:string):any {
        return this.getSingleCard(cardName).object;
    }

    /**
     * Set card fabric object
     * @param {string} cardName
     * @param {any} newObject
     */
    setCardObject(cardName:string, newObject:any):void {
        if (typeof newObject === "object") {
            this.getSingleCard(cardName).object = newObject;
        }
    }

    /**
     * Get back of card fabric object
     * @param {string} cardName
     * @returns {any}
     */
    getBackOfCardObject(cardName:string):any {
        return this.getSingleCard(cardName).backObject;
    }

    /**
     * Set back of card fabric object
     * @param {string} cardName
     * @param {any} newObject
     */
    setBackOfCardObject(cardName:string, newObject:any) {
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
    cardCanBeUsed(cardName:string, player:Player):boolean {
        let card = this.getSingleCard(cardName);
        let resourceName:string = Object.keys(card.resource)[0];
        let resourceValue:number = card.resource[resourceName];
        return (player.resources[resourceName] - resourceValue >= 0);
    }

    /**
     * Get card active status
     * @param {string} cardName
     * @returns {boolean}
     */
    isActive(cardName:string):boolean {
        return this.getSingleCard(cardName).isActive;
    }

    /**
     * Change card status to false
     * @param {string} cardName
     */
    deactivate(cardName:string):void {
        this.getSingleCard(cardName).isActive = false;
    }

    /**
     * Change card status to active
     * @param {string} cardName
     */
    activate(cardName:string):void {
        this.getSingleCard(cardName).isActive = true;
    }

}


