class ArcomageCards {
    constructor() {
        this._cards = {
            "great_wall": {
                "source": "mine",
                "description": "Great Wall",
                "text": {
                    "ru": "+8 to wall"
                },
                "src": "./images/cards/great_wall.jpg",
                "resource": {
                    "bricks": 2
                },
                "action": function (player, enemy) {
                    player.updateResources({
                        "bricks": -2
                    });
                    player.updateWallLife(8);
                },
                "isActive": false,
                "object": {},
                "backObject": {}
            },
            "new_equipment": {
                "source": "mine",
                "description": "New equipment",
                "text": {
                    "ru": "+1 to all mines"
                },
                "src": "./images/cards/new_equipment.jpg",
                "resource": {
                    "bricks": 2
                },
                "action": function (player, enemy) {
                    player.updateResources({
                        "bricks": -2
                    });
                    player.updateSources({"mine": 1});
                    enemy.updateSources({"mine": 1});
                },
                "isActive": false,
                "object": {},
                "backObject": {}
            },
            "amethyst": {
                "source": "magic",
                "description": "Amethyst",
                "text": {
                    "ru": "+3 to tower"
                },
                "src": "./images/cards/amethyst.jpg",
                "resource": {
                    "gems": 8
                },
                "action": function (player, enemy) {
                    player.updateResources({
                        "gems": -8
                    });
                    player.updateTowerLife(3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}
            },
            "werewolf": {
                "source": "dungeon",
                "description": "Оборотень",
                "text": {
                    "ru": "Если стена больше,\nчем у врага, то\n6 урона башне врага,\nиначе 9 урона"
                },
                "src": "./images/cards/werewolf.jpg",
                "resource": {
                    "beasts": 5
                },
                "action": function (player, enemy) {
                    player.updateResources({
                        "beasts": -5
                    });
                    enemy.takeDamage(9);
                },
                "isActive": false,
                "object": {},
                "backObject": {}
            },
            "earthquake": {
                "source": "mine",
                "description": "Землетрясение",
                "text": {
                    "ru": "-1 шахты всех игроков"
                },
                "src": "./images/cards/earthquake.jpg",
                "resource": {
                    "bricks": 0
                },
                "action": function (player, enemy) {
                    player.updateSources({ "mine": -1 });
                    enemy.updateSources({ "mine": -1 });
                },
                "isActive": false,
                "object": {},
                "backObject": {}
            }
        };
        this._discardText = "DISCARD";
        this._backOfCardSrc = "./images/cards/back.png";
    }
    /**
     * Get all cards
     * @returns {any} cards
     */
    get cards() {
        return this._cards;
    }
    /**
     * Get back of card src
     * @returns {any} _backOfCardSrc
     */
    get backOfCardSrc() {
        return this._backOfCardSrc;
    }
    /**
     * Get discard text
     * @returns {string} _discardText
     */
    get discardText() {
        return this._discardText;
    }
    /**
     *  Get cards names
     * @returns {string[]}
     */
    get names() {
        return Object.keys(this._cards);
    }
    /**
     * Get one card
     * @param {string} card
     * @returns {any} cards[card]
     */
    getSingleCard(card) {
        return this.cards[card];
    }
    /**
     * Get card fabric object
     * @param {string} cardName
     * @returns {any}
     */
    getCardObject(cardName) {
        return this.getSingleCard(cardName).object;
    }
    /**
     * Set card fabric object
     * @param {string} cardName
     * @param {any} newObject
     */
    setCardObject(cardName, newObject) {
        if (typeof newObject === "object") {
            this.getSingleCard(cardName).object = newObject;
        }
    }
    getBackOfCardObject(cardName) {
        return this.getSingleCard(cardName).backObject;
    }
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
