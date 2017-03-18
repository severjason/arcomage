class ArcomageCards extends ArcomageCardsContainer {

    constructor() {
        super();
    }

    /**
     * Get all cards
     * @returns {Object} cards
     */
    get cards(): any {
        return this.cardsArray;
    }

    /**
     * Get back of card src
     * @returns {Object} backOfCardSrc
     */
    get backOfCardSource(): string {
        return this.backOfCardSrc;
    }

    /**
     * Get discard text
     * @returns {string} discardTxt
     */
    get discardText(): string {
        return this.discardTxt;
    }

    /**
     *  Get cards names
     * @returns {string[]}
     */
    get names(): string[] {
        return Object.keys(this.cardsArray);
    }

    /**
     * Get one card by name
     * @param {string} cardName
     * @returns {Object}
     */
    public getSingleCard(cardName: string): any {
        return this.cards[cardName];
    }

    /**
     * Get card name by card description
     * @param {string} description
     * @returns {string} cardName
     */
    public getCardNameByDesc(description: string): string {
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
    public getCardObject(cardName: string): fabric.IGroup {
        return this.getSingleCard(cardName).object;
    }

    /**
     * Set card fabric object
     * @param {string} cardName
     * @param {fabric.IGroup} newObject
     */
    public setCardObject(cardName: string, newObject: fabric.IGroup): void {
        if (typeof newObject === "object") {
            this.getSingleCard(cardName).object = newObject;
        }
    }

    /**
     * Get back of card fabric object
     * @param {string} cardName
     * @returns {fabric.IGroup}
     */
    public getBackOfCardObject(cardName: string): fabric.IGroup {
        return this.getSingleCard(cardName).backObject;
    }

    /**
     * Set back of card fabric object
     * @param {string} cardName
     * @param {fabric.IGroup} newObject
     */
    public setBackOfCardObject(cardName: string, newObject: fabric.IGroup) {
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
    public cardCanBeUsed(cardName: string, player: Player): boolean {
        let card = this.getSingleCard(cardName);
        let resourceName: string = Object.keys(card.resource)[0];
        let resourceValue: number = card.resource[resourceName];
        return (player.resources[resourceName] - resourceValue >= 0);
    }

    /**
     * Get card active status
     * @param {string} cardName
     * @returns {boolean}
     */
    public isActive(cardName: string): boolean {
        return this.getSingleCard(cardName).isActive;
    }

    /**
     * Change card status to false
     * @param {string} cardName
     */
    public deactivate(cardName: string): void {
        this.getSingleCard(cardName).isActive = false;
    }

    /**
     * Change card status to active
     * @param {string} cardName
     */
    public activate(cardName: string): void {
        this.getSingleCard(cardName).isActive = true;
    }

}
