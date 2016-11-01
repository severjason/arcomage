"use strict";
    class Player {

        constructor(name,
                    tower = 15,
                    wall = 5,
                    resources = {
                        "bricks"    :10,
                        "gems"      :10,
                        "beasts"    :10
                    },
                    sources = {
                        "mine"      :1,
                        "magic"     :1,
                        "dungeon"   :1
                    }) {
            this.name         = name;
            this.tower        = parseInt(tower,10);
            this.wall         = parseInt(wall,10);
            this.resources    = resources;
            this.sources      = sources;
            this.cards        = [];
        }
        getName() {
            return this.name;
        }
        getTower() {
            return this.tower;
        }
        getWall() {
            return this.wall;
        }
        getResources() {
            return this.resources;
        }
        getCards() {
            return this.cards;
        }

        updateTower(value) {
            let newValue = parseInt(value, 10);
            (newValue < 0 && Math.abs(newValue) > this.tower) ? this.tower = 0 : this.tower += newValue;
        }
        updateWall(value) {
            let newValue = parseInt(value, 10);
            if (newValue < 0 && Math.abs(newValue) > this.wall) {
                let remainder = newValue + this.wall;
                this.wall = 0;
                return remainder;
            }
            else this.wall += newValue;
        }
        updateSources(newSources) {
            for (let key in newSources) {
                if (newSources.hasOwnProperty(key)) {
                    this.sources[key] += parseInt(newSources[key],10);
                }
            }
        }
        updateResources(newResources) {
            for (let key in newResources) {
                if (newResources.hasOwnProperty(key)) {
                    this.resources[key] += parseInt(newResources[key],10);
                }
            }
        }
        takeDamage(value) {
            let damage = parseInt(value,10);
            (damage <= this.wall) ?  this.updateWall(-damage) : this.updateTower(this.updateWall(-damage));
        }
        updateCards(card) {
            this.cards.push(card);
        }


    }





