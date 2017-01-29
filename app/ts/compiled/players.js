class Player {
    constructor(name, playerValues, maxValues, canvasValues) {
        this._playerName = name;
        this._playerTowerLife = playerValues.towerLife;
        this._playerWallLife = playerValues.wallLife;
        this._playerResources = playerValues.resources;
        this._playerSources = playerValues.sources;
        this._canvasTowerHeightStep = canvasValues.towers.heightStep;
        this._canvasWallHeightStep = canvasValues.walls.heightStep;
        this._maxWallLife = maxValues.wall;
        this._maxTowerLife = maxValues.tower;
        this._maxSources = maxValues.sources;
        this._maxResources = maxValues.resources;
        this._moves = 0;
        this._playerNameObject = {};
        this._playerSourcesObject = {};
        this._playerResourcesObject = {};
        this._playerCards = [];
        this._playerTowerObject = {};
        this._playerWallObject = {};
    }
    /**
     * Get player name
     * @returns {string} _playerName
     */
    get name() {
        return this._playerName;
    }
    /**
     * Get playerTowerLife
     * @returns {number} _playerTowerLife
     */
    get towerLife() {
        return this._playerTowerLife;
    }
    /**
     * Set new playerTowerLife
     * @param {number} newPlayerTowerLife
     */
    set towerLife(newPlayerTowerLife) {
        if (newPlayerTowerLife >= 0) {
            this._playerTowerLife = (newPlayerTowerLife < this._maxTowerLife) ? newPlayerTowerLife : this._maxTowerLife;
        }
    }
    /**
     * Get playerWallLife
     * @returns {number} _playerWallLife
     */
    get wallLife() {
        return this._playerWallLife;
    }
    /**
     * Set playerWallLife
     * @param {number} newPlayerWall
     */
    set wallLife(newPlayerWall) {
        if (newPlayerWall >= 0) {
            this._playerWallLife = (newPlayerWall < this._maxWallLife) ? newPlayerWall : this._maxWallLife;
        }
    }
    /**
     * Get playerResources
     * @returns {any} _playerResources
     */
    get resources() {
        return this._playerResources;
    }
    /**
     * Get playerSources
     * @returns {any} _playerSources
     */
    get sources() {
        return this._playerSources;
    }
    /**
     * Get playerName fabric object
     * @returns {any} _playerNameObject
     */
    get nameObject() {
        return this._playerNameObject;
    }
    /**
     * Set new player name fabric object
     * @param {any} newFabricObject
     */
    set nameObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this._playerNameObject = newFabricObject;
        }
    }
    /**
     * Get playerTower fabric object
     * @returns {any} _playerTowerObject
     */
    get towerObject() {
        return this._playerTowerObject;
    }
    /**
     * Set new tower fabric object
     * @param {any} newFabricObject
     */
    set towerObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this._playerTowerObject = newFabricObject;
        }
    }
    /**
     * Get playerWall fabric object
     * @returns {any} _playerWallObject
     */
    get wallObject() {
        return this._playerWallObject;
    }
    /**
     * Set new wall fabric object
     * @param {any} newFabricObject
     */
    set wallObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this._playerWallObject = newFabricObject;
        }
    }
    /**
     * Get playerSources fabric object
     * @returns {any} _playerSourcesObject
     */
    get sourcesObject() {
        return this._playerSourcesObject;
    }
    /**
     * Set new source fabric object
     * @param {any} newFabricObject
     */
    set sourcesObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this._playerSourcesObject = newFabricObject;
        }
    }
    /**
     * Get player resources fabric object
     * @returns {any} _playerResourcesObject
     */
    get resourcesObject() {
        return this._playerResourcesObject;
    }
    /**
     * Set new resource fabric object
     * @param {any} newFabricObject
     */
    set resourcesObject(newFabricObject) {
        if (typeof newFabricObject === "object") {
            this._playerResourcesObject = newFabricObject;
        }
    }
    /**
     * Get playerCards
     * @returns {Array<any>} _playerCards
     */
    get cards() {
        return this._playerCards;
    }
    /**
     * Set new array of player cards
     * @param {Array<any>} newCardsArray
     */
    set cards(newCardsArray) {
        this._playerCards = newCardsArray;
    }
    /**
     * Get max tower life
     * @returns {number} _maxTowerLife
     */
    get maxTowerLife() {
        return this._maxTowerLife;
    }
    /**
     * Get max wall life
     * @returns {number} _maxWallLife
     */
    get maxWallLife() {
        return this._maxWallLife;
    }
    /**
     * Get max sources value
     * @returns {number} _maxSources
     */
    get maxSources() {
        return this._maxSources;
    }
    /**
     * Get max resources value
     * @returns {number} _maxResources
     */
    get maxResources() {
        return this._maxResources;
    }
    /**
     * Get tower height step in canvas
     * @returns {number} _canvasTowerHeightStep
     */
    get canvasTowerHeightStep() {
        return this._canvasTowerHeightStep;
    }
    /**
     * Get wall height step in canvas
     * @returns {number} _canvasWallHeightStep
     */
    get canvasWallHeightStep() {
        return this._canvasWallHeightStep;
    }
    /**
     * Remove one card from cards array
     * @param {any} card
     */
    removeCard(card) {
        this.cards = this.cards.filter(function (playerCard) {
            return playerCard.description !== card.description;
        });
    }
    /**
     * Get player moves
     * @returns {number} _moves
     */
    get moves() {
        return this._moves;
    }
    /**
     * Increases player moves on 1 move
     */
    updateMoves() {
        this._moves++;
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
        this.towerObject.getObjects()[3].text = this.towerLife.toString();
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
            this.wallObject.getObjects()[2].text = this.wallLife.toString();
            return remainder;
        }
        else {
            this.wallLife += newValue;
        }
        this.wallObject.getObjects()[0].setHeight(this.wallLife * this.canvasWallHeightStep);
        this.wallObject.getObjects()[2].text = this.wallLife.toString();
    }
    /**
     * Updates player sources
     * @param {any} newSources
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
                this.sourcesObject[key].getObjects()[2].text = this.sources[key].toString();
            }
        }
    }
    /**
     * Updates player resources
     * @param {any} newResources
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
                this.resourcesObject[key].getObjects()[2].text = this.resources[key].toString();
            }
        }
    }
    /**
     * Take damage to wall if wall=0 to tower
     * @param {number} value
     */
    takeDamage(value) {
        let damage = value;
        (damage <= this.wallLife) ? this.updateWallLife(-damage) : this.updateTowerLife(this.updateWallLife(-damage));
    }
    /**
     * Update array of player cards
     * @param {any} card
     */
    updateCards(card) {
        this.cards.push(card);
    }
}
