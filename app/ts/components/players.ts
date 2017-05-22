export class Player {

    private playerName: string;
    private playerTowerLife: number;
    private playerWallLife: number;
    private playerResources: any;
    private playerSources: any;
    private canvasTowerHeightStepValue: number;
    private canvasWallHeightStepValue: number;
    private maxWallLifeValue: number;
    private maxTowerLifeValue: number;
    private maxSourcesValue: any;
    private maxResourcesValue: any;
    private playerNameObject: any;
    private playerSourcesObject: any;
    private playerResourcesObject: any;
    private playerCards: any[];
    private playerTowerObject: any;
    private playerWallObject: any;
    private movesValue: number;
    private scoresValue: number;

    constructor(name: string,
                playerValues: any,
                maxValues: any,
                canvasValues: any,
                difficulty: number) {
        this.playerName = name;
        this.playerTowerLife = (Array.isArray(playerValues.towerLife))
            ? playerValues.towerLife[difficulty]
            : playerValues.towerLife;
        this.playerWallLife = (Array.isArray(playerValues.wallLife)
            ? playerValues.wallLife[difficulty]
            : playerValues.wallLife);
        this.playerResources = (Array.isArray(playerValues.resources)
            ? playerValues.resources[difficulty]
            : playerValues.resources);
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
    get name(): string {
        return this.playerName;
    }

    /**
     * Get playerTowerLife
     * @returns {number} playerTowerLife
     */
    get towerLife(): number {
        return this.playerTowerLife;
    }

    /**
     * Set new playerTowerLife
     * @param {number} newPlayerTowerLife
     */
    set towerLife(newPlayerTowerLife: number) {
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
    get wallLife(): number {
        return this.playerWallLife;
    }

    /**
     * Set playerWallLife
     * @param {number} newPlayerWall
     */
    set wallLife(newPlayerWall: number) {
        if (newPlayerWall >= 0) {
            this.playerWallLife = (newPlayerWall < this.maxWallLifeValue) ? newPlayerWall : this.maxWallLifeValue;
        }
    }

    /**
     * Get playerResources
     * @returns {Object} playerResources
     */
    get resources(): any {
        return this.playerResources;
    }

    /**
     * Get playerSources
     * @returns {Object} playerSources
     */
    get sources(): any {
        return this.playerSources;
    }

    /**
     * Get playerName fabric object
     * @returns {fabric.IGroup} playerNameObject
     */
    get nameObject(): fabric.IGroup {
        return this.playerNameObject;
    }

    /**
     * Set new player name fabric object
     * @param {fabric.IGroup} newFabricObject
     */
    set nameObject(newFabricObject: fabric.IGroup) {
        if (typeof newFabricObject === "object") {
            this.playerNameObject = newFabricObject;
        }
    }

    /**
     * Get playerTower fabric object
     * @returns {fabric.IGroup} playerTowerObject
     */
    get towerObject(): fabric.IGroup {
        return this.playerTowerObject;
    }

    /**
     * Set new tower fabric object
     * @param {fabric.IGroup} newFabricObject
     */
    set towerObject(newFabricObject: fabric.IGroup) {
        if (typeof newFabricObject === "object") {
            this.playerTowerObject = newFabricObject;
        }
    }

    /**
     * Get playerWall fabric object
     * @returns {fabric.IGroup} playerWallObject
     */
    get wallObject(): fabric.IGroup {
        return this.playerWallObject;
    }

    /**
     * Set new wall fabric object
     * @param {fabric.IGroup} newFabricObject
     */
    set wallObject(newFabricObject: fabric.IGroup) {
        if (typeof newFabricObject === "object") {
            this.playerWallObject = newFabricObject;
        }
    }

    /**
     * Get playerSources fabric object
     * @returns {fabric.IGroup} playerSourcesObject
     */
    get sourcesObject(): any {
        return this.playerSourcesObject;
    }

    /**
     * Set new source fabric object
     * @param {fabric.IGroup} newFabricObject
     */
    set sourcesObject(newFabricObject: any) {
        if (typeof newFabricObject === "object") {
            this.playerSourcesObject = newFabricObject;
        }
    }

    /**
     * Get player resources fabric object
     * @returns {fabric.IGroup} playerResourcesObject
     */
    get resourcesObject(): any {
        return this.playerResourcesObject;
    }

    /**
     * Set new resource fabric object
     * @param {fabric.IGroup} newFabricObject
     */
    set resourcesObject(newFabricObject: any) {
        if (typeof newFabricObject === "object") {
            this.playerResourcesObject = newFabricObject;
        }
    }

    /**
     * Get playerCards
     * @returns {[]} playerCards
     */
    get cards(): any[] {
        return this.playerCards;
    }

    /**
     * Set new array of player cards
     * @param {[]} newCardsArray
     */
    set cards(newCardsArray: any[]) {
        this.playerCards = newCardsArray;
    }

    /**
     * Get max tower life
     * @returns {number} maxTowerLifeValue
     */
    get maxTowerLife(): number {
        return this.maxTowerLifeValue;
    }

    /**
     * Get max wall life
     * @returns {number} maxWallLifeValue
     */
    get maxWallLife(): number {
        return this.maxWallLifeValue;
    }

    /**
     * Get max sources value
     * @returns {number} maxSourcesValue
     */
    get maxSources(): number {
        return this.maxSourcesValue;
    }

    /**
     * Get max resources value
     * @returns {number} maxResourcesValue
     */
    get maxResources(): number {
        return this.maxResourcesValue;
    }

    /**
     * Get tower height step in canvas
     * @returns {number} canvasTowerHeightStepValue
     */
    get canvasTowerHeightStep(): number {
        return this.canvasTowerHeightStepValue;
    }

    /**
     * Get wall height step in canvas
     * @returns {number} canvasWallHeightStepValue
     */
    get canvasWallHeightStep(): number {
        return this.canvasWallHeightStepValue;
    }

    /**
     * Remove one card from cards array
     * @param {Object} card
     */
    public removeCard(card: any): void {
        this.cards = this.cards.filter((playerCard) => {
            return playerCard.name !== card.name;
        });
    }

    /**
     * Get player moves
     * @returns {number} movesValue
     */
    get moves(): number {
        return this.movesValue;
    }

    /**
     * Increases player moves on 1 move
     */
    public updateMoves(): void {
        this.movesValue++;
    }

    /**
     * Get player scores
     * @returns {number} scoresValue
     */
    get scores(): number {
        return this.scoresValue;
    }

    /**
     * Update player scores
     */
    public updateScores(newScores: number): void {
        this.scoresValue += newScores;
    }

    /**
     * Updates player tower life and tower fabric object
     * @param {number} value
     */
    public updateTowerLife(value: number) {
        const newValue: number = value;
        if (newValue < 0 && Math.abs(newValue) > this.towerLife) {
            this.towerLife = 0;
            this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[1].getTop());
        } else {
            if (this.towerLife + newValue > this.maxTowerLife) {
                if (this.towerLife <= this.maxTowerLife) {
                    this.towerLife += newValue;
                    this.towerObject.getObjects()[1].setHeight(this.towerLife * this.canvasTowerHeightStep);
                    this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[1].getTop()
                        - this.towerObject.getObjects()[1].getHeight());
                } else {
                    this.towerObject.getObjects()[0].setTop(this.towerObject.getObjects()[1].getTop()
                        - this.towerObject.getObjects()[1].getHeight());
                }
            } else {
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
    public updateWallLife(value: number) {
        const newValue: number = value;
        if (this.wallLife >= this.maxWallLife) {
            this.wallLife = this.maxWallLife;
        } else if (newValue < 0 && Math.abs(newValue) > this.wallLife) {
            const remainder = newValue + this.wallLife;
            this.wallLife = 0;
            this.wallObject.getObjects()[0].setHeight(this.wallLife * this.canvasWallHeightStep);
            this.wallObject.getObjects()[2].setText(this.wallLife.toString());
            return remainder;
        } else {
            this.wallLife += newValue;
        }
        this.wallObject.getObjects()[0].setHeight(this.wallLife * this.canvasWallHeightStep);
        this.wallObject.getObjects()[2].setText(this.wallLife.toString());

    }

    /**
     * Updates player sources
     * @param {Object} newSources
     */
    public updateSources(newSources: any) {
        for (const key in newSources) {
            if (newSources.hasOwnProperty(key)) {
                const newValue: number = newSources[key];
                if ((this.sources[key] + newValue) > 0) {
                    ((this.sources[key] + newValue) < this.maxSources)
                        ? this.sources[key] += newValue
                        : this.sources[key] = this.maxSources;
                } else {
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
    public updateResources(newResources: any) {
        for (const key in newResources) {
            if (newResources.hasOwnProperty(key)) {
                const newValue: number = newResources[key];
                if ((this.resources[key] + newValue) > 0) {
                    ((this.resources[key] + newValue) < this.maxResources)
                        ? this.resources[key] += newValue
                        : this.resources[key] = this.maxResources;
                } else {
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
    public takeDamage(value: number) {
        const damage = value;
        (damage <= this.wallLife)
            ? this.updateWallLife(-damage)
            : this.updateTowerLife(this.updateWallLife(-damage));
    }

    /**
     * Update array of player cards
     * @param {Object} card
     */
    public updateCards(card: any): void {
        this.cards.push(card);
    }
}
