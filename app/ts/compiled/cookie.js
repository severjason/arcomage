/// <reference path="@types/js-cookie/js-cookie.d.ts" />
class Cookie {
    constructor() {
        this.gameCookieName = "arcomage";
        this.gameStatusCookie = "arcomage_status";
    }

    /**
     * Set cookies using js-cookie
     * @param {Player} playerOne
     * @param {Player} playerTwo
     */
    setCookie(playerOne, playerTwo) {
        let playerOneCards = [];
        let playerTwoCards = [];
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
    setStatusCookie(status) {
        Cookies.set(this.gameStatusCookie, status);
    }

    /**
     * Check if game status is false
     * @returns {boolean}
     */
    gameIsOff() {
        return Cookies.getJSON(this.gameStatusCookie) === false;
    }

    /**
     * Get player one values
     * @returns {any} playerOne
     */
    getPlayerOneValues() {
        return this.getCookie().playerOne;
    }

    /**
     * Get player two values
     * @returns {any} playerTwo
     */
    getPlayerTwoValues() {
        return this.getCookie().playerTwo;
    }

    /**
     * Get player one name
     * @returns {any}
     */
    getPlayerOneName() {
        return this.getPlayerOneValues().name;
    }

    /**
     * Get player two name
     * @returns {any}
     */
    getPlayerTwoName() {
        return this.getPlayerTwoValues().name;
    }

    /**
     * Check if cookies are set
     * @returns {boolean}
     */
    cookiesAreSet() {
        return (Cookies.get(this.gameCookieName)) ? true : false;
    }

    /**
     * Get both players cookies
     * @returns {any}
     */
    getCookie() {
        return Cookies.getJSON(this.gameCookieName);
    }

    /**
     * Delete status cookie
     */
    removeStatusCookie() {
        Cookies.remove(this.gameStatusCookie);
    }

    /**
     * Delete both players cookie
     */
    removeCookie() {
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
