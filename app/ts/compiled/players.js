var Player = (function () {
    function Player(name, playerValues, maxValues, canvasValues) {
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
        this._playerSourcesObject = {};
        this._playerResourcesObject = {};
        this._playerCards = [];
        this._playerTowerObject = {};
        this._playerWallObject = {};
    }
    Object.defineProperty(Player.prototype, "name", {
        /**
         * Get playerName
         * @returns {string} _playerName
         */
        get: function () {
            return this._playerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "towerLife", {
        /**
         * Get playerTowerLife
         * @returns {number} _playerTowerLife
         */
        get: function () {
            return this._playerTowerLife;
        },
        /**
         * Set new playerTowerLife
         * @param {number} newPlayerTowerLife
         */
        set: function (newPlayerTowerLife) {
            if (newPlayerTowerLife >= 0) {
                this._playerTowerLife = (newPlayerTowerLife < this._maxTowerLife) ? newPlayerTowerLife : this._maxTowerLife;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "wallLife", {
        /**
         * Get playerWallLife
         * @returns {number} _playerWallLife
         */
        get: function () {
            return this._playerWallLife;
        },
        /**
         * Set playerWallLife
         * @param {number} newPlayerWall
         */
        set: function (newPlayerWall) {
            if (newPlayerWall >= 0) {
                this._playerWallLife = (newPlayerWall < this._maxWallLife) ? newPlayerWall : this._maxWallLife;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "resources", {
        /**
         * Get playerResources
         * @returns {any} playerResources
         */
        get: function () {
            return this._playerResources;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "sources", {
        /**
         * Get playerSources
         * @returns {any} playerSources
         */
        get: function () {
            return this._playerSources;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "towerObject", {
        /**
         * Get playerTower fabric object
         * @returns {any} _playerTowerObject
         */
        get: function () {
            return this._playerTowerObject;
        },
        /**
         * Set new tower fabric object
         * @param {any} newFabricObject
         */
        set: function (newFabricObject) {
            if (typeof newFabricObject === "object") {
                this._playerTowerObject = newFabricObject;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "wallObject", {
        /**
         * Get playerWall fabric object
         * @returns {any} _playerWallObject
         */
        get: function () {
            return this._playerWallObject;
        },
        /**
         * Set new wall fabric object
         * @param {any} newFabricObject
         */
        set: function (newFabricObject) {
            if (typeof newFabricObject === "object") {
                this._playerWallObject = newFabricObject;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "sourcesObject", {
        /**
         * Get playerSources fabric object
         * @returns {any} _playerSourcesObject
         */
        get: function () {
            return this._playerSourcesObject;
        },
        /**
         * Set new source fabric object
         * @param {any} newFabricObject
         */
        set: function (newFabricObject) {
            if (typeof newFabricObject === "object") {
                this._playerSourcesObject = newFabricObject;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "resourcesObject", {
        /**
         * Get player resources fabric object
         * @returns {any} playerResourcesObject
         */
        get: function () {
            return this._playerResourcesObject;
        },
        /**
         * Set new resource fabric object
         * @param {any} newFabricObject
         */
        set: function (newFabricObject) {
            if (typeof newFabricObject === "object") {
                this._playerResourcesObject = newFabricObject;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "cards", {
        /**
         * Get playerCards
         * @returns {Array<any>} _playerCards
         */
        get: function () {
            return this._playerCards;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates player tower life and tower fabric object
     * @param {number} value
     */
    Player.prototype.updateTowerLife = function (value) {
        var newValue = value;
        if (newValue < 0 && Math.abs(newValue) > this.towerLife) {
            this.towerLife = 0;
            this.towerObject._objects[0].top = this.towerObject._objects[1].top;
        }
        else {
            if (this.towerLife + newValue > this._maxTowerLife) {
                if (this.towerLife <= this._maxTowerLife) {
                    this.towerLife += newValue;
                    this.towerObject._objects[1].height = this.towerLife * this._canvasTowerHeightStep;
                    this.towerObject._objects[0].top = this.towerObject._objects[1].top - this.towerObject._objects[1].height;
                }
                else {
                    this.towerObject._objects[0].top = this.towerObject._objects[1].top - this.towerObject._objects[1].height;
                }
            }
            else {
                this.towerLife += newValue;
                this.towerObject._objects[0].top -= newValue * this._canvasTowerHeightStep;
            }
        }
        this.towerObject._objects[1].height = this.towerLife * this._canvasTowerHeightStep;
        this.towerObject._objects[3].text = this.towerLife.toString();
    };
    /**
     * Updates player wall life and wall fabric object
     * @param {number} value
     * @returns {number} reminded wall life
     */
    Player.prototype.updateWallLife = function (value) {
        var newValue = value;
        if (this.wallLife >= this._maxWallLife) {
            this.wallLife = this._maxWallLife;
        }
        else if (newValue < 0 && Math.abs(newValue) > this.wallLife) {
            var remainder = newValue + this.wallLife;
            this.wallLife = 0;
            this.wallObject._objects[0].height = this.wallLife * this._canvasWallHeightStep;
            this.wallObject._objects[2].text = this.wallLife.toString();
            return remainder;
        }
        else {
            this.wallLife += newValue;
        }
        this.wallObject._objects[0].height = this.wallLife * this._canvasWallHeightStep;
        this.wallObject._objects[2].text = this.wallLife.toString();
    };
    /**
     * Updates player sources
     * @param {any} newSources
     */
    Player.prototype.updateSources = function (newSources) {
        for (var key in newSources) {
            if (newSources.hasOwnProperty(key)) {
                var newValue = parseInt(newSources[key], 10);
                if ((this.sources[key] + newValue) > 0) {
                    ((this.sources[key] + newValue) < this._maxSources) ? this.sources[key] += newValue : this.sources[key] = this._maxSources;
                }
                else {
                    this.sources[key] = 1;
                }
                this.sourcesObject[key]._objects[2].text = this.sources[key].toString();
            }
        }
    };
    /**
     * Updates player resources
     * @param {any} newResources
     */
    Player.prototype.updateResources = function (newResources) {
        for (var key in newResources) {
            if (newResources.hasOwnProperty(key)) {
                var newValue = parseInt(newResources[key], 10);
                if ((this.resources[key] + newValue) > 0) {
                    ((this.resources[key] + newValue) < this._maxResources) ? this.resources[key] += newValue : this.resources[key] = this._maxResources;
                }
                else {
                    this.resources[key] = 1;
                }
                this.resourcesObject[key]._objects[2].text = this.resources[key].toString();
            }
        }
    };
    /**
     * Take damage to wall if wall=0 to tower
     * @param {number} value
     */
    Player.prototype.takeDamage = function (value) {
        var damage = value;
        (damage <= this.wallLife) ? this.updateWallLife(-damage) : this.updateTowerLife(this.updateWallLife(-damage));
    };
    /**
     * Update array of player cards
     * @param {any} card
     */
    Player.prototype.updateCards = function (card) {
        this.cards.push(card);
    };
    return Player;
}());
