/// <reference path="@types/js-cookie/js-cookie.d.ts" />
class Cookie {

    gameCookieName:string;
    gameStatusCookie:string;

    constructor() {
        this.gameCookieName = "arcomage";
        this.gameStatusCookie = "arcomage_status";
    }

    /**
     * Set cookies using js-cookie
     * @param {Player} playerOne
     * @param {Player} playerTwo
     */
    setCookie(playerOne:Player, playerTwo:Player):void {

        let playerOneCards:string[] = [];
        let playerTwoCards:string[] = [];

        for (let i = 0; i < playerOne.cards.length; i++) {
            playerOneCards.push(playerOne.cards[i].name);
            playerTwoCards.push(playerTwo.cards[i].name);
        }

        Cookies.set(this.gameCookieName, {
            "playerOne": {
                "name": playerOne.name,
                "towerLife": playerOne.towerLife,
                "wallLife": playerOne.wallLife,
                "resources": playerOne.resources,
                "sources": playerOne.sources,
                "moves": playerOne.moves,
                "cards": playerOneCards
            },
            "playerTwo": {
                "name": playerTwo.name,
                "towerLife": playerTwo.towerLife,
                "wallLife": playerTwo.wallLife,
                "resources": playerTwo.resources,
                "sources": playerTwo.sources,
                "cards": playerTwoCards
            }
        });
    }

    /**
     * Set cookie for game status
     * @param {boolean} status
     */
    setStatusCookie(status:boolean) {
        Cookies.set(this.gameStatusCookie, status);
    }

    /**
     * Check if game status is false
     * @returns {boolean}
     */
    gameIsOff():any {
        return Cookies.getJSON(this.gameStatusCookie) === false;
    }

    /**
     * Get player one values
     * @returns {any} playerOne
     */
    getPlayerOneValues():any {
        return this.getCookie().playerOne
    }

    /**
     * Get player two values
     * @returns {any} playerTwo
     */
    getPlayerTwoValues():any {
        return this.getCookie().playerTwo;
    }

    /**
     * Get player one name
     * @returns {any}
     */
    getPlayerOneName():string {
        return this.getPlayerOneValues().name;
    }

    /**
     * Check if cookies are set
     * @returns {boolean}
     */
    cookiesAreSet():boolean {
        return (Cookies.get(this.gameCookieName)) ? true : false;
    }

    /**
     * Get both players cookies
     * @returns {any}
     */
    getCookie():any {
        return Cookies.getJSON(this.gameCookieName);
    }

    /**
     * Delete status cookie
     */
    removeStatusCookie():void {
        Cookies.remove(this.gameStatusCookie);
    }

    /**
     * Delete both players cookie
     */
    removeCookie():void {
        Cookies.remove(this.gameCookieName);
    }

    /**
     * Remove all cookies
     */
    removeAll() {
        this.removeCookie();
        this.removeStatusCookie();
    }
}
