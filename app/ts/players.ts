class Player {

    private _playerName:string;
    private _playerTowerLife:number;
    private _playerWallLife:number;
    private _playerResources:any;
    private _playerSources:any;
    private _canvasTowerHeightStep:number;
    private _canvasWallHeightStep:number;
    private _maxWallLife:number;
    private _maxTowerLife:number;
    private _maxSources:any;
    private _maxResources:any;
    private _playerSourcesObject:any;
    private _playerResourcesObject:any;
    private _playerCards:Array<any>;
    private _playerTowerObject:any;
    private _playerWallObject:any;


    constructor(name:string,
                playerValues:any,
                maxValues:any,
                canvasValues:any) {
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

    /**
     * Get playerName
     * @returns {string} _playerName
     */
    get name():string {
        return this._playerName;
    }

    /**
     * Get playerTowerLife
     * @returns {number} _playerTowerLife
     */
    get towerLife():number {
        return this._playerTowerLife;
    }

    /**
     * Set new playerTowerLife
     * @param {number} newPlayerTowerLife
     */
    set towerLife(newPlayerTowerLife:number) {
        if (newPlayerTowerLife >= 0) {
            this._playerTowerLife = (newPlayerTowerLife < this._maxTowerLife) ? newPlayerTowerLife : this._maxTowerLife;
        }
    }

    /**
     * Get playerWallLife
     * @returns {number} _playerWallLife
     */
    get wallLife():number {
        return this._playerWallLife;
    }

    /**
     * Set playerWallLife
     * @param {number} newPlayerWall
     */
    set wallLife(newPlayerWall:number) {
        if (newPlayerWall >= 0) {
            this._playerWallLife = (newPlayerWall < this._maxWallLife) ? newPlayerWall : this._maxWallLife;
        }
    }

    /**
     * Get playerResources
     * @returns {any} playerResources
     */
    get resources():any {
        return this._playerResources;
    }

    /**
     * Get playerSources
     * @returns {any} playerSources
     */
    get sources():any {
        return this._playerSources;
    }

    /**
     * Get playerTower fabric object
     * @returns {any} _playerTowerObject
     */
    get towerObject():any {
        return this._playerTowerObject;
    }

    /**
     * Set new tower fabric object
     * @param {any} newFabricObject
     */
    set towerObject(newFabricObject:any) {
        if (typeof newFabricObject === "object") {
            this._playerTowerObject = newFabricObject;
        }
    }

    /**
     * Get playerWall fabric object
     * @returns {any} _playerWallObject
     */
    get wallObject():any {
        return this._playerWallObject;
    }

    /**
     * Set new wall fabric object
     * @param {any} newFabricObject
     */
    set wallObject(newFabricObject:any) {
        if (typeof newFabricObject === "object") {
            this._playerWallObject = newFabricObject;
        }
    }

    /**
     * Get playerSources fabric object
     * @returns {any} _playerSourcesObject
     */
    get sourcesObject():any {
        return this._playerSourcesObject;
    }

    /**
     * Set new source fabric object
     * @param {any} newFabricObject
     */
    set sourcesObject(newFabricObject:any) {
        if (typeof newFabricObject === "object") {
            this._playerSourcesObject = newFabricObject;
        }
    }

    /**
     * Get player resources fabric object
     * @returns {any} playerResourcesObject
     */
    get resourcesObject():any {
        return this._playerResourcesObject;
    }

    /**
     * Set new resource fabric object
     * @param {any} newFabricObject
     */
    set resourcesObject(newFabricObject:any) {
        if (typeof newFabricObject === "object") {
            this._playerResourcesObject = newFabricObject;
        }
    }

    /**
     * Get playerCards
     * @returns {Array<any>} _playerCards
     */
    get cards():Array<any> {
        return this._playerCards;
    }

    /**
     * Updates player tower life and tower fabric object
     * @param {number} value
     */
    updateTowerLife(value:number) {
        let newValue:number = value;

        if (newValue < 0 && Math.abs(newValue) > this.towerLife) {
            this.towerLife = 0;
            this.towerObject._objects[0].top = this.towerObject._objects[1].top;
        }
        else {
            if (this.towerLife + newValue > this._maxTowerLife) {
                if(this.towerLife <= this._maxTowerLife) {
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
    }

    /**
     * Updates player wall life and wall fabric object
     * @param {number} value
     * @returns {number} reminded wall life
     */
    updateWallLife(value:number) {
        let newValue:number = value;
        if (this.wallLife >= this._maxWallLife) {
            this.wallLife = this._maxWallLife
        }
        else if (newValue < 0 && Math.abs(newValue) > this.wallLife) {
            let remainder = newValue + this.wallLife;
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

    }

    /**
     * Updates player sources
     * @param {any} newSources
     */
    updateSources(newSources:any) {
        for (let key in newSources) {
            if (newSources.hasOwnProperty(key)) {
                let newValue:number = parseInt(newSources[key], 10);
                if ((this.sources[key] + newValue) > 0) {
                    ((this.sources[key] + newValue) < this._maxSources) ? this.sources[key] += newValue : this.sources[key] = this._maxSources;
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
     * @param {any} newResources
     */
    updateResources(newResources:any) {
        for (let key in newResources) {
            if (newResources.hasOwnProperty(key)) {
                let newValue:number = parseInt(newResources[key], 10);
                if ((this.resources[key] + newValue) > 0) {
                    ((this.resources[key] + newValue) < this._maxResources) ? this.resources[key] += newValue : this.resources[key] = this._maxResources;
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
    takeDamage(value:number) {
        let damage = value;
        (damage <= this.wallLife) ? this.updateWallLife(-damage) : this.updateTowerLife(this.updateWallLife(-damage));
    }

    /**
     * Update array of player cards
     * @param {any} card
     */
    updateCards(card:any):void {
        this.cards.push(card);
    }
}