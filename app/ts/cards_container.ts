class ArcomageCardsContainer {

    _cards:any;
    _backOfCardSrc:string;
    _discardText:string;

    constructor() {
        this._cards = {
            "amethyst": {
                "name": "amethyst",
                "source": "magic",
                "description": {
                    "eng": "Amethyst"
                },
                "text": {
                    "eng": "+3 tower"
                },
                "src": "./images/cards/amethyst.png",
                "resource": {
                    "gems": 2
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -2
                    });
                    player.updateTowerLife(3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            /*
             "": {
             "name": "",
             "source": "",
             "description": {
             "eng": ""
             },
             "text": {
             "eng": ""
             },
             "src": "./images/cards/.png",
             "resource": {
             "gems": 2
             },
             "action": function (player:Player, enemy:Player) {
             player.updateResources({
             "gems": -2
             });
             player.updateTowerLife(3);
             },
             "isActive": false,
             "object": {},
             "backObject": {}

             },
             */
            /*"apprentice": {
             "name": "apprentice",
             "source": "magic",
             "description": {
             "eng": "Apprentice"
             },
             "text": {
             "eng": "+4 tower,\nyou lose 3 beasts,\n2 damage to enemy tower"
             },
             "src": "./images/cards/apprentice.png",
             "resource": {
             "gems": 5
             },
             "action": function (player:Player, enemy:Player) {
             player.updateResources({
             "gems": -5,
             "beasts":-3
             });
             player.updateTowerLife(4);
             enemy.updateTowerLife(-2);
             },
             "isActive": false,
             "object": {},
             "backObject": {}

             },
             "bag_of_baubles": {
             "name": "bag_of_baubles",
             "source": "magic",
             "description": {
             "eng": "Bag of Baubles"
             },
             "text": {
             "eng": "If tower <\nenemy tower\n+2 tower,\nelse +1 tower"
             },
             "src": "./images/cards/bag_of_baubles.png",
             "resource": {
             "gems": 0
             },
             "action": function (player:Player, enemy:Player) {
             (player.towerLife < enemy.towerLife) ? player.updateTowerLife(2) : player.updateTowerLife(1);
             },
             "isActive": false,
             "object": {},
             "backObject": {}

             },
             "barracks": {
             "name": "barracks",
                "source": "mine",
                "description": {
             "eng": "Barracks"
                },
                "text": {
             "eng": "+6 beasts, +6 wall,\nif dungeon <\nenemy dungeon,\n+1 dungeon"
                },
             "src": "./images/cards/barracks.png",
                "resource": {
             "bricks": 10
             },
             "action": function (player:Player, enemy:Player) {
             player.updateResources({
             "bricks": -10,
             "beasts": 6,
             });
             player.updateWallLife(6);
             if (player.sources["dungeon"] < enemy.sources["dungeon"]) player.updateSources({"dungeon":1});
             },
             "isActive": false,
             "object": {},
             "backObject": {}

             },*/
            "basic_wall": {
                "name": "basic_wall",
                "source": "mine",
                "description": {
                    "eng": "Basic wall"
                },
                "text": {
                    "eng": "+3 wall"
                },
                "src": "./images/cards/basic_wall.png",
                "resource": {
                    "bricks": 2
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -2
                    });
                    player.updateWallLife(3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "battlements": {
                "name": "battlements",
                "source": "mine",
                "description": {
                    "eng": "Battlements"
                },
                "text": {
                    "eng": "+7 wall,\n6 damage to enemy"
                },
                "src": "./images/cards/battlements.png",
                "resource": {
                    "bricks": 14
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -14
                    });
                    player.updateWallLife(7);
                    enemy.takeDamage(6);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "berserker": {
                "name": "berserker",
                "source": "dungeon",
                "description": {
                    "eng": "Berserker"
                },
                "text": {
                    "eng": "8 damage,\n3 damage to your tower"
                },
                "src": "./images/cards/berserker.png",
                "resource": {
                    "beasts": 4
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -4
                    });
                    enemy.takeDamage(8);
                    player.updateTowerLife(-3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "big_wall": {
                "name": "big_wall",
                "source": "mine",
                "description": {
                    "eng": "Big wall"
                },
                "text": {
                    "eng": "+6 wall"
                },
                "src": "./images/cards/big_wall.png",
                "resource": {
                    "bricks": 5
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -5
                    });
                    player.updateWallLife(6);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "cave_river": {
                "name": "cave_river",
                "source": "mine",
                "description": {
                    "eng": "Cave river"
                },
                "text": {
                    "eng": "Player with\n lowest wall\n-1 dungeon and \n -2 tower"
                },
                "src": "./images/cards/cave_river.png",
                "resource": {
                    "bricks": 6
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -6
                    });
                    if (player.wallLife < enemy.wallLife) {
                        player.updateTowerLife(-2);
                        player.updateSources({"dungeon": -1});
                    }
                    else if (player.wallLife === enemy.wallLife) {
                        player.updateTowerLife(-2);
                        player.updateSources({"dungeon": -1});
                        enemy.updateTowerLife(-2);
                        enemy.updateSources({"dungeon": -1})
                    }
                    else {
                        enemy.updateTowerLife(-2);
                        enemy.updateSources({"dungeon": -1})
                    }
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "collapse": {
                "name": "collapse",
                "source": "mine",
                "description": {
                    "eng": "Collapse!"
                },
                "text": {
                    "eng": "-1 enemy mine"
                },
                "src": "./images/cards/collapse.png",
                "resource": {
                    "bricks": 4
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -4
                    });
                    enemy.updateSources({
                        "mine": -1
                    })
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "corrosion_cloud": {
                "name": "corrosion_cloud",
                "source": "dungeon",
                "description": {
                    "eng": "Corrosion cloud"
                },
                "text": {
                    "eng": "If enemy wall > 0\n10 damage, else\n7 damage"
                },
                "src": "./images/cards/corrosion_cloud.png",
                "resource": {
                    "beasts": 11
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -11
                    });
                    (enemy.wallLife > 0) ? enemy.takeDamage(10) : enemy.takeDamage(7);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "crumblestone": {
                "name": "crumblestone",
                "source": "magic",
                "description": {
                    "eng": "crumblestone"
                },
                "text": {
                    "eng": "+5 tower\nenemy loses 6 bricks"
                },
                "src": "./images/cards/crumblestone.png",
                "resource": {
                    "gems": 7
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -7
                    });
                    player.updateTowerLife(5);
                    enemy.updateResources({"bricks": -6});
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "crystallize": {
                "name": "crystallize",
                "source": "magic",
                "description": {
                    "eng": "Crystallize"
                },
                "text": {
                    "eng": "+11 tower\n-6 wall"
                },
                "src": "./images/cards/crystallize.png",
                "resource": {
                    "gems": 8
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -8
                    });
                    player.updateTowerLife(11);
                    player.updateWallLife(-6);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "crystal_matrix": {
                "name": "crystal_matrix",
                "source": "magic",
                "description": {
                    "eng": "Crystal matrix"
                },
                "text": {
                    "eng": "+1 magic\n+3 tower\n+1 enemy tower"
                },
                "src": "./images/cards/crystal_matrix.png",
                "resource": {
                    "gems": 6
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -6
                    });
                    player.updateSources({"magic": 1});
                    player.updateTowerLife(3);
                    enemy.updateTowerLife(1);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "crystal_rock": {
                "name": "crystal_rock",
                "source": "mine",
                "description": {
                    "eng": "Crystal rock"
                },
                "text": {
                    "eng": "+7 wall\ngain 7 gems"
                },
                "src": "./images/cards/crystal_rock.png",
                "resource": {
                    "bricks": 9
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -9,
                        "gems": 7
                    });
                    player.updateWallLife(7);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "crystal_shield": {
                "name": "crystal_shield",
                "source": "magic",
                "description": {
                    "eng": "Crystal shield"
                },
                "text": {
                    "eng": "+8 tower\n+3 wall"
                },
                "src": "./images/cards/crystal_shield.png",
                "resource": {
                    "gems": 7
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -7
                    });
                    player.updateTowerLife(8);
                    player.updateWallLife(3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "defective_ore": {
                "name": "defective_ore",
                "source": "mine",
                "description": {
                    "eng": "Defective ore"
                },
                "text": {
                    "eng": "All players\n lose 8 bricks"
                },
                "src": "./images/cards/defective_ore.png",
                "resource": {
                    "bricks": 0
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -8
                    });
                    enemy.updateResources({
                        "bricks": -8
                    });
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "demon_slasher": {
                "name": "demon_slasher",
                "source": "dungeon",
                "description": {
                    "eng": "Demon slasher"
                },
                "text": {
                    "eng": "6 damage"
                },
                "src": "./images/cards/demon_slasher.png",
                "resource": {
                    "beasts": 5
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -5
                    });
                    enemy.takeDamage(6);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "diamond": {
                "name": "diamond",
                "source": "magic",
                "description": {
                    "eng": "Diamond"
                },
                "text": {
                    "eng": "+15 tower"
                },
                "src": "./images/cards/diamond.png",
                "resource": {
                    "gems": 16
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -16
                    });
                    player.updateTowerLife(15);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "discord": {
                "name": "discord",
                "source": "magic",
                "description": {
                    "eng": "Discord"
                },
                "text": {
                    "eng": "7 damage to\n all towers,\n all magic -1"
                },
                "src": "./images/cards/discord.png",
                "resource": {
                    "gems": 5
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -5
                    });
                    player.updateSources({"magic": -1});
                    player.updateTowerLife(-7);
                    enemy.updateSources({"magic": -1});
                    enemy.updateTowerLife(-7);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "dragon": {
                "name": "dragon",
                "source": "dungeon",
                "description": {
                    "eng": "Dragon"
                },
                "text": {
                    "eng": "20 damage,\nenemy loses 10 gems,\n-1 enemy dungeon"
                },
                "src": "./images/cards/dragon.png",
                "resource": {
                    "beasts": 25
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -25
                    });
                    enemy.takeDamage(20);
                    enemy.updateResources({"gems": -10});
                    enemy.updateSources({"dungeon": -1});
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "dragon_heart": {
                "name": "dragon_heart",
                "source": "mine",
                "description": {
                    "eng": "Dragon heart"
                },
                "text": {
                    "eng": "+20 wall\n+8 tower"
                },
                "src": "./images/cards/dragon_heart.png",
                "resource": {
                    "bricks": 24
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -24
                    });
                    player.updateWallLife(20);
                    player.updateTowerLife(8);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "dwarf_miner": {
                "name": "dwarf_miner",
                "source": "mine",
                "description": {
                    "eng": "Dwarf miner"
                },
                "text": {
                    "eng": "+4 wall\n+1 mine"
                },
                "src": "./images/cards/dwarf_miner.png",
                "resource": {
                    "bricks": 7
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -7
                    });
                    player.updateWallLife(4);
                    player.updateSources({
                        "mine": 1
                    })
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "dwarfs": {
                "name": "dwarfs",
                "source": "dungeon",
                "description": {
                    "eng": "Dwarfs"
                },
                "text": {
                    "eng": "4 damage\n+3 wall"
                },
                "src": "./images/cards/dwarfs.png",
                "resource": {
                    "beasts": 5
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -5
                    });
                    enemy.takeDamage(4);
                    player.updateWallLife(3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "earthquake": {
                "name": "earthquake",
                "source": "mine",
                "description": {
                    "eng": "Earthquake"
                },
                "text": {
                    "eng": "-1 to all mines"
                },
                "src": "./images/cards/earthquake.png",
                "resource": {
                    "bricks": 0
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -0
                    });
                    player.updateSources({"mine": -1});
                    enemy.updateSources({"mine": -1});
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "elven_archer": {
                "name": "elven_archer",
                "source": "dungeon",
                "description": {
                    "eng": "Elven archer"
                },
                "text": {
                    "eng": "If wall > enemy\nwall, 6 damage\nto enemy tower\nelse 6 damage"
                },
                "src": "./images/cards/elven_archer.png",
                "resource": {
                    "beasts": 10
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -10
                    });
                    (player.wallLife > enemy.wallLife) ? enemy.updateTowerLife(-6) : enemy.takeDamage(6);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "emerald": {
                "name": "emerald",
                "source": "magic",
                "description": {
                    "eng": "Emerald"
                },
                "text": {
                    "eng": "+8 tower"
                },
                "src": "./images/cards/emerald.png",
                "resource": {
                    "gems": 6
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -6
                    });
                    player.updateTowerLife(8);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "faerie": {
                "name": "faerie",
                "source": "dungeon",
                "description": {
                    "eng": "Faerie"
                },
                "text": {
                    "eng": "2 damage,\nplay again"
                },
                "src": "./images/cards/faerie.png",
                "resource": {
                    "beasts": 1
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "beasts": -1
                    });
                    enemy.takeDamage(2);
                },
                "isActive": false,
                "playAgain": true,
                "object": {},
                "backObject": {}

            },
            "fire_ruby": {
                "name": "fire_ruby",
                "source": "magic",
                "description": {
                    "eng": "Fire ruby"
                },
                "text": {
                    "eng": "+6 tower,\n4 damage to\n enemy wall\nand tower"
                },
                "src": "./images/cards/fire_ruby.png",
                "resource": {
                    "gems": 13
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "gems": -13
                    });
                    player.updateTowerLife(6);
                    enemy.updateWallLife(-4);
                    enemy.updateTowerLife(-4);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "focused_designs": {
                "name": "focused_designs",
                "source": "mine",
                "description": {
                    "eng": "Focused designs"
                },
                "text": {
                    "eng": "+8 wall,\n+5 tower"
                },
                "src": "./images/cards/focused_designs.png",
                "resource": {
                    "bricks": 15
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -15
                    });
                    player.updateWallLife(8);
                    player.updateTowerLife(5);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "forced_labor": {
                "name": "forced_labor",
                "source": "mine",
                "description": {
                    "eng": "Forced labor"
                },
                "text": {
                    "eng": "+9 wall,\nlose 5 beasts"
                },
                "src": "./images/cards/forced_labor.png",
                "resource": {
                    "bricks": 7
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -7,
                        "beasts": -5
                    });
                    player.updateWallLife(9);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "foundations": {
                "name": "foundations",
                "source": "mine",
                "description": {
                    "eng": "Foundations"
                },
                "text": {
                    "eng": "If wall = 0,\n+6 wall,\nelse +3 wall"
                },
                "src": "./images/cards/foundations.png",
                "resource": {
                    "bricks": 3
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -3
                    });
                    (player.wallLife === 0) ? player.updateWallLife(6) : player.updateWallLife(3);
                },
                "isActive": false,
                "object": {},
                "backObject": {}

            },
            "friendly_terrain": {
                "name": "friendly_terrain",
                "source": "mine",
                "description": {
                    "eng": "Friendly terrain"
                },
                "text": {
                    "eng": "+1 wall,\nplay again"
                },
                "src": "./images/cards/friendly_terrain.png",
                "resource": {
                    "bricks": 1
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({
                        "bricks": -1
                    });
                    player.updateWallLife(1);
                },
                "isActive": false,
                "playAgain": true,
                "object": {},
                "backObject": {}

            },
            "full_moon": {
                "name": "full_moon",
                "source": "dungeon",
                "description": {
                    "eng": "Full moon"
                },
                "text": {
                    "eng": "+1 to all dungeons,\nyou gain 3 beasts"
                },
                "src": "./images/cards/full_moon.png",
                "resource": {
                    "beasts": 0
                },
                "action": function (player:Player, enemy:Player) {
                    player.updateResources({"beasts": 3});
                    enemy.updateSources({"dungeon": 1});
                    player.updateSources({"dungeon": 1});
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
                    "eng": "9 damage"
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
            }
        };
        this._discardText = "DISCARD";
        this._backOfCardSrc = "./images/cards/back.png";
    }


}


