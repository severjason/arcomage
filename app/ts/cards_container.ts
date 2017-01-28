class ArcomageCardsContainer {

    _cards:any;
    _backOfCardSrc:string;
    _discardText:string;

    constructor() {
        this._cards = {
            "great_wall": {
                "name": "great_wall",
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
                "name": "new_equipment",
                "source": "mine",
                "description": "New equipment",
                "text": {
                    "ru": "+1 to all mines"
                },
                "src": "./images/cards/new_equipment.jpg",
                "resource": {
                    "bricks": 2
                },
                "action": function (player:Player, enemy:Player) {
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
                "name": "amethyst",
                "source": "magic",
                "description": "Amethyst",
                "text": {
                    "ru": "+3 to tower"
                },
                "src": "./images/cards/amethyst.jpg",
                "resource": {
                    "gems": 8
                },
                "action": function (player:Player, enemy:Player) {
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
                "name": "werewolf",
                "source": "dungeon",
                "description": "Werewolf",
                "text": {
                    "ru": "If your wall bigger,\nthen your enemy wall,\n6 damage to enemy wall,\nelse - 9 damage"
                },
                "src": "./images/cards/werewolf.jpg",
                "resource": {
                    "beasts": 5
                },
                "action": function (player:Player, enemy:Player) {
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
                "name": "earthquake",
                "source": "mine",
                "description": "Earthquake",
                "text": {
                    "ru": "-1 to all mines"
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
                "object": {},
                "backObject": {}
            }
        };
        this._discardText = "DISCARD";
        this._backOfCardSrc = "./images/cards/back.png";
    }


}


