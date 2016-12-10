"use strict";
class Player {

    /**
     *
     * @param name {string}
     * @param playerValues {object}
     * @param maxValues {object}
     * @param canvasValues {object}
     */
    constructor(name, playerValues, maxValues, canvasValues) {
        this.playerName = name;
        this.playerTowerLife = playerValues.towerLife;
        this.playerWallLife = playerValues.wallLife;
        this.playerResources = playerValues.resources;
        this.playerSources = playerValues.sources;
        this.canvasTowerHeightStep = canvasValues.towers.heightStep;
        this.canvasWallHeightStep = canvasValues.walls.heightStep;
        this.maxWallLife = maxValues.wall;
        this.maxTowerLife = maxValues.tower;
        this.maxSources = maxValues.sources;
        this.maxResources = maxValues.resources;
        this.playerSourcesObject = {};
        this.playerResourcesObject = {};
        this.playerCards = [];
        this.playerTowerObject = {};
        this.playerWallObject = {};
    }

    /**
     * Get playerName
     * @returns {string} playerName
     */
    get name() {
        return this.playerName;
    }

    /**
     * Get playerTowerLife
     * @returns {number} playerTowerLife
     */
    get towerLife() {
        return this.playerTowerLife;
    }

    /**
     * Set new playerTowerLife
     * @param {number} newPlayerTowerLife
     */
    set towerLife(newPlayerTowerLife) {
        if (newPlayerTowerLife >= 0) {
            this.playerTowerLife = (newPlayerTowerLife < this.maxTowerLife) ? newPlayerTowerLife : this.maxTowerLife;
        }
    }

    /**
     * Get playerWallLife
     * @returns {number} playerWallLife
     */
    get wallLife() {
        return this.playerWallLife;
    }

    /**
     * Set playerWallLife
     * @param {number} newPlayerWall
     */
    set wallLife(newPlayerWall) {
        if (newPlayerWall >= 0) {
            this.playerWallLife = (newPlayerWall < this.maxWallLife) ? newPlayerWall : this.maxWallLife;
        }
    }

    /**
     * Get playerResources
     * @returns {object} playerResources
     */
    get resources() {
        return this.playerResources;
    }

    /**
     * Get playerSources
     * @returns {object} playerSources
     */
    get sources() {
        return this.playerSources;
    }

    /**
     * Get playerTower fabric object
     * @returns {object} playerTowerObject
     */
    get towerObject() {
        return this.playerTowerObject;
    }

    /**
     * Set new tower fabric object
     * @param {object} newFabricObject
     */
    set towerObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this.playerTowerObject = newFabricObject;
        }
    }

    /**
     * Get playerWall fabric object
     * @returns {object} playerWallObject
     */
    get wallObject() {
        return this.playerWallObject;
    }

    /**
     * Set new wall fabric object
     * @param {object} newFabricObject
     */
    set wallObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this.playerWallObject = newFabricObject;
        }
    }

    /**
     * Get playerSources fabric object
     * @returns {object} playerSourcesObject
     */
    get sourcesObject() {
        return this.playerSourcesObject;
    }

    /**
     * Set new source fabric object
     * @param {object} newFabricObject
     */
    set sourcesObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this.playerSourcesObject = newFabricObject;
        }
    }

    /**
     * Get player resources fabric object
     * @returns {object} playerResourcesObject
     */
    get resourcesObject() {
        return this.playerResourcesObject;
    }

    /**
     * Set new resource fabric object
     * @param {object} newFabricObject
     */
    set resourcesObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this.playerResourcesObject = newFabricObject;
        }
    }

    /**
     * Get playerCards
     * @returns {array} playerCards
     */
    get cards() {
        return this.playerCards;
    }

    /**
     * Updates player tower life and tower fabric object
     * @param {number} value
     */
    updateTowerLife(value) {
        let newValue = parseInt(value, 10);

        if (newValue < 0 && Math.abs(newValue) > this.towerLife) {
            this.towerLife = 0;
            this.towerObject._objects[0].top = this.towerObject._objects[1].top;
        }
        else {
            if (this.towerLife + newValue > this.maxTowerLife) {
                if(this.towerLife <= this.maxTowerLife) {
                    this.towerLife += newValue;
                    this.towerObject._objects[1].height = this.towerLife * this.canvasTowerHeightStep;
                    this.towerObject._objects[0].top = this.towerObject._objects[1].top - this.towerObject._objects[1].height;
                }
                else {
                    this.towerObject._objects[0].top = this.towerObject._objects[1].top - this.towerObject._objects[1].height;
                }
            }
            else {
                this.towerLife += newValue;
                this.towerObject._objects[0].top -= newValue * this.canvasTowerHeightStep;
            }
        }
        this.towerObject._objects[1].height = this.towerLife * this.canvasTowerHeightStep;
        this.towerObject._objects[3].text = this.towerLife.toString();
    }

    /**
     * Updates player wall life and wall fabric object
     * @param value
     * @returns {number} reminded wall life
     */
    updateWallLife(value) {
        let newValue = parseInt(value, 10);
        if (this.wallLife >= this.maxWallLife) {
            this.wallLife = this.maxWallLife
        }
        else if (newValue < 0 && Math.abs(newValue) > this.wallLife) {
            let remainder = newValue + this.wallLife;
            this.wallLife = 0;
            this.wallObject._objects[0].height = this.wallLife * this.canvasWallHeightStep;
            this.wallObject._objects[2].text = this.wallLife.toString();
            return remainder;
        }
        else {
            this.wallLife += newValue;
        }
        this.wallObject._objects[0].height = this.wallLife * this.canvasWallHeightStep;
        this.wallObject._objects[2].text = this.wallLife.toString();

    }

    /**
     * Updates player sources
     * @param {object} newSources
     */
    updateSources(newSources) {
        for (let key in newSources) {
            if (newSources.hasOwnProperty(key)) {
                let newValue = parseInt(newSources[key], 10);
                if ((this.sources[key] + newValue) > 0) {
                    ((this.sources[key] + newValue) < this.maxSources) ? this.sources[key] += newValue : this.sources[key] = this.maxSources;
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
     * @param {object} newResources
     */
    updateResources(newResources) {
        for (let key in newResources) {
            if (newResources.hasOwnProperty(key)) {
                let newValue = parseInt(newResources[key], 10);
                if ((this.resources[key] + newValue) > 0) {
                    ((this.resources[key] + newValue) < this.maxResources) ? this.resources[key] += newValue : this.resources[key] = this.maxResources;
                } else {
                    this.resources[key] = 1;
                }
                this.resourcesObject[key]._objects[2].text = this.resources[key].toString();
            }
        }
    }

    /**
     * Take damage to wall if wall=0 to tower
     * @param {number} value
     */
    takeDamage(value) {
        let damage = parseInt(value, 10);
        (damage <= this.wallLife) ? this.updateWallLife(-damage) : this.updateTowerLife(this.updateWallLife(-damage));
    }

    /**
     * Array of player cards
     * @param {array} card
     */
    updateCards(card) {
        this.cards.push(card);
    }


}





