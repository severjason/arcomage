"use strict";

let CARDS = {
    "great_wall": {
        "type" : "red",
        "description":"Великая стена",
        "text" : {
            "ru" : "+8 к стене"
        },
        "src":"./images/cards/great_wall.jpg",
        "price": {
            "bricks":2
        },
        "action":function (player, enemy) {
            return player.updateWall(8);
        },
        "isActive":false
    },
    "new_equipment": {
        "type" : "red",
        "description":"Новое оборудование",
        "text" : {
            "ru":"+8 к стене"
        },
        "src":"./images/cards/new_equipment.jpg",
        "price": {
            "bricks":2
        },
        "action":function (player, enemy) {
            return player.updateSources({"mine":2});
        },
        "isActive":false
    },
    "amethyst": {
        "type" : "blue",
        "description":"Аметист",
        "text" : {
            "ru" : "+3 к башне"
        },
        "src":"./images/cards/amethyst.jpg",
        "price": {
            "gems":2
        },
        "action":function (player, enemy) {
            return player.updateTower(3);
        },
        "isActive":false

    },
    "werewolf": {
        "type" : "green",
        "description":"Оборотень",
        "text" : {
            "ru" : "Если стена больше,\nчем у врага, то\n6 урона башне врага,\nиначе 6 урона"
        },
        "src":"./images/cards/werewolf.jpg",
        "price": {
            "beasts":5
        },
        "action":function (player, enemy) {
            enemy.takeDamage(9);
        },
        "isActive":false

    }
};