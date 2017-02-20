class ArcomageCardsContainer {

    _cards:any;
    _backOfCardSrc:string;
    _discardText:string;

    constructor() {
        this._cards = {
            "great_wall": {
                "name": "great_wall",
                "source": "mine",
                "description": {
                    "eng": "Great Wall"
                },
                "text": {
                    "eng": "+8 to wall"
                },
                "src": "./images/cards/great_wall.png",
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
                "description": {
                    "eng": "New equipment"
                },
                "text": {
                    "eng": "+1 to all mines"
                },
                "src": "./images/cards/new_equipment.png",
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
                "description": {
                    "eng": "Amethyst"
                },
                "text": {
                    "eng": "+3 to tower"
                },
                "src": "./images/cards/amethyst.png",
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
                "description": {
                    "eng": "Werewolf"
                },
                "text": {
                    "eng": "If your wall bigger,\nthen your enemy wall,\n6 damage to enemy wall,\nelse 9 damage"
                },
                "src": "./images/cards/werewolf.png",
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
            "earthquake1": {
                "name": "earthquake1",
                "source": "mine",
                "description": {
                    "eng": "earthquake1"
                },
                "text": {
                    "eng": "-1 to all mines"
                },
                "src": "./images/cards/earthquake.png",
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
            },
            "great_wall1": {
                "name": "great_wall1",
                "source": "mine",
                "description": {
                    "eng": "great_wall1"
                },
                "text": {
                    "eng": "+8 to wall"
                },
                "src": "./images/cards/great_wall.png",
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
            "new_equipment1": {
                "name": "new_equipment1",
                "source": "mine",
                "description": {
                    "eng": "new_equipment1"
                },
                "text": {
                    "eng": "+1 to all mines"
                },
                "src": "./images/cards/new_equipment.png",
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
            "amethyst1": {
                "name": "amethyst1",
                "source": "magic",
                "description": {
                    "eng": "amethyst1"
                },
                "text": {
                    "eng": "+3 to tower"
                },
                "src": "./images/cards/amethyst.png",
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
            "werewolf1": {
                "name": "werewolf1",
                "source": "dungeon",
                "description": {
                    "eng": "werewolf1"
                },
                "text": {
                    "eng": "If your wall bigger,\nthen your enemy wall,\n6 damage to enemy wall,\nelse 9 damage"
                },
                "src": "./images/cards/werewolf.png",
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
            "earthquake2": {
                "name": "earthquake2",
                "source": "mine",
                "description": {
                    "eng": "earthquake2"
                },
                "text": {
                    "eng": "-1 to all mines"
                },
                "src": "./images/cards/earthquake.png",
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
            },
            "werewolf2": {
                "name": "werewolf2",
                "source": "dungeon",
                "description": {
                    "eng": "werewolf2"
                },
                "text": {
                    "eng": "If your wall bigger,\nthen your enemy wall,\n6 damage to enemy wall,\nelse 9 damage"
                },
                "src": "./images/cards/werewolf.png",
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
        };
        this._discardText = "DISCARD";
        this._backOfCardSrc = "./images/cards/back.png";
    }


}


