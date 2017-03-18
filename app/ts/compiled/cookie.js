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
            playerOne: {
                cards: playerOneCards,
                moves: playerOne.moves,
                name: playerOne.name,
                resources: playerOne.resources,
                sources: playerOne.sources,
                towerLife: playerOne.towerLife,
                wallLife: playerOne.wallLife,
            },
            playerTwo: {
                cards: playerTwoCards,
                name: playerTwo.name,
                resources: playerTwo.resources,
                sources: playerTwo.sources,
                towerLife: playerTwo.towerLife,
                wallLife: playerTwo.wallLife,
            },
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
     * @returns {Object} playerOne
     */
    getPlayerOneValues() {
        return this.getCookie().playerOne;
    }
    /**
     * Get player two values
     * @returns {Object} playerTwo
     */
    getPlayerTwoValues() {
        return this.getCookie().playerTwo;
    }
    /**
     * Get player one name
     * @returns {string}
     */
    getPlayerOneName() {
        return this.getPlayerOneValues().name;
    }
    /**
     * Get player two name
     * @returns {string}
     */
    getPlayerTwoName() {
        return this.getPlayerTwoValues().name;
    }
    /**
     * Check if cookies are set
     * @returns {boolean}
     */
    cookiesAreSet() {
        return !!(Cookies.get(this.gameCookieName));
    }
    /**
     * Get both players cookies
     * @returns {Object}
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
