"use strict";

class ArcomageCards {

    constructor() {
        
        this.cards = {
            "great_wall": {
                "source": "mine",
                "description": "Великая стена",
                "text": {
                    "ru": "+8 к стене"
                },
                "src": "./images/cards/great_wall.jpg",
                "resource": {
                    "bricks": 2
                },
                "action": function (player, enemy) {
                    player.updateWall(8);
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
                "action": function (player, enemy) {
                    player.updateSources({"mine": 2});
                },
                "isActive": false,
                "object": {}
            },
            "amethyst": {
                "source": "magic",
                "description": "Аметист",
                "text": {
                    "ru": "+3 к башне"
                },
                "src": "./images/cards/amethyst.jpg",
                "resource": {
                    "gems": 20
                },
                "action": function (player, enemy) {
                    player.updateTower(3);
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
                "action": function (player, enemy) {
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
                "action": function (player, enemy) {
                    player.updateSources({"mine": -1});
                    enemy.updateSources({"mine": -1});
                },
                "isActive": false,
                "object": {}
            }
        };
    }
    
    get all() {
        return this.cards;
    }
    
    get names() {
        return Object.keys(this.cards);
    }
    
    getSingleCard(card) {
        return this.cards[card];
    }
    
    
}


