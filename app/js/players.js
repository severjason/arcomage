"use strict";
class Player {

    constructor(name, playerValues) {
        this.playerName = name;
        this.playerTower = parseInt(playerValues.tower, 10);
        this.playerWall = parseInt(playerValues.wall, 10);
        this.playerResources = playerValues.resources;
        this.playerSources = playerValues.sources;
        this.playerSourcesObject = {};
        this.playerResourcesObject = {};
        this.playerCards = [];
    }

    get name() {
        return this.playerName;
    }

    get tower() {
        return this.playerTower;
    }

    set tower(newValue) {
        if (newValue >= 0) {
            return this.playerTower = newValue;
        }
    }

    get wall() {
        return this.playerWall;
    }

    set wall(newValue) {
        if (newValue >= 0) {
            return this.playerWall = newValue;
        }
    }

    get resources() {
        return this.playerResources;
    }

    get sources() {
        return this.playerSources;
    }
    
    get sourcesObject() {
        return this.playerSourcesObject;
    }

    set sourcesObject(newValue) {
        if(typeof newValue === "object") {
            return this.playerSourcesObject = newValue;
        }
    }
    get resourcesObject() {
        return this.playerResourcesObject;
    }

    set resourcesObject(newValue) {
        if(typeof newValue === "object") {
            return this.playerResourcesObject = newValue;
        }
    }

    get cards() {
        return this.playerCards;
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
        else {
            this.wall += newValue;
        }
    }

    updateSources(newSources) {
        for (let key in newSources) {
            if (newSources.hasOwnProperty(key)) {
                let newValue = parseInt(newSources[key], 10);
                if ((this.sources[key] + newValue) > 0) {
                    ((this.sources[key] + newValue) < 100) ? this.sources[key] += newValue : this.sources[key] = 99;
                }
                else {
                    this.sources[key] = 1;
                }

                this.sourcesObject[key]._objects[2].text = this.sources[key].toString();
            }
        }
    }

    updateResources(newResources) {
        for (let key in newResources) {
            if (newResources.hasOwnProperty(key)) {
                let newValue = parseInt(newResources[key], 10);
                if ((this.resources[key] + newValue) > 0) {
                    ((this.resources[key] + newValue) < 300) ? this.resources[key] += newValue : this.resources[key] = 299;
                } else {
                    this.resources[key] = 1;
                }
                this.resourcesObject[key]._objects[2].text = this.resources[key].toString();
            }
        }
    }

    takeDamage(value) {
        let damage = parseInt(value, 10);
        (damage <= this.wall) ? this.updateWall(-damage) : this.updateTower(this.updateWall(-damage));
    }

    updateCards(card) {
        this.cards.push(card);
    }


}





