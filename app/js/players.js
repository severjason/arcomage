"use strict";
class Player {

    /**
     *
     * @param name {String}
     * @param playerValues {Object}
     */
    constructor(name, playerValues) {
        this.playerName = name;
        this.playerTowerLife = parseInt(playerValues.towerLife, 10);
        this.playerWallLife = parseInt(playerValues.wallLife, 10);
        this.playerResources = playerValues.resources;
        this.playerSources = playerValues.sources;
        this.playerSourcesObject = {};
        this.playerResourcesObject = {};
        this.playerCards = [];
    }

    /**
     * Get playerName
     * @returns {String} playerName
     */
    get name() {
        return this.playerName;
    }

    /**
     * Get playerTowerLife
     * @returns {Number} playerTowerLife
     */
    get towerLife() {
        return this.playerTowerLife;
    }

    /**
     * Set new playerTowerLife
     * @param {Number} newPlayerTowerLife
     */
    set towerLife(newPlayerTowerLife) {
        if (newPlayerTowerLife >= 0) {
            this.playerTowerLife = newPlayerTowerLife;
        }
    }

    /**
     * Get playerWallLife
     * @returns {Number} playerWallLife
     */
    get wallLife() {
        return this.playerWallLife;
    }

    /**
     * Set playerWallLife
     * @param {Number} newPlayerWall
     */
    set wallLife(newPlayerWall) {
        if (newPlayerWall >= 0) {
            this.playerWallLife = newPlayerWall;
        }
    }

    /**
     * Get playerResources
     * @returns {Object} playerResources
     */
    get resources() {
        return this.playerResources;
    }

    /**
     * Get playerSources
     * @returns {Object} playerSources
     */
    get sources() {
        return this.playerSources;
    }

    /**
     * Get playerSources fabric object
     * @returns {Object} playerSourcesObject
     */
    get sourcesObject() {
        return this.playerSourcesObject;
    }


    /**
     * Set new source fabric object
     * @param {Object} newFabricObject
     */
    set sourcesObject(newFabricObject) {
        if(typeof newFabricObject === "object") {
            this.playerSourcesObject = newFabricObject;
        }
    }

    /**
     * Get player resources fabric object
     * @returns {Object} playerResourcesObject
     */
    get resourcesObject() {
        return this.playerResourcesObject;
    }

    /**
     * Set new resource fabric object
     * @param {Object} newFabricObject
     */
    set resourcesObject(newFabricObject) {
        if(typeof newFabricObject === "object") {
            this.playerResourcesObject = newFabricObject;
        }
    }

    /**
     * Get playerCards
     * @returns {Array} playerCards
     */
    get cards() {
        return this.playerCards;
    }

    /**
     * Updates player tower life
     * @param {Number} value
     */
    updateTowerLife(value) {
        let newValue = parseInt(value, 10);
        (newValue < 0 && Math.abs(newValue) > this.towerLife) ? this.towerLife = 0 : this.towerLife += newValue;
    }

    /**
     * Updates player wall life
     * @param value
     * @returns {Number} reminded wall life
     */
    updateWallLife(value) {
        let newValue = parseInt(value, 10);
        if (newValue < 0 && Math.abs(newValue) > this.wallLife) {
            let remainder = newValue + this.wallLife;
            this.wallLife = 0;
            return remainder;
        }
        else {
            this.wallLife += newValue;
        }
    }

    /**
     * Updates player sources
     * @param {Object} newSources
     */
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

    /**
     * Updates player resources
     * @param {Object} newResources
     */
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

    /**
     * Take damage to wall if wall=0 to tower
     * @param {Number} value
     */
    takeDamage(value) {
        let damage = parseInt(value, 10);
        (damage <= this.wallLife) ? this.updateWallLife(-damage) : this.updateTowerLife(this.updateWallLife(-damage));
    }

    /**
     * Array of player cards
     * @param {Array} card
     */
    updateCards(card) {
        this.cards.push(card);
    }


}





