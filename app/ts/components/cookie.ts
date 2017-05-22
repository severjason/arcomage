import {Player} from "./players";

export class Cookie {

    public gameCookieName: string;
    public gameStatusCookie: string;

    constructor() {
        this.gameCookieName = "arcomage";
        this.gameStatusCookie = "arcomage_status";
    }

    /**
     * Set cookies using js-cookie
     * @param {Player} playerOne
     * @param {Player} playerTwo
     */
    public setCookie(playerOne: Player, playerTwo: Player): void {

        const playerOneCards: string[] = [];
        const playerTwoCards: string[] = [];

        for (let i = 0; i < playerOne.cards.length; i++) {
            playerOneCards.push(playerOne.cards[i].name);
            playerTwoCards.push(playerTwo.cards[i].name);
        }

        Cookies.set(this.gameCookieName, {
            playerOne: {
                cards: playerOneCards,
                moves: playerOne.moves,
                name: playerOne.name,
                resources: playerOne.resources,
                sources: playerOne.sources,
                scores: playerOne.scores,
                towerLife: playerOne.towerLife,
                wallLife: playerOne.wallLife,
            },
            playerTwo: {
                cards: playerTwoCards,
                moves: playerOne.moves,
                name: playerTwo.name,
                resources: playerTwo.resources,
                sources: playerTwo.sources,
                scores: playerOne.scores,
                towerLife: playerTwo.towerLife,
                wallLife: playerTwo.wallLife,
            },
        });
    }

    /**
     * Set cookie for game status
     * @param {boolean} status
     */
    public setStatusCookie(status: boolean) {
        Cookies.set(this.gameStatusCookie, status);
    }

    /**
     * Check if game status is false
     * @returns {boolean}
     */
    public gameIsOff(): any {
        return Cookies.getJSON(this.gameStatusCookie) === false;
    }

    /**
     * Get player one values
     * @returns {Object} playerOne
     */
    public getPlayerOneValues(): any {
        return this.getCookie().playerOne;
    }

    /**
     * Get player two values
     * @returns {Object} playerTwo
     */
    public getPlayerTwoValues(): any {
        return this.getCookie().playerTwo;
    }

    /**
     * Get player one name
     * @returns {string}
     */
    public getPlayerOneName(): string {
        return this.getPlayerOneValues().name;
    }

    /**
     * Get player two name
     * @returns {string}
     */
    public getPlayerTwoName(): string {
        return this.getPlayerTwoValues().name;
    }

    /**
     * Check if cookies are set
     * @returns {boolean}
     */
    public cookiesAreSet(): boolean {
        return !!(Cookies.get(this.gameCookieName));
    }

    /**
     * Get both players cookies
     * @returns {Object}
     */
    public getCookie(): any {
        return Cookies.getJSON(this.gameCookieName);
    }

    /**
     * Delete status cookie
     */
    public removeStatusCookie(): void {
        Cookies.remove(this.gameStatusCookie);
    }

    /**
     * Delete both players cookie
     */
    public removeCookie(): void {
        Cookies.remove(this.gameCookieName);
    }

    /**
     * Remove all cookies
     */
    public removeAll() {
        this.removeCookie();
        this.removeStatusCookie();
    }
}
