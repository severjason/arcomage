class ArcomageCards {

    private _cards:any;

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
                "action": function (player:Player, enemy:Player) {
                    player.updateWallLife(8);
                },
                "isActive": false,
                "object": {}
            },
            "new_equipment": {
                "source": "mine",
                "description": "Новое оборудование",
                "text": {
                    "ru": "+8 к стене"
                },
                "src": "./images/cards/new_equipment.jpg",
                "resource": {
                    "bricks": 2
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateSources({"mine": 1, "magic": 1, "dungeon":1});
                    enemy.updateSources({"mine": 2, "magic": 2, "dungeon":2});
                },
                "isActive": false,
                "object": {}
            },
            "amethyst": {
                "source": "magic",
                "description": "Amethyst",
                "text": {
                    "ru": "+3 to tower"
                },
                "src": "./images/cards/amethyst.jpg",
                "resource": {
                    "gems": 20
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateTowerLife(3);
                },
                "isActive": false,
                "object": {}

            },
            "werewolf": {
                "source": "dungeon",
                "description": "Оборотень",
                "text": {
                    "ru": "Если стена больше,\nчем у врага, то\n6 урона башне врага,\nиначе 6 урона"
                },
                "src": "./images/cards/werewolf.jpg",
                "resource": {
                    "beasts": 5
                },
                "action": function (player:Player, enemy:Player) {
                    enemy.takeDamage(9);
                },
                "isActive": false,
                "object": {}
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
                "action": function (player:Player, enemy:Player) {
                    player.updateSources({"mine": -1});
                    enemy.updateSources({"mine": -1});
                },
                "isActive": false,
                "object": {}
            }
        };
    }

    /**
     * Get all cards
     * @returns {any} cards
     */
    get all():any {
        return this._cards;
    }

    /**
     *  Get cards names
     * @returns {string[]}
     */
    get names():Array<string> {
        return Object.keys(this._cards);
    }

    /**
     * Get one card
     * @param {string} card
     * @returns {any} cards[card]
     */
    getSingleCard(card:string):any {
        return this._cards[card];
    }

    /**
     * Get card fabric object
     * @param {string} card
     * @returns {any}
     */
    getCardObject(card:string):any {
        return this.getSingleCard(card).object;
    }

}


