var ArcomageGame;
(function (ArcomageGame) {
    "use strict";
    class Player {
        constructor(name, playerValues, maxValues, canvasValues) {
            this.playerName = name;
            this.playerTowerLife = playerValues.towerLife;
            this.playerWallLife = playerValues.wallLife;
            this.playerResources = playerValues.resources;
            this.playerSources = playerValues.sources;
            this.canvasTowerHeightStepValue = canvasValues.towers.heightStep;
            this.canvasWallHeightStepValue = canvasValues.walls.heightStep;
            this.maxWallLifeValue = maxValues.wall;
            this.maxTowerLifeValue = maxValues.tower;
            this.maxSourcesValue = maxValues.sources;
            this.maxResourcesValue = maxValues.resources;
            this.movesValue = playerValues.moves || 0;
            this.scoresValue = playerValues.scores || 0;
            this.playerNameObject = {};
            this.playerSourcesObject = {};
            this.playerResourcesObject = {};
            this.playerCards = [];
            this.playerTowerObject = {};
            this.playerWallObject = {};
        }
        /**
         * Get player name
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
                this.playerTowerLife = (newPlayerTowerLife < this.maxTowerLifeValue)
                    ? newPlayerTowerLife
                    : this.maxTowerLifeValue;
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
                this.playerWallLife = (newPlayerWall < this.maxWallLifeValue) ? newPlayerWall : this.maxWallLifeValue;
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
         * Get playerName fabric object
         * @returns {fabric.IGroup} playerNameObject
         */
        get nameObject() {
            return this.playerNameObject;
        }
        /**
         * Set new player name fabric object
         * @param {fabric.IGroup} newFabricObject
         */
        set nameObject(newFabricObject) {
            if (typeof newFabricObject === "object") {
                this.playerNameObject = newFabricObject;
            }
        }
        /**
         * Get playerTower fabric object
         * @returns {fabric.IGroup} playerTowerObject
         */
        get towerObject() {
            return this.playerTowerObject;
        }
        /**
         * Set new tower fabric object
         * @param {fabric.IGroup} newFabricObject
         */
        set towerObject(newFabricObject) {
            if (typeof newFabricObject === "object") {
                this.playerTowerObject = newFabricObject;
            }
        }
        /**
         * Get playerWall fabric object
         * @returns {fabric.IGroup} playerWallObject
         */
        get wallObject() {
            return this.playerWallObject;
        }
        /**
         * Set new wall fabric object
         * @param {fabric.IGroup} newFabricObject
         */
        set wallObject(newFabricObject) {
            if (typeof newFabricObject === "object") {
                this.playerWallObject = newFabricObject;
            }
        }
        /**
         * Get playerSources fabric object
         * @returns {fabric.IGroup} playerSourcesObject
         */
        get sourcesObject() {
            return this.playerSourcesObject;
        }
        /**
         * Set new source fabric object
         * @param {fabric.IGroup} newFabricObject
         */
        set sourcesObject(newFabricObject) {
            if (typeof newFabricObject === "object") {
                this.playerSourcesObject = newFabricObject;
            }
        }
        /**
         * Get player resources fabric object
         * @returns {fabric.IGroup} playerResourcesObject
         */
        get resourcesObject() {
            return this.playerResourcesObject;
        }
        /**
         * Set new resource fabric object
         * @param {fabric.IGroup} newFabricObject
         */
        set resourcesObject(newFabricObject) {
            if (typeof newFabricObject === "object") {
                this.playerResourcesObject = newFabricObject;
            }
        }
        /**
         * Get playerCards
         * @returns {[]} playerCards
         */
        get cards() {
            return this.playerCards;
        }
        /**
         * Set new array of player cards
         * @param {[]} newCardsArray
         */
        set cards(newCardsArray) {
            this.playerCards = newCardsArray;
        }
        /**
         * Get max tower life
         * @returns {number} maxTowerLifeValue
         */
        get maxTowerLife() {
            return this.maxTowerLifeValue;
        }
        /**
         * Get max wall life
         * @returns {number} maxWallLifeValue
         */
        get maxWallLife() {
            return this.maxWallLifeValue;
        }
        /**
         * Get max sources value
         * @returns {number} maxSourcesValue
         */
        get maxSources() {
            return this.maxSourcesValue;
        }
        /**
         * Get max resources value
         * @returns {number} maxResourcesValue
         */
        get maxResources() {
            return this.maxResourcesValue;
        }
        /**
         * Get tower height step in canvas
         * @returns {number} canvasTowerHeightStepValue
         */
        get canvasTowerHeightStep() {
            return this.canvasTowerHeightStepValue;
        }
        /**
         * Get wall height step in canvas
         * @returns {number} canvasWallHeightStepValue
         */
        get canvasWallHeightStep() {
            return this.canvasWallHeightStepValue;
        }
        /**
         * Remove one card from cards array
         * @param {Object} card
         */
        removeCard(card) {
            this.cards = this.cards.filter((playerCard) => {
                return playerCard.name !== card.name;
            });
        }
        /**
         * Get player moves
         * @returns {number} movesValue
         */
        get moves() {
            return this.movesValue;
        }
        /**
         * Increases player moves on 1 move
         */
        updateMoves() {
            this.movesValue++;
        }
        /**
         * Get player scores
         * @returns {number} scoresValue
         */
        get scores() {
            return this.scoresValue;
        }
        /**
         * Update player scores
         */
        updateScores(newScores) {
            this.scoresValue += newScores;
        }
        /**
         * Updates player tower life and tower fabric object
         * @param {number} value
         */
        updateTowerLife(value) {
            let newValue = value;
            if (newValue < 0 && Math.abs(newValue) > this.towerLife) {
                this.towerLife = 0;
                this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[1].getTop());
            }
            else {
                if (this.towerLife + newValue > this.maxTowerLife) {
                    if (this.towerLife <= this.maxTowerLife) {
                        this.towerLife += newValue;
                        this.towerObject.getObjects()[1].setHeight(this.towerLife * this.canvasTowerHeightStep);
                        this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[1].getTop()
                            - this.towerObject.getObjects()[1].getHeight());
                    }
                    else {
                        this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[1].getTop()
                            - this.towerObject.getObjects()[1].getHeight());
                    }
                }
                else {
                    this.towerLife += newValue;
                    this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[0].getTop()
                        - newValue * this.canvasTowerHeightStep);
                }
            }
            this.towerObject.getObjects()[1].setHeight(this.towerLife * this.canvasTowerHeightStep);
            this.towerObject.getObjects()[3].setText(this.towerLife.toString());
        }
        /**
         * Updates player wall life and wall fabric object
         * @param {number} value
         * @returns {number} reminded wall life
         */
        updateWallLife(value) {
            let newValue = value;
            if (this.wallLife >= this.maxWallLife) {
                this.wallLife = this.maxWallLife;
            }
            else if (newValue < 0 && Math.abs(newValue) > this.wallLife) {
                let remainder = newValue + this.wallLife;
                this.wallLife = 0;
                this.wallObject.getObjects()[0].setHeight(this.wallLife * this.canvasWallHeightStep);
                this.wallObject.getObjects()[2].setText(this.wallLife.toString());
                return remainder;
            }
            else {
                this.wallLife += newValue;
            }
            this.wallObject.getObjects()[0].setHeight(this.wallLife * this.canvasWallHeightStep);
            this.wallObject.getObjects()[2].setText(this.wallLife.toString());
        }
        /**
         * Updates player sources
         * @param {Object} newSources
         */
        updateSources(newSources) {
            for (let key in newSources) {
                if (newSources.hasOwnProperty(key)) {
                    let newValue = newSources[key];
                    if ((this.sources[key] + newValue) > 0) {
                        ((this.sources[key] + newValue) < this.maxSources)
                            ? this.sources[key] += newValue
                            : this.sources[key] = this.maxSources;
                    }
                    else {
                        this.sources[key] = 1;
                    }
                    this.sourcesObject[key].setText(this.sources[key].toString());
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
                    let newValue = newResources[key];
                    if ((this.resources[key] + newValue) > 0) {
                        ((this.resources[key] + newValue) < this.maxResources)
                            ? this.resources[key] += newValue
                            : this.resources[key] = this.maxResources;
                    }
                    else {
                        this.resources[key] = 0;
                    }
                    this.resourcesObject[key].setText(this.resources[key].toString());
                }
            }
        }
        /**
         * Take damage to wall if wall=0 to tower
         * @param {number} value
         */
        takeDamage(value) {
            let damage = value;
            (damage <= this.wallLife)
                ? this.updateWallLife(-damage)
                : this.updateTowerLife(this.updateWallLife(-damage));
        }
        /**
         * Update array of player cards
         * @param {Object} card
         */
        updateCards(card) {
            this.cards.push(card);
        }
    }
    ArcomageGame.Player = Player;
})(ArcomageGame || (ArcomageGame = {}));
