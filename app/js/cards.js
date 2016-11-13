"use strict";

class ArcomageCards {

    constructor() {
        
        this.cards = {
            "great_wall": {
                "type": "red",
                "description": "Великая стена",
                "text": {
                    "ru": "+8 к стене"
                },
                "src": "./images/cards/great_wall.jpg",
                "price": {
                    "bricks": 2
                },
                "action": function (player, enemy) {
                    player.updateWall(8);
                },
                "isActive": false,
                "object": {}
            },
            "new_equipment": {
                "type": "red",
                "description": "Новое оборудование",
                "text": {
                    "ru": "+8 к стене"
                },
                "src": "./images/cards/new_equipment.jpg",
                "price": {
                    "bricks": 2
                },
                "action": function (player, enemy) {
                    player.updateSources({"mine": 2});
                },
                "isActive": false,
                "object": {}
            },
            "amethyst": {
                "type": "blue",
                "description": "Аметист",
                "text": {
                    "ru": "+3 к башне"
                },
                "src": "./images/cards/amethyst.jpg",
                "price": {
                    "gems": 20
                },
                "action": function (player, enemy) {
                    player.updateTower(3);
                },
                "isActive": false,
                "object": {}

            },
            "werewolf": {
                "type": "green",
                "description": "Оборотень",
                "text": {
                    "ru": "Если стена больше,\nчем у врага, то\n6 урона башне врага,\nиначе 6 урона"
                },
                "src": "./images/cards/werewolf.jpg",
                "price": {
                    "beasts": 5
                },
                "action": function (player, enemy) {
                    enemy.takeDamage(9);
                },
                "isActive": false,
                "object": {}
            },
            "earthquake": {
                "type": "red",
                "description": "Землетрясение",
                "text": {
                    "ru": "-1 шахты всех игроков"
                },
                "src": "./images/cards/earthquake.jpg",
                "price": {
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


